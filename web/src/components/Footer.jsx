import React from 'react';
import '../app.scss';

import floralFooter from '../static/images/floralFooter.jpg';

export function Footer(props) {
    const { handleClickChangePage } = props;

    return (
        <footer>
            <p className="attribution">cody jones - civil software</p>
            <div onClick={() => handleClickChangePage('LOGIN')}>host login</div>
            <img src={floralFooter} className="floral-footer"></img>
        </footer>
    )
}