import React, { useState } from 'react';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Form } from '../components/Form';

export function CreateGuestAccountPage(props) {

    const { guest, handleClickChangePage } = props;
    const { error, setError } = props;

    const [account, setAccount] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

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
        setAccount({
            ...account,
            [e.target.attributes.property.value]: e.target.value,
        });
    }

    const onSubmit = async e => {
        e.preventDefault();
        try {
            // await createAccount({...account, guest});
            // handleClickChangePage('GUEST_HOME');
        }
        catch (error) {
            console.log(error);
            setError('Something went wrong :/');
        }
    }

    return (
        <div className="container">
            <TitleWithButtons
                title={`Create an Account`}
            />
            <p>If you plan to attend, please create an account.</p>
            <p>Don't worry. Cody created this site, so your data isn't going anywhere.</p>
            <p>
                The account lets you update your RSVP, post images and messages, and receive
                emails about any wedding updates.
            </p>
            <p>
                If you're RSVP'ing to say you will not be attending, click the "Will Not Attend" button below.
                No need to create an account.
            </p>
            {error && <p className="error-text">{error}</p>}
            <Form
                fields={fields}
                data={guest}
                onChange={onChange}
                onSubmit={onSubmit}
                submitText="I Will Attend"
            />
            <h3 className="center-text">Or</h3>
            <button>I Will Not Attend</button>
        </div>
    )

}