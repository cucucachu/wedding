import React from 'react';

export function LabeledSelectInput(props) {
    const { type, label, value, required, property, options, onChange } = props;

    const htmlOptions = options.map((o, i) => 
        <option 
            value={o.value}
            key={`input-${label}-option-${i}`}
        >
            {o.label}
        </option>
    );

    return (
        <div className='labeled-input'>
            <label>{label}</label>
            <select 
                type={type} 
                value={value} 
                onChange={onChange} 
                required={!!required} 
                property={property}
            >
                {htmlOptions}
            </select>

        </div>
    );
}