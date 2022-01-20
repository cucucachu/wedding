import React, { useState, useEffect } from "react";

import { getGuest } from "../firebase";
import { RSVP } from '../RSVPComponents/RSVP';

export function GuestHomePage(props) {
    const { user } = props;

    const [guest, setGuest] = useState({});
    const [error, setError] = useState('')

    useEffect(async () => {
        try {
            setGuest(await getGuest({uid: user.uid}));
        }
        catch(error) {
            setError(error.message);
        }
    }, []);

    return (
        <div className="container">
            <h2 className="center-text">{guest.firstName} {guest.lastName}</h2>
            <p className="error-text">{error}</p>
            <RSVP guest={guest}></RSVP>
        </div>
    )
}