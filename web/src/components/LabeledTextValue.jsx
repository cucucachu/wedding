import React from 'react';

export function LabeledTextValue(props) {
    const { label, value } = props;

    return (
        <div className="labeled-value">
            <label>{label}</label>
            <p>{value}</p>
        </div>
    )
}