import React, { useState, useEffect } from "react";
import { Spinner } from "../components/Spinner";

import { getGuest, getRSVPDueDate } from "../firebase";
import { RSVP } from '../RSVPComponents/RSVP';

export function GuestHomePage(props) {
    const { user } = props;

    const [guest, setGuest] = useState({});
    const [rsvpDueDate, setRsvpDueDate] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(loadGuest, []);
    useEffect(loadRSVPDueDate, [guest]);

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

    async function loadRSVPDueDate() {
        console.log('loadRSVPDate()');
        try {
            if (guest.id) {
                const response = await getRSVPDueDate(guest.id);
                const rsvpDate = response.rsvpDate;
                const rsvpClosed = (new Date()).getTime() > (new Date(rsvpDate)).getTime();
                setRsvpDueDate({
                    rsvpDate, 
                    rsvpClosed,
                });
            }
            else {
                console.log('no guest id');
            }
        }
        catch(error) {
            setError(error.message);
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
                    rsvpDueDate={rsvpDueDate}
                    loadGuest={loadGuest}
                ></RSVP>
            </div>
        )
    }
}