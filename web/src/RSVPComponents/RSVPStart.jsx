import React from 'react';

import { RSVPDueDate } from './RSVPDueDate';

export function RSVPStart(props) {
    const { setStep, handleRSVPNo, rsvpDueDate} = props;

    return (
        <div>
            <RSVPDueDate rsvpDueDate={rsvpDueDate}/>
            <button 
                onClick={() => setStep('VACCINE_QUESTION')}
            >I Will Attend</button>
            <button 
                onClick={handleRSVPNo}
            >I Will Not Be Attending</button>
        </div>
    )
}