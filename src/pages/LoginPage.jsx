import React, { useState } from 'react';

import { signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';

import credentials from '../../login.json';

export function LoginPage(props) {
    const { handleSuccessfulLogin } = props;

    const [email, setEmail] = useState(credentials.email);
    const [password, setPassword] = useState(credentials.password);
    const [error, setError] = useState('');

    const attemptLogin = async (e) => {
        e.preventDefault();
        
        try {
            const loginResponse = await signInWithEmailAndPassword(auth, email, password);
            setError('');
            handleSuccessfulLogin(loginResponse.user);
        }
        catch (error) {
            console.log(error.code);
            
            const errors = {
                'auth/user-not-found': 'Unknown Email',
                'auth/wrong-password': 'Wrong Password',
            }

            let errorMessage = errors[error.code] ? errors[error.code] : 'Oops, something is broked :/';

            setError(errorMessage);
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