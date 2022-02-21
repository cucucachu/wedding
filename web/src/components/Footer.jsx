import React from 'react';
import '../app.scss';

import floralFooter from '../static/images/floralFooter.jpg';

export function Footer() {
    
    return (
        <footer>
            <p className="attribution">cody jones - civil software</p>
            <img src={floralFooter} className="floral-footer"></img>
        </footer>
    )
}