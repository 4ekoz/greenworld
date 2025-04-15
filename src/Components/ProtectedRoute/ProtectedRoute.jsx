import React from 'react';
import Login from '../Login/Login';

const ProtectedRoute = ({ children }) => {
    // Check if user is logged in by looking for the token in localStorage
    const token = localStorage.getItem('userToken');
    const [showLoginModal, setShowLoginModal] = React.useState(!token);

    if (!token || showLoginModal) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }}>
                <Login isModal={true} onClose={() => setShowLoginModal(false)} />
            </div>
        );
    }

    // If there is a token, render the protected component
    return children;
};

export default ProtectedRoute; 