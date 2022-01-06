import React, { useState } from 'react';
import './app.scss';

import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';

const pages = ['HOME', 'BACKGROUND', 'CONTACT', 'PURPOSE'];

const App = () => {

    const [page, setPage] = useState('HOME');

    let currentPage;

    switch (page) {
        case 'HOME':
            currentPage = <HomePage/>;
            break;
    }

    return (
        // <h1>Hello</h1>
        <div className="page-container">
            <Navbar />
            <Header />
            {currentPage}
        </div>
    )
}

export default App;