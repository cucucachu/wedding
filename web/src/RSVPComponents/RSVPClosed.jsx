import React from 'react';

import { RSVPConfirmed } from './RSVPConfirmed';

export function RSVPClosed(props) {
    const { rsvpState } = props;

    if (rsvpState === 'YES' || rsvpState === 'NO') {
        return <RSVPConfirmed rsvpState={rsvpState}/>
    }
    else {
        return (
            <p className="center-text">Sorry, the rsvp deadline has passed :(</p>
        )
    }
}