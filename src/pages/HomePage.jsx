import React from 'react';


import '../app.scss';

export function HomePage(props) {
    const { handleClickChangePage } = props;

    return (
        <div className="container center-text">
            <h2>It's a Wedding!</h2>
            <p>August 13th, 2022</p>
            <p>Ceremony @ 5pm</p>
            <p>Reception to Follow</p>
            <p>Stone Tree Golf Club</p>
            <p>9 StoneTree Lane</p>
            <p>Novato, CA 94945</p>
            <button onClick={e => handleClickChangePage('GUEST_EMAIL')}>RSVP</button>
        </div>
    )
}