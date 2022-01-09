import React, { useState, useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore"; 

import { db } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Table } from '../components/Table';

export function GuestListPage(props) {
    const { handleClickChangePage } = props;

    const [guests, setGuests] = useState([]);
    const [lists, setLists] = useState([]);

    const getGuests = async () => {
        const querySnapshot = await getDocs(collection(db, 'guests'));
        if (!querySnapshot.isEmpty) {
            const guestsArray = [];
    
            for (let doc of querySnapshot.docs) {
                const guest = doc.data();


                guestsArray.push({
                    id: doc.id,
                    name: `${guest.firstName} ${guest.lastName}`,
                    ...guest,
                });
            }
    
            setGuests(guestsArray);
        }
    }

    const getLists = async () => {
        const querySnapshot = await getDocs(collection(db, 'lists'));
        if (!querySnapshot.isEmpty) {
            const listsArray = [];
    
            for (let doc of querySnapshot.docs) {
                const list = doc.data();

                listsArray.push({
                    ...list,
                    id: doc.id,
                });
            }

            listsArray.sort((a, b) => a.order - b.order);
    
            setLists(listsArray);
        }
    }

    useEffect(getGuests, []);
    useEffect(getLists, []);

    const handleChangeCell = e => {
        e.preventDefault();
        const cellRow = e.target.parentElement.attributes.row.value;
        const property = e.target.parentElement.attributes.column.value;
        const newValue = e.target.value;

        console.dir({cellRow, property, newValue})

        const updatedGuests = [...guests];

        updatedGuests[cellRow][property] = newValue;

        setGuests(updatedGuests);
    }

    const handleClickCell = e => {
        e.preventDefault();
        const cellRow = e.target.parentElement.attributes.row.value;
        const property = e.target.parentElement.attributes.column.value;

        if (property == 'view') {
            handleClickChangePage('VIEWGUEST', guests[cellRow]);
        }
    }

    const columns = [
        {
            name: 'Name',
            type: 'TEXT',
            property: 'name',
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
        {
            name: '',
            type: 'BUTTON',
            property: 'view',
            onClick: handleClickCell,
            buttonText: '🔎',
        },
    ];

    const tables = lists.map(list => 
        <Table
            keyPrefix={`key-table-${list.name}`}
            key={`key-table-${list.name}`}
            title={list.name}
            rightButtons={[{label: '➕', onClick: () => handleClickChangePage('ADDGUEST', list)}]}
            columns={columns}
            data={guests.filter(g => list.guests.includes(g.id))}
            handleChangeCell={handleChangeCell}
        />
    )
    
    return (
        <div className='width-80 container'>
            <TitleWithButtons
                title="Guest List"
                rightButtons={[{label: '➕', onClick: () => handleClickChangePage('ADDLIST', lists)}]}
            />
            {tables}
        </div>
    );
}