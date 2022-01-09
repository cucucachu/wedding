import React, { useState } from 'react';
import './firebase';

import './app.scss';

import { Navbar } from './components/Navbar';
import { Header } from './components/Header';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { GuestListPage } from './pages/GuestListPage';
import { ViewGuestPage } from './pages/ViewGuestPage';
import { EditGuestPage } from './pages/EditGuestPage';

const pages = ['HOME', 'LOGIN'];

const App = () => {

    const [page, setPage] = useState('HOME');
    const [user, setUser] = useState(null);
    const [pageProps, setPageProps] = useState(null);

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

    const handleClickViewGuest = guest => {
        setPageProps(guest);
        setPage('VIEWGUEST');
    }

    const handleClickEditGuest = guest => {
        setPageProps(guest);
        setPage('EDITGUEST');
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
            currentPage = <GuestListPage
                handleClickViewGuest={handleClickViewGuest}
            />;
            break;
        case 'VIEWGUEST':
            currentPage = <ViewGuestPage 
                guest={pageProps}
                onClickGuestList={() => setPage('GUESTLIST')}
                onClickEditGuest={handleClickEditGuest}
            />
            break;
        case 'EDITGUEST':
            currentPage = <EditGuestPage 
                guest={pageProps}
                onClickGuestList={() => setPage('GUESTLIST')}
                onClickEditGuest={handleClickEditGuest}
            />
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
            <hr/>
            {currentPage}
        </div>
    )
}

export default App;