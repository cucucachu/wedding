
async function updateGuestList(db, list, guests) {
    const {
        updatedList,
        updatedGuests,
        guestsToDelete,
    } = updateGuestListSanitize(db, list, guests);
    // create transaction
    let batch = db.batch();



    console.log('updatedGuests');
    console.dir(updatedGuests);
    console.log('updatedList');
    console.dir(updatedList);
    console.log('guestsToDelete');
    console.dir(guestsToDelete);

    updatedGuests.forEach(g => batch.set(db.doc(`guests/${g.id}`), g));
    guestsToDelete.forEach(g => batch.delete(db.doc(`guests/${g}`)));
    batch.set(db.doc(`lists/${updatedList.id}`), updatedList);

    await batch.commit();

    return { updatedList, updatedGuests };
}

function updateGuestListSanitize(db, list, guests) {
    const updatedList = {...list};
    let updatedGuests = [...guests];
    const guestsToDelete = [];
    const newAdditionalGuests = [];

    for (let guest of updatedGuests) {
        // Existing Guest
        if (guest.id) {
            // Create additional guest
            if (guest.hasPlusOne && !guest.hasAdditionalGuest) {
                const additionalGuest = {
                    ...guestTemplate, 
                    code: createGuestCode(),
                    id: getNewGuestId(db),
                    additionalGuestFor: guest.id,
                };
                guest.hasAdditionalGuest = additionalGuest.id;
                newAdditionalGuests.push(additionalGuest);
            }
            // Delete additional guest
            else if (!guest.hasPlusOne && guest.hasAdditionalGuest) {
                guestsToDelete.push(guest.hasAdditionalGuest);
                delete guest.hasAdditionalGuest;
            }
        }
        // New Guest
        else {
            guest.id = getNewGuestId(db);
            guest.code = createGuestCode();
            // Create additional guest
            if (guest.hasPlusOne) {
                const additionalGuest = {
                    ...guestTemplate, 
                    code: createGuestCode(),
                    id: getNewGuestId(db),
                    additionalGuestFor: guest.id,
                };
                guest.hasAdditionalGuest = additionalGuest.id;
                newAdditionalGuests.push(additionalGuest);
            }
        }
    }

    // Remove deleted guests from updatedGuests array
    updatedGuests = updatedGuests.filter(g => !guestsToDelete.includes(g.id));

    // Add new additional guests to updatedGuestsArray
    updatedGuests = [...updatedGuests, ...newAdditionalGuests];
    
    // update list.guests to match all these guests including plusOnes
    updatedList.guests = updatedGuests.map(g => g.id);

    updatedGuests.forEach(g =>validateGuest(g));

    // validate 
    return {
        updatedList,
        updatedGuests,
        guestsToDelete,
    }
}

function validateGuest(guest) {
    const guestString = JSON.stringify(guest);

    if (!guest.id) {
        throw new ClientError(`Guest missing id.\n${guestString}`);
    }

    if (!guest.code) {
        throw new ClientError(`Guest missing code.\n${guestString}`);
    }

    if ((!guest.firstName || !guest.lastName) && !guest.additionalGuestFor) {
        throw new ClientError(`Guest missing name.\n${guestString}`)
    }

    if (guest.hasPlusOne && !guest.hasAdditionalGuest) {
        throw new ClientError(`Guest has a plus one but no additional guest created.\n${guestString}`);
    }

    if (!guest.hasPlusOne && guest.hasAdditionalGuest) {
        throw new ClientError(`Guest does not have plus one but does have additional guest.\n${guestString}`)
    }  
}

function getNewGuestId(db) {
    return db.collection('guests').doc().id;
}

const guestTemplate = {
    firstName: '',
    lastName: '',
    email: '',
    code: '',
    hasAdditionalGuest: null,
    additionalGuestFor: null,
}

function createGuestCode() {
    const numbers = [];
    for (let i = 0; i < 6; i++) {
        numbers.push(Math.floor((Math.random() * 26) + 65));
    }

    return String.fromCharCode(...numbers);
}

class ClientError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = {
    ClientError,
    updateGuestList
}