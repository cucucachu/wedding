import React, { useState, useEffect } from 'react';


import { updateList, getGuests, getLists } from '../firebase';

import Symbols from '../components/Symbols';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Table } from '../components/Table';

export function GuestListPage(props) {
    const { handleClickChangePage } = props;

    const [guests, setGuests] = useState([]);
    const [lists, setLists] = useState([]);
    const [aggregateData, setaggregateData] = useState([]);

    useEffect(async () => setGuests(await getGuests()), []);
    useEffect(async () => setLists(await getLists()), []);
    useEffect(listAggregation, [guests, lists]);

    function listAggregation() {
        const aggData = [];

        for (const list of lists) {
            const guestsForList = guests.filter(g => list.guests.includes(g.id));

            aggData.push({
                name: list.name,
                totalGuests: list.guests.length,
                guestsAttending: guestsForList.filter(g => g.rsvpState === 'YES').length,
                guestsTentative: guestsForList.filter(g => g.rsvpState === 'TENTATIVE').length,
                guestsNotAttending: guestsForList.filter(g => g.rsvpState === 'NO').length,
            });
        }

        setaggregateData(aggData);
    }

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
        }
    }

    const handleClickEditList = list => {
        const guestsForList =  guests.filter(g => list.guests.includes(g.id));
        handleClickChangePage('EDIT_LIST', {list, currentGuests: guestsForList})
    }

    const handleClickDownloadList = list => {

        const guestsForList =  guests.filter(g => list.guests.includes(g.id));
        const csvString = guestsForList.reduce((prev, g) => {
            return `${prev}\r\n${g.name},${`${g.address} ${g.city} ${g.state} ${g.zip}`.trim()},${g.rsvpState},${g.code}`;
        }, 'data:text/csv;charset=utf-8,name,address,rsvp,code')
            .replaceAll('undefined', '')
            .replaceAll(',   ,', ',,');
        window.location.assign(encodeURI(csvString));
    }

    const aggregateColumns = [
        {
            name: 'List',
            type: 'TEXT',
            property: 'name',
        },
        {
            name: 'Total',
            type: 'NUMBER',
            property: 'totalGuests',
        },
        {
            name: 'Yes',
            type: 'NUMBER',
            property: 'guestsAttending',
        },
        {
            name: 'No',
            type: 'NUMBER',
            property: 'guestsNotAttending',
        },
        {
            name: 'Maybe',
            type: 'NUMBER',
            property: 'guestsTentative',
        },
    ];

    const listDatacolumns = [
        {
            name: '',
            type: 'BUTTONS',
            buttons: [
                {
                    property: 'view',
                    onClick: handleClickCell,
                    buttonText: Symbols.view,

                },
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
            leftButtons={[{
                label: 'csv',
                onClick: () => handleClickDownloadList(list),
            }]}
            columns={listDatacolumns}
            data={guests.filter(g => list.guests.includes(g.id)).sort((a, b) => a.name.localeCompare(b.name))}
        />
    )
    
    return (
        <div className='width-80 container'>
            <TitleWithButtons
                title="Guest Lists"
                rightButtons={[{label: Symbols.plus, onClick: () => handleClickChangePage('ADD_LIST', lists)}]}
            />
            <Table
                keyPrefix={`key-aggregate-table`}
                key={`key-aggregate-table`}
                columns={aggregateColumns}
                data={aggregateData}
            />
            {tables}
        </div>
    );
}