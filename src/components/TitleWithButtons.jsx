import React from 'react';

export function TitleWithButtons(props) {
    
    const { leftButtons, title, rightButtons } = props;

    const leftButtonLinks = leftButtons?.map((b, i) => 
        <button 
            className="button-link button-link-left" 
            onClick={b.onClick}
            key={`key-left-button-${i}`}
        >
            {b.label}
        </button>
    );

    const rightButtonLinks = rightButtons?.map((b, i) => 
        <button 
            className="button-link button-link-right" 
            onClick={b.onClick}
            key={`key-right-button-${i}`}
        >
            {b.label}
        </button>
    );

    return (
        <div className="title-with-buttons">
            {leftButtonLinks}
            <h2 className="center-text">{title}</h2>
            {rightButtonLinks}
        </div>
    )
}