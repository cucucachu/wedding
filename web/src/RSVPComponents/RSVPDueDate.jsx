import React from 'react';

export function RSVPDueDate(props) {
    const { rsvpDueDate } = props;
    const rsvpDate = rsvpDueDate.rsvpDate;
    
    if (rsvpDueDate && rsvpDueDate.rsvpDate) {
        const rsvpDate = rsvpDueDate.rsvpDate;
        if (rsvpDueDate.rsvpClosed) {
            return <p className='center-text'>Sorry it is too late to RSVP</p>
        }
        else {
            return (
                <p className='center-text'>Please RSVP by {(new Date(rsvpDate)).toLocaleDateString()}</p>
            )
        }
    }
    else {
        console.log('rsvpDate does not exist')
        return null;
    }
}