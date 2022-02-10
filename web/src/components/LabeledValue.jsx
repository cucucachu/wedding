import React from 'react';

import { LabeledTextValue } from './LabeledTextValue';
import { LabeledCheckboxValue } from './LabeledCheckboxValue';

export function LabeledValue(props) {
    const { value, doNotShowIfEmpty } = props;

    if (doNotShowIfEmpty && !value) {
        return null;
    }

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