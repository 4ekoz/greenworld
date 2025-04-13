import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from '../Login/Login';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const [showLoginModal, setShowLoginModal] = React.useState(!token);

    if (!token) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: '#1a3a18',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Login isModal={true} onClose={() => setShowLoginModal(false)} />
            </div>
        );
    }

    return children;
};

export default ProtectedRoute; 