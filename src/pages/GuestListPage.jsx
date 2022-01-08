import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore"; 

import { db } from '../firebase';

import { Table } from '../components/Table';

export function GuestListPage(props) {

    const [guests, setGuests] = useState([]);
    const [lists, setLists] = useState([]);

    const getGuests = async () => {
        const querySnapshot = await getDocs(collection(db, 'guests'));
        if (!querySnapshot.isEmpty) {
            const guestsArray = [];
    
            for (let guest of querySnapshot.docs) {
                guestsArray.push({
                    id: guest.id,
                    ...guest.data()
                });
            }
    
            setGuests(guestsArray);
        }
    }

    const getLists = async () => {
        const querySnapshot = await getDocs(collection(db, 'lists'));
        if (!querySnapshot.isEmpty) {
            const listsArray = [];
    
            for (let list of querySnapshot.docs) {
                listsArray.push(list.data());
            }

            listsArray.sort((a, b) => a.order - b.order);
    
            setLists(listsArray);
        }
    }

    useEffect(getGuests, []);
    useEffect(getLists, []);

    const handleChangeCell = e => {
        console.dir(e.target.parentElement);
        const cellRow = e.target.parentElement.attributes.row.value;
        const property = e.target.parentElement.attributes.column.value;
        const newValue = e.target.value;

        console.dir({cellRow, property, newValue})

        const updatedGuests = [...guests];

        updatedGuests[cellRow][property] = newValue;

        setGuests(updatedGuests);
    }

    const columns = [
        {
            name: 'First Name',
            type: 'TEXT',
            edit: true,
            property: 'firstName',
        },
        {
            name: 'Last Name',
            type: 'TEXT',
            edit: true,
            property: 'lastName',
        },
        {
            name: 'RSVP',
            type: 'BOOLEAN',
            property: 'rsvp',
        },
        {
            name: 'Attending',
            type: 'BOOLEAN',
            property: 'attending',
        },
    ];

    const tables = lists.map(list => 
        <Table
            keyPrefix={`key-table-${list.name}`}
            key={`key-table-${list.name}`}
            title={list.name}
            columns={columns}
            data={guests.filter(g => list.guests.includes(g.id))}
            handleChangeCell={handleChangeCell}
        />
    )
    
    return (
        <div className='width-80 container'>
            <h2 className="center-text">Guest List</h2>
            {tables}
        </div>
    );
}