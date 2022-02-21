import React from 'react';
import '../app.scss';

import floralHeader from '../static/images/floralHeader.jpg';

export function Header(props) {
    const { handleClickChangePage } = props;

    const weddingDate = new Date('2022-08-13');
    const now = new Date();
    const daysToGo = Math.ceil((weddingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return (
        <header>
                <img src={floralHeader} className="floral-header"></img>
                <h1 className="center-text">Zoe &amp; Cody</h1>
                <h3>August 13, 2022 - Novato, California</h3>
                <h3>{daysToGo} day{daysToGo > 1 ? 's' : ''} to go!</h3>
        </header>
    )
}