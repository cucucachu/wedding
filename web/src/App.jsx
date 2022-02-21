import React, { useState } from 'react';
import './firebase';

import './app.scss';

import { logout } from './firebase';

import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { HomePage } from './pages/HomePage';
import { EventInformationPage } from './pages/EventInformationPage';
import { ProgramPage } from './pages/ProgramPage';
import { CovidPolicyPage } from './pages/CovidPolicyPage';
import { AccomodationsPage } from './pages/AccomodationsPage';
import { GiftsPage } from './pages/GiftsPage';

import { LoginPage } from './pages/LoginPage';
import { GuestListPage } from './pages/GuestListPage';
import { ViewGuestPage } from './pages/ViewGuestPage';
import { EditGuestPage } from './pages/EditGuestPage';
import { AddListPage } from './pages/AddListPage';
import { AddGuestPage } from './pages/AddGuestPage';
import { EditListPage } from './pages/EditListPage';
import { GuestEmailPage } from './pages/GuestEmailPage';
import { GuestCodePage } from './pages/GuestCodePage';
import { GuestHomePage } from './pages/GuestHomePage';


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

    const handleClickLogout = async () => {
        await logout();
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
        case 'EVENT_INFORMATION':
            currentPage = <EventInformationPage />;
            break;
        case 'PROGRAM':
            currentPage = <ProgramPage />;
            break;
        case 'COVID_POLICY':
            currentPage = <CovidPolicyPage />;
            break;
        case 'ACCOMODATIONS':
            currentPage = <AccomodationsPage />;
            break;
        case 'GIFTS':
            currentPage = <GiftsPage />;
            break;





        case 'LOGIN':
            currentPage = <LoginPage
                handleSuccessfulLoginHost={handleSuccessfulLoginHost}
                handleSuccessfulLoginGuest={handleSuccessfulLoginGuest}
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
        case 'EDIT_LIST':
            currentPage = <EditListPage 
                currentList={pageProps.list}
                currentGuests={pageProps.currentGuests}
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
        case 'GUEST_EMAIL':
            currentPage = <GuestEmailPage
                handleClickChangePage={handleClickChangePage}
            />
            break;
        case 'GUEST_CODE':
            currentPage = <GuestCodePage
                handleClickChangePage={handleClickChangePage}
                email={pageProps}
                handleSuccessfulLoginGuest={handleSuccessfulLoginGuest}
            />
            break;
        case 'GUEST_HOME':
            currentPage = <GuestHomePage
                handleClickChangePage={handleClickChangePage}
                user={user}
            />
            break;
        default:
            currentPage = <HomePage/>;
    }

    return (
        <div className="page-container">
            <Header handleClickChangePage={handleClickChangePage}/>
            <Navbar
                handleClickChangePage={handleClickChangePage}
            />
            <div className="page-content">
                {currentPage}
            </div>
            <Footer 
                handleClickChangePage={handleClickChangePage}
            />
        </div>
    )
}

export default App;