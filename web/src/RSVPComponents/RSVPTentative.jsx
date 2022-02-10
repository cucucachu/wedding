import React from 'react';

import { RSVPDueDate } from './RSVPDueDate';

export function RSVPTentative(props) {
    const { setStep, rsvpDueDate } = props;

    return (
        <div>
            <p className='center-text'>Your rsvp is pending vaccination</p>
            <RSVPDueDate rsvpDueDate={rsvpDueDate}/>
            <button 
                onClick={() => setStep('UPLOAD')}
            >I got my vaccine!</button>
            <button 
                onClick={() => setStep('YES_OR_NO')}
            >Change My RSVP</button>
        </div>
    )
}