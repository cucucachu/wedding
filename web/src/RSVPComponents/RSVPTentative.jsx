import React from 'react';

export function RSVPTentative(props) {
    const { setStep } = props;

    return (
        <div>
            <p className='center-text'>Your rsvp is pending vaccination</p>
            <button 
                onClick={() => setStep('UPLOAD')}
            >I got my vaccine!</button>
            <button 
                onClick={() => setStep('YES_OR_NO')}
            >Change My RSVP</button>
        </div>
    )
}