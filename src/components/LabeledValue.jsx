import React from 'react';

import { LabeledTextValue } from './LabeledTextValue';
import { LabeledCheckboxValue } from './LabeledCheckboxValue';

export function LabeledValue(props) {
    const { value } = props;

    let display = '';

    switch (typeof(value)) {
        case 'boolean':
            display = <LabeledCheckboxValue {...props}/>
            break;
        default:
            display = <LabeledTextValue {...props}/>
    }

    return display;
}