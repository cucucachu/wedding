import React from 'react';

import { LabeledTextInput } from './LabeledTextInput';
import { LabeledCheckboxInput } from './LabeledCheckboxInput';

export function LabeledInput(props) {
    const { type, label, value, required, property, onChange } = props;

    if (type === 'checkbox') {
        return <LabeledCheckboxInput {...props}/>
    }
    else {
        return <LabeledTextInput {...props}/>
    }
}