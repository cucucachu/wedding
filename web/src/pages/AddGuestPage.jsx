import React, { useState } from 'react';
import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 

import { db } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Form } from '../components/Form';

export function AddGuestPage(props) {
    const { handleClickChangePage, list } = props;

    const [guest, setGuest] = useState({
        firstName: '',
        lastName: '',
        email: '',
        hasPlusOne: false,
    });

    const [error, setError] = useState('');

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
    ];

    const onChange = e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

        setGuest({
            ...guest,
            [e.target.attributes.property.value]: value,
        });
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

    return (
        <div className="container">
            <TitleWithButtons
                title="Add Guest"
                leftButtons={[{label: '❮', onClick: () => handleClickChangePage('GUEST_LIST')}]}
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