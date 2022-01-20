import React, { useState } from 'react';

import { Spinner } from "../components/Spinner";

export function RSVP(props) {
    const { guest } = props;

    const [step, setStep] = useState('START');

    let display;

    if (guest) {
        switch(step) {
            case 'YES_OR_NO':
                break;
            case 'VACCINE_QUESTION':
                break;
            case 'UPLOAD':
                break;
            case 'NO':
                break;
            case 'DONE':
                break;
            default:
                display = <Spinner/>
        }
    }
    else {
    }

    return (
        <div>
            <h3 className="center-text">RSVP</h3>
            {display}
        </div>
    );
}