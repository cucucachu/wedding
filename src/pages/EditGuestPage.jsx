import React, { useState} from 'react';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Form } from '../components/Form';

import { updateGuest } from '../firebase';

export function EditGuestPage(props) {
    const { handleClickChangePage } = props;

    const [guest, setGuest] = useState(props.guest);
    const [error, setError] = useState('');

    const {
        firstName,
        lastName,
    } = props.guest;

    const onChange = e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setGuest({
            ...guest,
            [e.target.attributes.property.value]: value,
        });
    }

    const onSubmit = async e => {
        e.preventDefault();
        try {
            await updateGuest({...guest});
            handleClickChangePage('GUESTLIST');
        }
        catch (error) {
            console.log(error);
            setError('Something went wrong :/');
        }
    }

    const fields = [
        {
            label: 'First Name',
            property: 'firstName',
            type: 'text',
            required: true,
        },
        {
            label: 'Last Name',
            property: 'lastName',
            type: 'text',
            required: true,
        },
        {
            label: 'Email',
            property: 'email',
            type: 'email',
        },
        {
            label: 'Allowed a Plus 1',
            property: 'hasPlusOne',
            type: 'checkbox',
        },
        {
            label: 'Vaccine Verified',
            property: 'vaccineVerified',
            type: 'checkbox',
        },
    ]

    return (
        <div className="container">
            <TitleWithButtons
                title={`${firstName} ${lastName}`}
                leftButtons={[{label: '❮', onClick: () => handleClickChangePage('GUESTLIST')}]}
            />
            {error && <p className="error-text">{error}</p>}
            <Form
                fields={fields}
                data={guest}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </div>
    )
}