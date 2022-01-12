import React from 'react';

import { LabeledInput } from './LabeledInput';

export function Form(props) {
    const { fields, data, onChange, onSubmit, submitText } = props;


    const labeledInputs = fields.map(field => 
        <LabeledInput
            key={`input-${field.property}`}
            label={field.label}
            value={data[field.property]}
            property={field.property}
            type={field.type}
            requied={!!field.requied}
            onChange={onChange}
            options={field.options}
        />
    );

    return (
        <form onSubmit={e => {e.preventDefault(); onSubmit(e)}}>
            {labeledInputs}
            <input type="submit" value={submitText ? submitText : 'Submit'}/>
        </form>
    )
}