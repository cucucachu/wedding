import React, { useState, useEffect } from 'react';

import { getVaccineImageURL } from '../firebase';

import { TitleWithButtons } from '../components/TitleWithButtons';
import { LabeledValue } from '../components/LabeledValue';
import Symbols from '../components/Symbols';

export function ViewGuestPage(props) {
    const { guest, handleClickChangePage } = props;

    const [vaccineURL, setVaccineURL] = useState('');

    const {
        firstName,
        lastName,
        name,
        plusOneForName,
        email,
        code,
        rsvpState,
        address,
        city,
        state,
        zip,
        id,
    } = guest;

    const addressString = address ? `${address} ${city}, ${state} ${zip}` : '';

    useEffect(async () => { 
        if (props.guest.rsvpState === 'YES')
            setVaccineURL(await getVaccineImageURL(id))
    }, [])

    return (
        <div className="form-container">
            
            <TitleWithButtons
                title={name}
                leftButtons={[{label: Symbols.left, onClick: () => handleClickChangePage('GUEST_LIST')}]}
                rightButtons={[{label: Symbols.edit, onClick: () => handleClickChangePage('EDIT_GUEST', guest)}]}
            />
            <div className="info-container">
                <LabeledValue label="First Name" value={firstName}/>
                <LabeledValue label="Last Name" value={lastName}/>
                <LabeledValue label="Guest Code" value={code}/>
                <LabeledValue label="Plus One For" value={plusOneForName} doNotShowIfEmpty={true}/>
                <LabeledValue label="Email" value={email} doNotShowIfEmpty={true}/>
                <LabeledValue label="Address" value = {addressString} doNotShowIfEmpty={true}/>
                <LabeledValue label="RSVP" value={rsvpState}/>
                
                {vaccineURL && 
                    <div>
                        <p><strong>Vaccine Image</strong></p>
                        <img src={vaccineURL}/>
                    </div>
                }
            </div>
        </div>
    )
}