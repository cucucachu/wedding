import React, { useState, Fragment } from 'react';

import { checkGuestCode, loginOrCreateGuestAccount } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Form } from '../components/Form';
import { Spinner } from '../components/Spinner';

export function GuestCodePage(props) {
    const { handleClickChangePage, handleSuccessfulLoginGuest, email } = props;

    const [code, setCode] = useState('');
    const [error, setError] = useState(' ');
    const [loading, setLoading] = useState(false);

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
            setLoading(true);
            const { valid } = await checkGuestCode(code);

            if (valid) {
                setError(' ');
                const userCredential = await loginOrCreateGuestAccount(email, code);
                console.log('done with firebase');
                await handleSuccessfulLoginGuest(userCredential.user);
            }
            else {
                setLoading(false);
                setError('Inavlid Code');
            }
        }
        catch (error) {
            setLoading(false);
            setError(error.message);
        }
    }
    

    return (
        <div className='container'>
            <TitleWithButtons
                leftButtons={[{label: '❮', onClick: () => handleClickChangePage('GUEST_EMAIL')}]}
                title="RSVP"
            />
            {loading ? <Spinner/> :
                <Fragment>
                    <p>Please enter the guest code that came with your invitation.</p>
                    <p className="error-text">{error}</p>
                    <Form
                        fields={fields}
                        data={{code}}
                        onChange={onChange}
                        onSubmit={onSubmit}
                        submitText={'Submit'}
                    />
                </Fragment>
            }
        </div>
    )
}