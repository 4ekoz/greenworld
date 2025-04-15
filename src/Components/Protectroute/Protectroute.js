import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element }) {
    // تغيير userToken إلى token
    if (localStorage.getItem('token')) {
        return element;
    }
    return <Navigate to="/login" />;
} 