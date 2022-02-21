import React from 'react';

export function LoginButton(props) {
    const { loggedIn, onClickLogin, onClickLogout } = props;

    const buttonText = loggedIn ? 'Logout' : 'Login';
    const buttonOnClick = loggedIn ? onClickLogout : onClickLogin;

    return (
        <button className="button-link" onClick={buttonOnClick}>{buttonText}</button>
    )
}