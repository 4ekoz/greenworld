import React from 'react';
import styles from './Layout.module.css';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const isAuthRoute = [
    '/login',
    '/register',
    '/forgot-password',
    '/resetpassword',
    '/verify-email',
    '/verifycode'
  ].includes(location.pathname);

  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
}