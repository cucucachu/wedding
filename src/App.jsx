import React, { useState } from 'react';
import './firebase';

import './app.scss';

import { Navbar } from './components/Navbar';
import { Header } from './components/Header';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { GuestListPage } from './pages/GuestListPage';

const pages = ['HOME', 'LOGIN'];

const App = () => {

    const [page, setPage] = useState('HOME');
    const [user, setUser] = useState(null);

    const handleClickLoginButton = () => {
        setPage('LOGIN');
    }

    const handleSuccessfulLogin = (user) => {
        setUser(user);
        setPage('GUESTLIST');
    }

    const handleClickLogout = () => {
        setUser(null);
        setPage('HOME');
    }

    let currentPage;

    switch (page) {
        case 'HOME':
            currentPage = <HomePage/>;
            break;
        case 'LOGIN':
            currentPage = <LoginPage
                handleSuccessfulLogin={handleSuccessfulLogin}
            />;
            break;
        case 'GUESTLIST':
            currentPage = <GuestListPage/>;
            break;
        default:
            currentPage = <HomePage/>;
    }

    return (
        // <h1>Hello</h1>
        <div className="page-container">
            <Navbar
                loggedIn={user !== null}
                onClickLogin={handleClickLoginButton}
                onClickLogout={handleClickLogout}
            />
            <Header />
            {currentPage}
        </div>
    )
}

export default App;