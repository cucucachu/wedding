import React from 'react';

export function Navbar(props) {
    const { handleClickChangePage } = props;

    return (
        <div className="nav">
            <button className="nav-item" onClick={() => handleClickChangePage('HOME')}>Home</button>
            <button className="nav-item" onClick={() => handleClickChangePage('EVENT_INFORMATION')}>Event Information</button>
            <button className="nav-item" onClick={() => handleClickChangePage('PROGRAM')}>Program</button>
            <button className="nav-item" onClick={() => handleClickChangePage('COVID_POLICY')}>Covid Policy</button>
            <button className="nav-item" onClick={() => handleClickChangePage('ACCOMODATIONS')}>Accomodations</button>
            <button className="nav-item" onClick={() => handleClickChangePage('GIFTS')}>Gifts</button>
            <button className="nav-item" onClick={() => handleClickChangePage('GUEST_CODE')}>RSVP</button>
        </div>
    )
}