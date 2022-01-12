import React from 'react';
import '../app.scss';



export function Header(props) {
    const { handleClickChangePage } = props;
    
    return (
        <div className="container">
            <header>
                <button 
                    onClick={() => handleClickChangePage('HOME')}
                    className="button-wrapper"    
                >
                    <h1 className="center-text">Zoe +Cody</h1>
                </button>
            </header>
        </div>
    )
}