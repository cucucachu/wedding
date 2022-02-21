import React, { useState } from 'react';

import { Form } from '../components/Form';

export function RSVPGuestNameAndEmail(props) {
    const { handleSetRSVPGuestNameAndEmail, guest } = props;
    const { firstName, lastName, email } = guest;

    const [contact, setContact] = useState({
        firstName: firstName ? firstName : '',
        lastName: lastName ? lastName : '',
        email: email ? email : '',
    });

    const onChange = e => {
        setContact({
            ...contact,
            [e.target.name]: e.target.value,
        });
    }



    return (
        <div>
            <p>Please complete your contact information.</p>
            <Form
                fields={[
                    {
                        property: 'firstName',
                        label: 'First Name',
                        type: 'text',
                    },
                    {
                        property: 'lastName',
                        label: 'Last Name',
                        type: 'text',
                    },
                    {
                        property: 'email',
                        label: 'Email',
                        type: 'email',
                        required: true,
                    },
                ]}
                data={contact}
                onChange={onChange}
                onSubmit={() => handleSetRSVPGuestNameAndEmail(contact)}
            />
        </div>
    )
}