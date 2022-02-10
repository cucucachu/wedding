import React, { useState } from 'react';

import { updateGuest, uploadImage } from '../firebase';

import { Spinner } from "../components/Spinner";
import { RSVPStart } from './RSVPStart';
import { RSVPGuestName } from './RSVPGuestName';
import { RSVPVaccine } from './RSVPVaccine';
import { RSVPUpload } from './RSVPUpload';
import { RSVPTentative } from './RSVPTentative';
import { RSVPConfirmed } from  './RSVPConfirmed';
import { RSVPClosed } from './RSVPClosed';

export function RSVP(props) {
    const { 
        guest,
        rsvpDueDate,
        loadGuest,
    } = props;


    const { rsvpState } = guest;

    if (rsvpDueDate && rsvpDueDate.rsvpClosed) {
        return (
            <div>
                <hr/>
                <h3 className="center-text">RSVP</h3>
                <RSVPClosed rsvpState={rsvpState}/>
            </div>
        )
    }

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    let display;

    let initialStep = 'YES_OR_NO';

    if (rsvpState === 'YES' || rsvpState === 'NO') {
        initialStep = 'CONFIRMED';
    }
    else if (!guest.firstName && !guest.lastName) {
        initialStep = 'PLUS_ONE_NAME';
    }
    else if (rsvpState === 'TENTATIVE') {
        initialStep = 'TENTATIVE';
    }

    const [step, setStep] = useState(initialStep)

    async function handleRSVPNo() {
        const updatedGuest = {...guest};
        updatedGuest.rsvpState = 'NO';
        try {
            await updateGuest(updatedGuest);
            await loadGuest();
        }
        catch (error) {
            setError(error.message);
        }
    }

    async function handleRSVPYes(image) {
        if (image) {
            setUploading(true);
            const updatedGuest = {...guest};
            try {
                await uploadImage(`/vaccineImages/${guest.id}`, image);
                updatedGuest.rsvpState = 'YES';
                await updateGuest(updatedGuest);
                await loadGuest();
            }
            catch (error) {
                setUploading(false);
                setError(error.message);
            }
        }
        else {
            setError('Please select an image.');
        }
    }

    async function handleSetRSVPGuestName({firstName, lastName}) {
        const updatedGuest = {...guest, firstName, lastName};
        try {
            await updateGuest(updatedGuest);
            await loadGuest();
        }
        catch (error) {
            setError(error.message);
        }
    }

    async function handleRSVPTentative() {
        const updatedGuest = {...guest};
        updatedGuest.rsvpState = 'TENTATIVE';
        try {
            await updateGuest(updatedGuest);
            await loadGuest();
        }
        catch (error) {
            setError(error.message);
        }
    }

    switch(step) {
        case 'YES_OR_NO':
            display = <RSVPStart
                rsvpDueDate={rsvpDueDate}
                setStep={setStep}
                handleRSVPNo={handleRSVPNo}
            />
            break;
        case 'PLUS_ONE_NAME':
            display = <RSVPGuestName
                handleSetRSVPGuestName={handleSetRSVPGuestName}
            />
            break;
        case 'VACCINE_QUESTION':
            display = <RSVPVaccine
                setStep={setStep}
                handleRSVPTentative={handleRSVPTentative}
                handleRSVPNo={handleRSVPNo}
            />
            break;
        case 'UPLOAD':
            display = <RSVPUpload
                handleRSVPYes={handleRSVPYes}
                uploading={uploading}
            />
            break;
        case 'CONFIRMED':
            display = <RSVPConfirmed 
                rsvpState={rsvpState}
                setStep={setStep}
            />
            break;
        case 'TENTATIVE':
            display = <RSVPTentative 
                rsvpDueDate={rsvpDueDate}
                setStep={setStep}
            />
            break;
        default:
            display = <Spinner/>
    }

    return (
        <div>
            <hr/>
            <h3 className="center-text">RSVP</h3>
            <p className="error-text">{error}</p>
            {display}
            <hr/>
        </div>
    );
}