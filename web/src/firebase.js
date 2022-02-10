

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import axios from 'axios';

import firebaseConfig from '../firebase.config.json';

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
const storage = getStorage();

const firebaseFunctions = axios.create({
    baseURL: 'https://us-central1-wedding-1be73.cloudfunctions.net/app',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST',
        'Authorization': `Bearer ${auth?.currentUser?.getIdToken(true)}`
    }
})

export const logout = () => auth.signOut();

export async function loginOrCreateGuestAccount(email, code) {
    let userCredential;

    try {
        userCredential = await signInWithEmailAndPassword(auth, email, code);
        console.log('sign in succesful');
        const guest = await getGuest({code});
        if (guest.uid !== userCredential.user.uid || guest.email !== email) {
            await deleteAccount(userCredential.user.uid);
            await logout();
            const error = new Error('Account email is different than guest email.')
            error.code = 1;
            throw error;
        }
    }
    catch (error) {
        if (error.code == 'auth/user-not-found') {
            userCredential = await createUserWithEmailAndPassword(auth, email, code);
            console.log('sign in unsuccessful');

            const guest = await getGuest({code});

            if (guest.uid) {
                await deleteAccount(userCredential.user.uid);
                await logout();
                throw new Error('An account already exists for this guest code, but the email given doesn\'t match.');
            }
            
            guest.uid = userCredential.user.uid;
            guest.email = email;
            await updateGuest(guest);
        }
        else if (error.code === 1) {
            throw error;
        }
    }
    
    return userCredential;
}

export async function loginAsGuestOrHost(email, password) {        
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const host = await getHost({uid: userCredential.user.uid});

        return {
            userCredential,
            host: !!host,
        }
    }
    catch (error) {        
        const errors = {
            'auth/user-not-found': 'Unknown Email',
            'auth/wrong-password': 'Wrong Password',
        }

        let errorMessage = errors[error.code] ? errors[error.code] : 'Oops, something is broked :/';

        throw new Error(errorMessage);
    }
}

export async function getHost({uid}) {
    let querySnapshot = await getDocs(query(collection(db, 'hosts'), where('uid', '==', uid)));

    if (querySnapshot.isEmpty) {
        return null;
    }

    for (let doc of querySnapshot.docs) {
        return {
            ...doc.data(), 
            id: doc.id
        };
    }
}


export async function getGuest({code, uid}) {
    if (!code && !uid) {
    }

    let querySnapshot;

    if (code) {
        querySnapshot = await getDocs(query(collection(db, 'guests'), where('code', '==', code)));
    }
    else if (uid) {
        querySnapshot = await getDocs(query(collection(db, 'guests'), where('uid', '==', uid)));
    }
    else {
        throw new Error('getGuest() called with no parameters.');
    }

    if (querySnapshot.isEmpty) {
        console.log(`getGuest() could not find a guest with uid ${uid} or code ${code}`);
        return null;
    }
    
    const guests = [];

    for (let document of querySnapshot.docs) {
        const guest = document.data();
        let name = `${guest.firstName} ${guest.lastName}`;

        if (guest.additionalGuestFor && (!guest.firstName && !guest.lastName)) {
            let d = await getDoc(doc(db, `guests/${guest.additionalGuestFor}`));
            const g = d.data();
            name = `${g.firstName} ${g.lastName}'${g.lastName[g.lastName.length - 1] === 's' ? '' : 's'} +1`;
        }

        guests.push({
            id: document.id,
            name: name,
            ...guest,
        });

        guests.sort((a, b) => a.lastName - b.lastName);
    }

    return guests[0];
    
}


export async function getGuests() {
    const querySnapshot = await getDocs(collection(db, 'guests'));
    if (!querySnapshot.isEmpty) {
        const guests = [];

        for (let doc of querySnapshot.docs) {
            const guest = doc.data();

            guests.push({
                id: doc.id,
                name: `${guest.firstName} ${guest.lastName}`,
                ...guest,
            });

            guests.sort((a, b) => a.lastName - b.lastName);
        }

        for (let guest of guests) {
            if (guest.additionalGuestFor && (!guest.firstName && !guest.lastName)) {
                const g = guests.filter(g => g.id === guest.additionalGuestFor)[0];
                guest.name = `${g.firstName} ${g.lastName}'${g.lastName[g.lastName.length - 1] === 's' ? '' : 's'} +1`;
            }
        }

        return guests;
    }
}

export async function updateGuest(guest) {
    if (!guest.id) {
        throw new Error('Attempting to update a guest that doesn\'t have an id.')
    }
    const id = guest.id;
    delete guest.id;
    delete guest.name;

    return setDoc(doc(db, 'guests', id), guest);
}

export async function getLists() {
    const querySnapshot = await getDocs(collection(db, 'lists'));
    if (!querySnapshot.isEmpty) {
        const lists = [];

        for (let doc of querySnapshot.docs) {
            const list = doc.data();

            lists.push({
                ...list,
                id: doc.id,
            });
        }

        lists.sort((a, b) => a.order - b.order);

        return lists;
    }
}

export async function updateList(list) {
    if (!list.id) {
        throw new Error('Attempting to update a list that doesn\'t have an id.')
    }
    const id = list.id;
    delete list.id;

    return setDoc(doc(db, 'lists', id), list);
}

// Firebase Storage Calls

export async function uploadImage(storagePath, image) {
    const imageRef = ref(storage, storagePath);

    return uploadBytes(imageRef, image);
}

export async function getVaccineImageURL(guestId) {
    console.log(`vaccineImages/${guestId}`)
    return getDownloadURL(ref(storage, `vaccineImages/${guestId}`));
}


// Firebase Function Calls
export async function checkGuestCode(code) {
    const response = await firebaseFunctions.post('/checkGuestCode', { code });
    return response.data;
}

export async function getRSVPDueDate(id) {
    // const token = await auth?.currentUser?.getIdToken(true);
    const response = await firebaseFunctions.post('/getRSVPDueDate', { id });
    
    // const response = await firebaseFunctions.post('/getRSVPDueDate', { id }, {
    //     baseURL: 'https://us-central1-wedding-1be73.cloudfunctions.net/app',
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //         'Access-Control-Allow-Methods': 'GET,POST',
    //         'Authorization': `Bearer ${token}`
    //     }
    // });
    return response.data;
}

export async function deleteAccount(uid) {
    const token = await auth?.currentUser?.getIdToken(true);

    const response = await firebaseFunctions.post('/deleteAccount', { uid }, {
        baseURL: 'https://us-central1-wedding-1be73.cloudfunctions.net/app',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}

export async function updateGuestList(list, guests) {
    const token = await auth?.currentUser?.getIdToken(true);

    const response = await firebaseFunctions.post('/updateGuestList', { list, guests }, {
        baseURL: 'https://us-central1-wedding-1be73.cloudfunctions.net/app',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST',
            'Authorization': `Bearer ${token}`
        }
    });

    return response.data;
}