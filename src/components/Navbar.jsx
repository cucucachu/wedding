import React from 'react';

export function Navbar(props) {
    const { loggedIn, onClickLogin, onClickLogout } = props;

    const buttonText = loggedIn ? 'Logout' : 'Login';
    const buttonOnClick = loggedIn ? onClickLogout : onClickLogin;

    return (
        <div className="nav">
            <button className="button-link" onClick={buttonOnClick}>{buttonText}</button>
        </div>
    )
}