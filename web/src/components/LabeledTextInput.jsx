import React from 'react';

export function LabeledTextInput(props) {
    const { type, label, value, required, property, onChange } = props;

    return (
        <div className='labeled-input'>
            <label>{label}</label>
            <input 
                type={type} 
                value={value} 
                onChange={onChange} 
                required={!!required} 
                property={property}
                name={property}            
            />
        </div>
    );
}