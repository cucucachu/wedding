import React from 'react';

export function RSVPConfirmed(props) {
    const { setStep, rsvpState } = props;

    const message1 = rsvpState === 'YES' ? 'You have rsvp\'d Yes' : 'You have rsvp\'d No'
    const message2 = rsvpState === 'YES' ? 'We look forward to seeing you August 13th.' : 'We\'ll miss you!'

    return (
        <div>
            <p className="center-text">{message1}</p>
            <p className="center-text">{message2}</p>
            {setStep && 
                <button 
                    onClick={() => setStep('YES_OR_NO')}
                >Change my RSVP</button>
            }
        </div>
    )
}