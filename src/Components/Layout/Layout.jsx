  import React from 'react';
  import styles from './Layout.module.css';
  import { Outlet } from 'react-router-dom';
  import Navbar from '../Navbar/Navbar'
  export default function Layout() {
    return (
      <div>
        <Navbar/>
        <div className={styles.container}>
            <Outlet/>
        </div>
      </div>
    );
  }