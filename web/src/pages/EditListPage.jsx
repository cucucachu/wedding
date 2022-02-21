import React, { useState } from 'react';

import { updateGuestList } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Table } from '../components/Table';
import Symbols from '../components/Symbols';
import { Form } from '../components/Form';
import { Spinner } from '../components/Spinner';

export function EditListPage(props) {
    const { handleClickChangePage, currentList, currentGuests } = props;

    if (!currentList) {
        return <Spinner/>
    }

    const emptyGuest = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        hasPlusOne: false,
        removeable: true,
    }

    const primaryGuests = currentGuests.filter(g => !g.additionalGuestFor);
    const additionalGuests = currentGuests.filter(g => g.additionalGuestFor);

    // const [guests, setGuests] = useState(currentGuests && currentGuests.length ? currentGuests : [{...emptyGuest}]);
    const [guests, setGuests] = useState((currentGuests && currentGuests.length ? primaryGuests : [{...emptyGuest}]).sort((a,b) => a.name.localeCompare(b.name)));
    const [list, setList] = useState({...currentList});
    const [error, setError] = useState('');

    const onAddGuest = () => {
        const newGuests = guests.map(g => {return {...g}});
        newGuests.push({...emptyGuest});
        setGuests(newGuests);
    }

    const onRemoveGuest = e => {
        const newGuests = guests.map(g => {return {...g}});
        const cellRow = e.target.parentElement.attributes.row.value;
        newGuests.splice(cellRow, 1);
        setGuests(newGuests);
    }

    const handleChangeCell = e => {

        const cellRow = e.target.parentElement.attributes.row.value;
        const property = e.target.name ? e.target.name : e.target.parentElement.name;

        const newGuests = guests.map(g => {return {...g}});

        let value = e.target.value;

        if (property === 'hasPlusOne') {
            value = e.target.checked;
        }

        newGuests[cellRow][property] = value;

        setGuests(newGuests);

    }

    const handleChangeForm = e => {
        setList({
            ...list,
            [e.target.name]: e.target.value,
        });
    }

    const onSubmit = async () => {
        try {
            // const sanitizedGuests = [...guests];
            const sanitizedGuests = [...guests, ...additionalGuests];
            sanitizedGuests.forEach(g => {
                delete g.removeable; 
                delete g.name; 
            });
            const sanitizedList = {...list};
            await updateGuestList(sanitizedList, sanitizedGuests);
            handleClickChangePage('GUEST_LIST');
        }
        catch (error) {
            setError(error.message);
        }
    }

    const columns = [
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
            doNotShowOnMobile: true,
        },
        {
            name: 'Address',
            property: 'address',
            type: 'TEXT',
            edit: true,
            doNotShowOnMobile: true,
        },
        {
            name: 'City',
            property: 'city',
            type: 'TEXT',
            edit: true,
            doNotShowOnMobile: true,
        },
        {
            name: 'State',
            property: 'state',
            type: 'TEXT',
            edit: true,
            doNotShowOnMobile: true,
        },
        {
            name: 'Zip',
            property: 'zip',
            type: 'TEXT',
            edit: true,
            doNotShowOnMobile: true,
        },
        {
            name: 'Plus One',
            property: 'hasPlusOne',
            type: 'BOOLEAN',
            edit: true,
        },
        {
            type: 'BUTTON',
            property: 'removeable',
            onClick: onRemoveGuest,
            buttonText: Symbols.x,
            showOnlyIfValue: true,
        },
    ];
    
    const fields = [
        {
            label: 'List Name',
            property: 'name',
            type: 'text',
            required: true,
        },
        {
            label: 'RSVP Due Date',
            property: 'rsvpDate',
            type: 'date',
            required: true,
        },
    ]

    return (
        <div className="width-80 container">
            <TitleWithButtons
                title={`Edit ${currentList.name}`}
                leftButtons={[{label: Symbols.left, onClick: () => handleClickChangePage('GUEST_LIST')}]}
                rightButtons={[{label: 'Save', onClick: onSubmit}]}
            />
            <div className="container">
                <Form
                    fields={fields}
                    data={list}
                    onChange={handleChangeForm}
                />
            </div>
            <Table
                keyPrefix="add_guests_to_list_table"
                key="add_guests_to_list_table"
                title={currentList.name}
                rightButtons={[{label: Symbols.plus, onClick: onAddGuest}]}
                columns={columns}
                data={guests}
                handleChangeCell={handleChangeCell}
            />
            {error && <p className="error-text">{error}</p>}
        </div>
    )
}