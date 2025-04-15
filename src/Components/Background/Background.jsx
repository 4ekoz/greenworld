import React from 'react';
import styles from './Background.module.css';
import earthImage from '../Login/earth.jpg';

const AuthBackground = ({ children }) => {
    return (
        <div className={styles.authWrapper}>
            <div
                className={styles.authBackground}
                style={{ backgroundImage: `url(${earthImage})` }}
            />
            <div className={styles.authContainer}>
                {children}
            </div>
        </div>
    );
};

export default AuthBackground; 