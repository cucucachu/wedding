import React, { useState, useEffect } from 'react';


import { updateList, getGuests, getLists } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Table } from '../components/Table';

export function GuestListPage(props) {
    const { handleClickChangePage } = props;

    const [guests, setGuests] = useState([]);
    const [lists, setLists] = useState([]);

    // const getGuests = async () => {
    //     const querySnapshot = await getDocs(collection(db, 'guests'));
    //     if (!querySnapshot.isEmpty) {
    //         const guestsArray = [];
    
    //         for (let doc of querySnapshot.docs) {
    //             const guest = doc.data();


    //             guestsArray.push({
    //                 id: doc.id,
    //                 name: `${guest.firstName} ${guest.lastName}`,
    //                 ...guest,
    //             });
    //         }
    
    //         setGuests(guestsArray);
    //     }
    // }

    // const getLists = async () => {
    //     const querySnapshot = await getDocs(collection(db, 'lists'));
    //     if (!querySnapshot.isEmpty) {
    //         const listsArray = [];
    
    //         for (let doc of querySnapshot.docs) {
    //             const list = doc.data();

    //             listsArray.push({
    //                 ...list,
    //                 id: doc.id,
    //             });
    //         }

    //         listsArray.sort((a, b) => a.order - b.order);
    
    //         setLists(listsArray);
    //     }
    // }

    useEffect(async () => setGuests(await getGuests()), []);
    useEffect(async () => setLists(await getLists()), []);

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

    const handleClickCell = async e => {
        e.preventDefault();
        console.log('click')

        const cellRow = e.target.parentElement.attributes.row.value;
        const property = e.target.parentElement.attributes.column.value;
        const id = e.target.parentElement.parentElement.attributes.rowid.value;
        let currentList, newList, currentListIndex;

        console.log(property);
        switch (property) {
            case 'view':
                handleClickChangePage('VIEW_GUEST', guests.filter(g => g.id === id)[0]);
                break;
            case 'moveUp':
                console.log('moveUp')
                currentList = lists.filter(l => l.guests.filter(g => g === id).length)[0];
                console.log(currentList.name)
                currentListIndex = lists.indexOf(currentList);
                if (currentListIndex > 0) {
                    currentList.guests.splice(cellRow, 1);
                    newList = lists[currentListIndex - 1];
                    newList.guests.push(id);
                    await updateList(currentList);
                    await updateList(newList);
                    setLists(await getLists());
                }
                break;
            case 'moveDown':
                currentList = lists.filter(l => l.guests.filter(g => g === id).length)[0];
                currentListIndex = lists.indexOf(currentList);
                if (currentListIndex < lists.length - 1) {
                    currentList.guests.splice(cellRow, 1);
                    newList = lists[currentListIndex + 1];
                    newList.guests.push(id);
                    await updateList(currentList);
                    await updateList(newList);
                    setLists(await getLists());
                }
                break;
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
        {
            name: '',
            type: 'BUTTON',
            property: 'moveUp',
            onClick: handleClickCell,
            buttonText: '⬆️',
        },
        {
            name: '',
            type: 'BUTTON',
            property: 'moveDown',
            onClick: handleClickCell,
            buttonText: '⬇️',
        },
    ];

    const tables = lists.map(list => 
        <Table
            keyPrefix={`key-table-${list.name.replace(' ', '-')}`}
            key={`key-table-${list.name.replace(' ', '-')}`}
            title={list.name}
            rightButtons={[{label: '➕', onClick: () => handleClickChangePage('ADD_GUEST', list)}]}
            columns={columns}
            data={guests.filter(g => list.guests.includes(g.id))}
            handleChangeCell={handleChangeCell}
        />
    )
    
    return (
        <div className='width-80 container'>
            <TitleWithButtons
                title="Guest List"
                rightButtons={[{label: '➕', onClick: () => handleClickChangePage('ADD_LIST', lists)}]}
            />
            {tables}
        </div>
    );
}