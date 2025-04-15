import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Dashboard';
import Update from './Components/Update/Update';
import Login from './Components/Login/Login';
import styles from './Components/Logout/Logout.module.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <BrowserRouter>
            {!isLoggedIn && (
                <div className={styles.modalOverlay}>
                    <Login onClose={handleLoginSuccess} isModal={true} />
                </div>
            )}
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/update" element={<Update />} />
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App; 