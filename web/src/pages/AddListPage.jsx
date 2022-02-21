import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 

import { db } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { Form } from '../components/Form';

export function AddListPage(props) {
    const { handleClickChangePage, lists } = props;

    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const fields = [{
        label: 'List Name',
        property: 'name',
        type: 'text',
        required: true,
    }]

    const onSubmit = async () => {
        try {
            await addDoc(collection(db, 'lists'), {
                name,
                order: lists.length,
                guests: [],
            });
            handleClickChangePage('GUEST_LIST');
        }
        catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="form-container">
            <TitleWithButtons
                title="Add List"
                leftButtons={[{label: '❮', onClick: () => handleClickChangePage('GUEST_LIST')}]}
            />
            {error && <p className="error-text">{error}</p>}
            <Form
                fields={fields}
                data={{name}}
                onChange={e => setName(e.target.value)}
                onSubmit={onSubmit}
            />
        </div>
    )
}