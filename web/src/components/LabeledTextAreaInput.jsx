import React from 'react';

export function LabeledTextAreaInput(props) {
    const { label, value, required, property, onChange } = props;

    return (
        <div className='labeled-input'>
            <label>{label}</label>
            <textarea 
                value={value}
                onChange={onChange} 
                required={!!required} 
                property={property}
                rows="6"
                cols="40"
            />
        </div>
    );
}