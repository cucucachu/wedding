import React from 'react';

export function RSVPVaccine(props) {
    const { setStep, handleRSVPNo, handleRSVPTentative } = props;

    return (
        <div>
            <p>
                To ensure we can have the most fun and least restrictions possible, 
                we're requiring that all our guests be vaccinated to attend.
            </p>
            <p>
                If you're not already vaccinated, you can still attend if you get vaccinated by
                the rsvp date.
            </p>
            <button 
                onClick={() => setStep('UPLOAD')}
            >I am Vaccinated</button>
            <button 
                onClick={handleRSVPTentative}
            >I Will Get Vaccinated</button>
            <button 
                onClick={handleRSVPNo}
            >I Will Not Be Attending</button>
        </div>
    )
}