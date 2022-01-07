import React, { useState } from 'react';
import './app.scss';

import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';

const pages = ['HOME', 'LOGIN'];

const App = () => {

    const [page, setPage] = useState('HOME');
    const [user, setUser] = useState(null);

    const handleClickLoginButton = () => {
        setPage('LOGIN');
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