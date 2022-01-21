import React from 'react';

export function RSVPStart(props) {
    const { setStep, handleRSVPNo } = props;

    return (
        <div>
            <button 
                onClick={() => setStep('VACCINE_QUESTION')}

            >I Will Attend</button>
            <button 
                onClick={handleRSVPNo}
            >I Will Not Be Attending</button>
        </div>
    )
}