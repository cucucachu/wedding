import React, { useState, useEffect } from 'react';


import { updateList, getGuests, getLists } from '../firebase';

import Symbols from '../components/Symbols';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Table } from '../components/Table';

export function GuestListPage(props) {
    const { handleClickChangePage } = props;

    const [guests, setGuests] = useState([]);
    const [lists, setLists] = useState([]);

    useEffect(async () => setGuests(await getGuests()), []);
    useEffect(async () => setLists(await getLists()), []);

    const handleClickCell = async e => {
        e.preventDefault();

        const cellRow = e.target.parentElement.attributes.row.value;
        const property = e.target.name ? e.target.name : e.target.parentElement.name;
        const id = e.target.parentElement.parentElement.attributes.rowid.value;
        let currentList, newList, currentListIndex;

        switch (property) {
            case 'view':
                handleClickChangePage('VIEW_GUEST', guests.filter(g => g.id === id)[0]);
                break;
            // case 'moveUp':
            //     currentList = lists.filter(l => l.guests.filter(g => g === id).length)[0];
            //     currentListIndex = lists.indexOf(currentList);
            //     if (currentListIndex > 0) {
            //         currentList.guests.splice(cellRow, 1);
            //         newList = lists[currentListIndex - 1];
            //         newList.guests.push(id);
            //         await updateList(currentList);
            //         await updateList(newList);
            //         setLists(await getLists());
            //     }
            //     break;
            // case 'moveDown':
            //     currentList = lists.filter(l => l.guests.filter(g => g === id).length)[0];
            //     currentListIndex = lists.indexOf(currentList);
            //     if (currentListIndex < lists.length - 1) {
            //         currentList.guests.splice(cellRow, 1);
            //         newList = lists[currentListIndex + 1];
            //         newList.guests.push(id);
            //         await updateList(currentList);
            //         await updateList(newList);
            //         setLists(await getLists());
            //     }
            //     break;
        }
    }

    const handleClickEditList = list => {
        const guestsForList =  guests.filter(g => list.guests.includes(g.id));
        handleClickChangePage('EDIT_LIST', {list, currentGuests: guestsForList})
    }

    const columns = [
        {
            name: '',
            type: 'BUTTONS',
            buttons: [
                {
                    property: 'view',
                    onClick: handleClickCell,
                    buttonText: Symbols.view,

                },
                // {
                //     property: 'moveUp',
                //     onClick: handleClickCell,
                //     buttonText: Symbols.up,

                // },
                // {
                //     property: 'moveDown',
                //     onClick: handleClickCell,
                //     buttonText: Symbols.down,
                // }
            ]
        },
        {
            name: 'Name',
            type: 'TEXT',
            property: 'name',
        },
        {
            name: 'Attending',
            type: 'TEXT',
            property: 'rsvpState',
        },
    ];

    const tables = lists.map(list => 
        <Table
            keyPrefix={`key-table-${list.name.replace(' ', '-')}`}
            key={`key-table-${list.name.replace(' ', '-')}`}
            title={list.name}
            rightButtons={[{label: Symbols.edit, onClick: () => handleClickEditList(list)}]}
            columns={columns}
            data={guests.filter(g => list.guests.includes(g.id))}
        />
    )
    
    return (
        <div className='width-80 container'>
            <TitleWithButtons
                title="Guest List"
                rightButtons={[{label: Symbols.plus, onClick: () => handleClickChangePage('ADD_LIST', lists)}]}
            />
            {tables}
        </div>
    );
}