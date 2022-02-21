import React from 'react';

import stoneTreeImage from '../static/images/StoneTree.jpg';

export function EventInformationPage() {
    return (
        <div className="container center-text">
            <h3>Our Venue</h3>
            <h2>Stone Tree Estate</h2>
            <img src={stoneTreeImage} className="stone-tree-image"/>
            <div className="info-group">
                <label>Address</label>
                <p>9 Stone Tree Lane</p>
                <p>Novato, CA 94945</p>
            </div>
            <div className="info-group">
                <label>Parking:</label>
                <p>On-Site</p>
            </div>
            <h3>Virtual Tour Video</h3>
            <iframe  
                className="tour-video"
                width="560" 
                height="315" 
                src="https://www.youtube.com/embed/fP3FoGHCB3c" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
            ></iframe>
            

        </div>
    )
}