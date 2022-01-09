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
import { AddListPage } from './pages/AddListPage';
import { AddGuestPage } from './pages/AddGuestPage';

const pages = ['HOME', 'LOGIN'];

const App = () => {

    const [page, setPage] = useState('HOME');
    const [user, setUser] = useState(null);
    const [pageProps, setPageProps] = useState({});

    const handleClickChangePage = (page, passedState) => {
        setPageProps(passedState ? passedState : {});
        setPage(page);
    }

    const handleSuccessfulLogin = user => {
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
            currentPage = <GuestListPage
                handleClickChangePage={handleClickChangePage}
            />;
            break;
        case 'VIEWGUEST':
            currentPage = <ViewGuestPage 
                guest={pageProps}
                handleClickChangePage={handleClickChangePage}
            />
            break;
        case 'EDITGUEST':
            currentPage = <EditGuestPage 
                guest={pageProps}
                handleClickChangePage={handleClickChangePage}
            />
            break;
        case 'ADDLIST':
            currentPage = <AddListPage 
                lists={pageProps}
                handleClickChangePage={handleClickChangePage}
            />
            break;
        case 'ADDGUEST':
            currentPage = <AddGuestPage 
                list={pageProps}
                handleClickChangePage={handleClickChangePage}
            />
            break;
        default:
            currentPage = <HomePage/>;
    }

    return (
        <div className="page-container">
            <Navbar
                loggedIn={user !== null}
                onClickLogin={() => setPage('LOGIN')}
                onClickLogout={handleClickLogout}
            />
            <Header />
            <hr/>
            {currentPage}
        </div>
    )
}

export default App;