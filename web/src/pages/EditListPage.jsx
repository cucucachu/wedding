import React, { useState } from 'react';
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 

import { db } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Table } from '../components/Table';
import Symbols from '../components/Symbols';

export function EditListPage(props) {
    const { handleClickChangePage, list, currentGuests } = props;

    const emptyGuest = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        removeable: true,
    }

    const randomGuestCode = () => {
        const numbers = [];
        for (let i = 0; i < 6; i++) {
            numbers.push(Math.floor((Math.random() * 26) + 65));
        }

        return String.fromCharCode(...numbers);
    }

    const [guests, setGuests] = useState(currentGuests && currentGuests.length ? currentGuests : [{...emptyGuest, code: randomGuestCode()}]);
    const [error, setError] = useState('');

    const onAddGuest = () => {
        const newGuests = guests.map(g => {return {...g}});
        newGuests.push({...emptyGuest, code: randomGuestCode()});
        setGuests(newGuests);
    }

    const onRemoveGuest = e => {
        const newGuests = guests.map(g => {return {...g}});
        const cellRow = e.target.parentElement.attributes.row.value;
        newGuests.splice(cellRow, 1);
        setGuests(newGuests);
    }

    const handleChangeCell = e => {
        e.preventDefault();

        const cellRow = e.target.parentElement.attributes.row.value;
        const property = e.target.name ? e.target.name : e.target.parentElement.name;

        const newGuests = guests.map(g => {return {...g}});

        newGuests[cellRow][property] = e.target.value;

        setGuests(newGuests);

    }

    const onSubmit = async () => {
        try {
            const guestRef = await addDoc(collection(db, 'guests'), {
                ...guest,
                attending: false,
                rsvp: false,
                vaccinated: false,
                vaccineVerified: false,
                vaccineImage: '',
            });
            await setDoc(doc(db, 'lists', list.id), {
                ...list,
                guests: [...list.guests, guestRef.id]
            });

            handleClickChangePage('GUEST_LIST');
        }
        catch (error) {
            setError(error.message);
        }
    }

    const columns = [
        {
            type: 'BUTTON',
            property: 'removeable',
            onClick: onRemoveGuest,
            buttonText: Symbols.x,
            showOnlyIfValue: true,
        },
        {
            name: 'First Name',
            property: 'firstName',
            type: 'TEXT',
            required: true,
            edit: true,
        },
        {
            name: 'Last Name',
            property: 'lastName',
            type: 'TEXT',
            required: true,
            edit: true,
        },
        {
            name: 'Email',
            property: 'email',
            type: 'EMAIL',
            edit: true,
        },
        {
            name: 'Address',
            property: 'address',
            type: 'TEXT',
            edit: true,
        },
        {
            name: 'City',
            property: 'city',
            type: 'TEXT',
            edit: true,
        },
        {
            name: 'State',
            property: 'state',
            type: 'TEXT',
            edit: true,
        },
        {
            name: 'Zip',
            property: 'zip',
            type: 'TEXT',
            edit: true,
        },
    ];

    return (
        <div className="width-80 container">
            <TitleWithButtons
                title={`Add Guests to ${list.name}`}
                leftButtons={[{label: '❮', onClick: () => handleClickChangePage('GUEST_LIST')}]}
                rightButtons={[{label: 'Save', onClick: () => {}}]}
            />
            <Table
                keyPrefix="add_guests_to_list_table"
                key="add_guests_to_list_table"
                title={list.name}
                rightButtons={[{label: '➕', onClick: onAddGuest}]}
                columns={columns}
                data={guests}
                handleChangeCell={handleChangeCell}
            />
            {error && <p className="error-text">{error}</p>}
        </div>
    )
}