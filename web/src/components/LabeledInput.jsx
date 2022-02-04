import React from 'react';

import { LabeledTextInput } from './LabeledTextInput';
import { LabeledTextAreaInput } from './LabeledTextAreaInput';
import { LabeledCheckboxInput } from './LabeledCheckboxInput';
import { LabeledSelectInput } from './LabeledSelectInput';
import { LabeledDateInput } from './LabeledDateInput';

export function LabeledInput(props) {
    const { type } = props;

    if (type === 'checkbox') {
        return <LabeledCheckboxInput {...props}/>
    }
    if (type === 'select') {
        return <LabeledSelectInput {...props}/>
    }
    if (type === 'textarea') {
        return <LabeledTextAreaInput {...props}/>
    }
    if (type === 'date') {
        return <LabeledDateInput {...props}/>
    }
    else {
        return <LabeledTextInput {...props}/>
    }
}