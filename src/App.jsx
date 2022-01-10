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
import { RSVPPage } from './pages/RSVPPage';
import { RSVPNoPage } from './pages/RSVPNoPage';
import { RSVPNoCompletePage } from './pages/RSVPNoCompletePage';
import { CreateGuestAccountPage } from './pages/CreateGuestAccountPage';

const pages = ['HOME', 'LOGIN'];

const App = () => {

    const [page, setPage] = useState('HOME');
    const [user, setUser] = useState(null);
    const [pageProps, setPageProps] = useState({});

    const handleClickChangePage = (page, passedState) => {
        setPageProps(passedState ? passedState : {});
        setPage(page);
    }

    const handleSuccessfulLoginHost = user => {
        setUser(user);
        setPage('GUEST_LIST');
    }

    const handleSuccessfulLoginGuest = user => {
        setUser(user);
        setPage('GUEST_HOME');
    }

    const handleClickLogout = () => {
        setUser(null);
        setPage('HOME');
    }

    let currentPage;

    switch (page) {
        case 'HOME':
            currentPage = <HomePage
                handleClickChangePage={handleClickChangePage}
            />;
            break;
        case 'LOGIN':
            currentPage = <LoginPage
                handleSuccessfulLoginHost={handleSuccessfulLoginHost}
            />;
            break;
        case 'GUEST_LIST':
            currentPage = <GuestListPage
                handleClickChangePage={handleClickChangePage}
            />;
            break;
        case 'VIEW_GUEST':
            currentPage = <ViewGuestPage 
                guest={pageProps}
                handleClickChangePage={handleClickChangePage}
            />
            break;
        case 'EDIT_GUEST':
            currentPage = <EditGuestPage 
                guest={pageProps}
                handleClickChangePage={handleClickChangePage}
            />
            break;
        case 'ADD_LIST':
            currentPage = <AddListPage 
                lists={pageProps}
                handleClickChangePage={handleClickChangePage}
            />
            break;
        case 'ADD_GUEST':
            currentPage = <AddGuestPage 
                list={pageProps}
                handleClickChangePage={handleClickChangePage}
            />
            break;
        case 'RSVP':
            currentPage = <RSVPPage
                handleClickChangePage={handleClickChangePage}
            />
            break;
        case 'RSVP_NO':
            currentPage = <RSVPNoPage
                guest={pageProps}
                handleClickChangePage={handleClickChangePage}
            />
            break;
        case 'RSVP_NO_COMPLETE':
            currentPage = <RSVPNoCompletePage/>
            break;
        case 'CREATE_GUEST_ACCOUNT':
            currentPage = <CreateGuestAccountPage
                guest={pageProps}
                handleClickChangePage={handleClickChangePage}
                handleSuccessfulLoginGuest={handleSuccessfulLoginGuest}
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
            <Header handleClickChangePage={handleClickChangePage}/>
            <hr/>
            {currentPage}
        </div>
    )
}

export default App;