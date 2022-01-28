import React, { useState, useEffect } from 'react';

import { getVaccineImageURL } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { LabeledValue } from '../components/LabeledValue';
import Symbols from '../components/Symbols';

export function ViewGuestPage(props) {
    const { handleClickChangePage } = props;

    const [guest, setGuest] = useState(props.guest);
    const [vaccineURL, setVaccineURL] = useState('');

    const {
        firstName,
        lastName,
        email,
        code,
        rsvpState,
        rsvpDate,
        id,
    } = guest;

    

    useEffect(async () => { 
        setVaccineURL(await getVaccineImageURL(id))
    }, [])

    return (
        <div className="container">
            
            <TitleWithButtons
                title={`${firstName} ${lastName}`}
                leftButtons={[{label: Symbols.left, onClick: () => handleClickChangePage('GUEST_LIST')}]}
                rightButtons={[{label: Symbols.edit, onClick: () => handleClickChangePage('EDIT_GUEST', guest)}]}
            />
            <div className="info-container">
                <LabeledValue label="First Name" value={firstName}/>
                <LabeledValue label="Last Name" value={lastName}/>
                <LabeledValue label="Email" value={email}/>
                <LabeledValue label="RSVP" value={rsvpState}/>
                <LabeledValue label="Guest Code" value={code}/>
                <p><strong>Vaccine Image</strong></p>
                {vaccineURL && <img src={vaccineURL}/>}
            </div>
        </div>
    )
}