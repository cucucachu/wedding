import React, { useState } from 'react';

// import credentials from '../../login.json';
import { loginAsGuestOrHost } from '../firebase';

export function LoginPage(props) {
    const { handleSuccessfulLoginHost, handleSuccessfulLoginGuest } = props;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const attemptLogin = async (e) => {
        e.preventDefault();
        
        try {
            const { userCredential, host } = await loginAsGuestOrHost(email, password);
            setError('');
            if (host)
                handleSuccessfulLoginHost(userCredential.user);
            else
                handleSuccessfulLoginGuest(userCredential.user)
        }
        catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="form-container">
            { error && 
                <p className='error-text'>{error}</p>
            }
            <form onSubmit={e => attemptLogin(e)}>
                <div className="labeled-input">
                    <label>email</label>
                    <input type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="labeled-input">
                    <label>password</label>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <input type='submit' value='Login'/>
                </div>
            </form>
        </div>
    )
}