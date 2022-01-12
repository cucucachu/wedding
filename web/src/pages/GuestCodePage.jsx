import React, { useState } from 'react';

import { checkGuestCode, createGuestAccount } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Form } from '../components/Form';

export function GuestCodePage(props) {
    const { handleClickChangePage, handleSuccessfulLoginGuest, email } = props;

    const [code, setCode] = useState('');
    const [error, setError] = useState(' ');

    const fields = [{
        label: 'Guest Code',
        property: 'code',
        required: true,
        type: 'text',
    }];

    const onChange = e => {
        e.preventDefault();

        setCode(e.target.value.toUpperCase());
    }

    const onSubmit = async e => {
        try {
            const { valid } = await checkGuestCode(code);

            if (valid) {
                setError(' ');
                const userCredential = await createGuestAccount(email, code);
                await handleSuccessfulLoginGuest(userCredential.user);
            }
            else {
                setError('Inavlid Code');
            }
        }
        catch (error) {
            setError(error.message);
        }
    }
    

    return (
        <div className='container'>
            <TitleWithButtons
                leftButtons={[{label: '❮', onClick: () => handleClickChangePage('HOME')}]}
                title="RSVP"
            />
            <p>Please enter the guest code that came with your invitation.</p>
            <p className="error-text">{error}</p>
            <Form
                fields={fields}
                data={{code}}
                onChange={onChange}
                onSubmit={onSubmit}
                submitText={'Submit'}
            />
        </div>
    )
}