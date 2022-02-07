import React, { useState, useEffect } from "react";
import { Spinner } from "../components/Spinner";

import { getGuest } from "../firebase";
import { RSVP } from '../RSVPComponents/RSVP';

export function GuestHomePage(props) {
    const { user } = props;

    const [guest, setGuest] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(loadGuest, []);

    async function loadGuest() {
        try {
            setLoading(true);
            setGuest(await getGuest({uid: user.uid}));
            setLoading(false);
        }
        catch(error) {
            setError(error.message);
            setLoading(false);
        }
    }

    if (loading) {
        return <Spinner />
    }
    else {
        return (
            <div className="container">
                <h2 className="center-text">{guest.name}</h2>
                <p className="error-text">{error}</p>
                <RSVP 
                    guest={guest}
                    loadGuest={loadGuest}
                ></RSVP>
            </div>
        )
    }
}