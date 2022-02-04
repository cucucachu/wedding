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
        email,
        code,
        rsvpState,
        rsvpDate,
        id,
    } = guest;

    

    useEffect(async () => { 
        if (props.guest.rsvpState === 'YES')
            setVaccineURL(await getVaccineImageURL(id))
    }, [])

    return (
        <div className="container">
            
            <TitleWithButtons
                title={name}
                leftButtons={[{label: Symbols.left, onClick: () => handleClickChangePage('GUEST_LIST')}]}
                rightButtons={[{label: Symbols.edit, onClick: () => handleClickChangePage('EDIT_GUEST', guest)}]}
            />
            <div className="info-container">
                <LabeledValue label="First Name" value={firstName}/>
                <LabeledValue label="Last Name" value={lastName}/>
                <LabeledValue label="Email" value={email}/>
                <LabeledValue label="RSVP" value={rsvpState}/>
                <LabeledValue label="Guest Code" value={code}/>
                
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