import React, { useState} from 'react';

import { LabeledValue } from '../components/LabeledValue';

export function ViewGuestPage(props) {
    const { onClickGuestList, onClickEditGuest } = props;

    const [guest, setGuest] = useState(props.guest);

    const {
        firstName,
        lastName,
        email,
        hasPlusOne,
        rsvp,
        vaccinated,
        vaccineVerified,
        vaccineImage,
        attending,
    } = guest;

    return (
        <div className="container">
            <div className="title-with-buttons">
                <button className="button-link" onClick={onClickGuestList}>❮</button>
                <h2 className="center-text">{firstName} {lastName}</h2>
                <button className="button-link" onClick={() => onClickEditGuest(guest)}>📝</button>
            </div>
            <div className="info-container">
                <LabeledValue label="First Name" value={firstName}/>
                <LabeledValue label="Last Name" value={lastName}/>
                <LabeledValue label="Email" value={email}/>
                <LabeledValue label="Allowed a Plus 1" value={hasPlusOne}/>
                <LabeledValue label="Has RSVP'ed" value={rsvp}/>
                <LabeledValue label="Is Vaccinated" value={vaccinated}/>
                <LabeledValue label="Vaccination Verified" value={vaccineVerified}/>
                <LabeledValue label="Is Attending" value={attending}/>
            </div>
        </div>
    )
}