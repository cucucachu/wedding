import React from 'react';

import { LabeledInput } from './LabeledInput';

export function Form(props) {
    const { fields, data, onChange, onSubmit } = props;


    const labeledInputs = fields.map(field => 
        <LabeledInput
            key={`input-${field.property}`}
            label={field.label}
            value={data[field.property]}
            property={field.property}
            type={field.type}
            requied={!!field.requied}
            onChange={onChange}
        />
    );

    return (
        <form onSubmit={onSubmit}>
            {labeledInputs}
            <input type="submit" value="Submit"/>
        </form>
    )
}