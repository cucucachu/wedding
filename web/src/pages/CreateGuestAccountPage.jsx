import React, { useState } from 'react';

import { createGuestAccount } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Form } from '../components/Form';

export function CreateGuestAccountPage(props) {

    const { guest, handleClickChangePage, handleSuccessfulLoginGuest } = props;

    const [account, setAccount] = useState({
        email: guest.email ? guest.email : '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');

    const fields = [
        {
            label: 'Email',
            type: 'email',
            property: 'email',
            required: true,
        },
        {
            label: 'Password',
            type: 'password',
            property: 'password',
            required: true,
        },
        {
            label: 'Confirm Password',
            type: 'password',
            property: 'confirmPassword',
            required: true,
        },
    ];

    const onChange = e => {
        e.preventDefault();

        setAccount({
            ...account,
            [e.target.attributes.property.value]: e.target.value,
        });
    }

    const onSubmit = async e => {
        const { email, password, confirmPassword } = account;

        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Your passwords do not match.')
            return;
        }

        try {
            guest.email = email;
            const userCredential = createGuestAccount(guest, password)
            handleSuccessfulLoginGuest(userCredential.user);
        }
        catch (error) {
            console.log(error);
            setError(`Something went wrong :/\n${error.message}`);
        }
    }

    return (
        <div className="container">
            <TitleWithButtons
                title={`Create an Account`}
            />
            <p>Create an account to continue your RSVP.</p>
            <p>Don't worry. Cody created this site, so your data isn't going anywhere.</p>
            <p>
                The account lets you update your RSVP, access the private wedding board and receive
                emails about any wedding updates.
            </p>
            {error && <p className="error-text">{error}</p>}
            <Form
                fields={fields}
                data={account}
                onChange={onChange}
                onSubmit={onSubmit}
            />
        </div>
    )

}