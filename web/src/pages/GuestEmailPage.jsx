import React, { useState } from 'react';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Form } from '../components/Form';

export function GuestEmailPage(props) {
    const { handleClickChangePage } = props;

    const [email, setEmail] = useState('');

    const fields = [{
        label: 'Email',
        property: 'email',
        type: 'email',
    }];

    const onChange = e => {
        e.preventDefault();

        setEmail(e.target.value);
    }

    const onSubmit = async e => {
            handleClickChangePage('GUEST_CODE', email);
    }
    

    return (
        <div className='form-container'>
            <TitleWithButtons
                leftButtons={[{label: '❮', onClick: () => handleClickChangePage('HOME')}]}
                title="RSVP"
            />
            <p>What is the best email to contact you at?</p>
            <Form
                fields={fields}
                data={{email}}
                onChange={onChange}
                onSubmit={onSubmit}
                submitText={'Submit'}
            />
        </div>
    )
}