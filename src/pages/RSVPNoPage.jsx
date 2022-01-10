import React, { useState } from 'react';

import { updateGuest } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Form } from '../components/Form';

export function RSVPNoPage(props) {
    const { guest, handleClickChangePage } = props;

    const [rsvpNoMessage, setRSVPNoMessage] = useState('');

    const fields = [{
        label: 'Message',
        property: 'rsvpNoMessage',
        type: 'textarea',
    }];

    const onChange = e => {
        e.preventDefault();

        setRSVPNoMessage(e.target.value);
    }

    const onSubmit = async e => {
        guest.rsvpNo = true;
        guest.rsvpNoMessage = rsvpNoMessage;

        try {
            await updateGuest(guest);
            handleClickChangePage('RSVP_NO_COMPLETE');
        }
        catch (error) {
            console.log(error);
        }
    }
    

    return (
        <div className='container'>
            <TitleWithButtons
                leftButtons={[{label: '❮', onClick: () => handleClickChangePage('RSVP')}]}
                title="I Will Not Attend"
            />
            <p>We'll miss you!</p>
            <p>Confirm below, and optionally leave a message.</p>
            <Form
                fields={fields}
                data={{rsvpNoMessage}}
                onChange={onChange}
                onSubmit={onSubmit}
                submitText={'Confirm'}
            />
        </div>
    )
}