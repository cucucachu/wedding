import React from 'react';

import { LabeledTextInput } from './LabeledTextInput';
import { LabeledCheckboxInput } from './LabeledCheckboxInput';
import { LabeledSelectInput } from './LabeledSelectInput';

export function LabeledInput(props) {
    const { type } = props;

    if (type === 'checkbox') {
        return <LabeledCheckboxInput {...props}/>
    }
    if (type === 'select') {
        return <LabeledSelectInput {...props}/>
    }
    else {
        return <LabeledTextInput {...props}/>
    }
}