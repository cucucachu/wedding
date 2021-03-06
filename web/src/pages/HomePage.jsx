import React from 'react';

import tahoePic from '../static/images/TahoePic.jpeg';

export function HomePage(props) {
    const { handleClickChangePage } = props;

    return (
        <div className="container">
            <img className="couple-pic" src={tahoePic}/>
            <button className="mobile-only" onClick={() => handleClickChangePage('GUEST_CODE')}>RSVP</button>
        </div>
    )
}