import React, { useState, useEffect } from 'react';

import { getGuests } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Form } from '../components/Form';

export function RSVPPage(props) {
    const { handleClickChangePage } = props;

    const initialOption = {
        label: 'Select your name',
        value: 'DEFAULT',
    }

    const [error, setError] = useState('');
    const [guests, setGuests] = useState([]);
    const [selected, setSelected] = useState('DEFAULT');

    useEffect(async () => setGuests(await getGuests()), []);

    let options = guests.map(g => {
        return {
            label: `${g.firstName} ${g.lastName}`,
            value: g.id,
        }
    });
    
    options = [initialOption, ...options];

    const fields = [
        {
            label: 'Name',
            type: 'select',
            property: 'name',
            required: true,
            options,
        }
    ];

    const onChange = e => {
        setSelected(e.target.value);
    }

    const onSubmit = e => {
        if (selected !== 'DEFAULT') {
            handleClickChangePage('CREATE_GUEST_ACCOUNT', guests.filter(g => g.id === selected)[0])
        }
    }

    const handleRSVPNo = e => {
        if (selected !== 'DEFAULT') {
            handleClickChangePage('RSVP_NO', guests.filter(g => g.id === selected)[0])
        }
    }

    return (
        <div className="container">
            <TitleWithButtons
                title={`Welcome`}
                leftButtons={[{label: '❮', onClick: () => handleClickChangePage('HOME')}]}
            />
            {error && <p className="error-text">{error}</p>}
            <Form
                fields={fields}
                data={{name: selected}}
                onChange={onChange}
                onSubmit={onSubmit}
                submitText={'I Plan to Attend'}
            />
            <button onClick={handleRSVPNo}>I Will Not Attend</button>
        </div>
    )
}