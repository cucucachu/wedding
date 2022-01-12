import React from 'react';

import { Checkbox } from './Checkbox';

export function LabeledCheckboxValue(props) {
    const { label, value } = props;

    return (
        <div className="labeled-value-checkbox">
            <label>{label}</label>
            <Checkbox checked={value}/>
        </div>
    )
}