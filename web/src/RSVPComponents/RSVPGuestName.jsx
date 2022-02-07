import React, { useState } from 'react';

import { Form } from '../components/Form';

export function RSVPGuestName(props) {
    const { handleSetRSVPGuestName } = props;

    const [name, setName] = useState({firstName: '', lastName: ''});

    const onChange = e => {
        setName({
            ...name,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <div>
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
                ]}
                data={name}
                onChange={onChange}
                onSubmit={() => handleSetRSVPGuestName(name)}
            />
        </div>
    )
}