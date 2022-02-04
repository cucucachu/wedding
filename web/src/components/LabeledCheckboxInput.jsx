import React from 'react';

import { Checkbox } from './Checkbox';

export function LabeledCheckboxInput(props) {
    const { type, label, value, required, property, onChange } = props;

    const checked = value ? 'true' : 'false';

    return (
        <label 
            className='labeled-input-checkbox'
        >
            <input 
                type={type} 
                checked={checked}
                required={!!required} 
                onChange={onChange} 
                property={property}
                name={property}
            />
            {label}
            <Checkbox checked={value}/>
        </label>
    );
}