import React from 'react';

import { Checkbox } from './Checkbox';

export function LabeledCheckboxInput(props) {
    const { type, label, value, required, property, onChange } = props;

    return (
        <label 
            className='labeled-input-checkbox'
            // onChange={onChange} 
            // property={property}
        >
            <input 
                type={type} 
                checked={value}
                required={!!required} 
                onChange={onChange} 
                property={property}
            />
            {label}
            <Checkbox checked={value}/>
        </label>
    );
}