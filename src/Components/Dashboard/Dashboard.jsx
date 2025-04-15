import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import styles from './Dashboard.module.css';
import dashboardHome from './dashboardhome.png';
import updateIcon from './update.png';
import settingsIcon from './Settings (1).png';
import Logout from '../Logout/Logout';
import plant from "../Dashboard/plant.png"; // This is the plant icon you provided

export default function Dashboard() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    return location.pathname === path;
  };

  const renderDashboardContent = () => {
    if (location.pathname === '/dashboard' || location.pathname === '/') {
      return (
        <div className={styles.dashboardContent}>
          <h1>Welcome!</h1>
        </div>
      );
    }
    return <Outlet />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarContent}>
          <Link
            to="/dashboard"
            className={`${styles.menuItem} ${isActive('/dashboard') ? styles.active : ''}`}
          >
            <img src={dashboardHome} alt="Dashboard" className={styles.icon} />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/update"
            className={`${styles.menuItem} ${isActive('/update') ? styles.active : ''}`}
          >
            <img src={updateIcon} alt="Update" className={styles.icon} />
            <span>Update</span>
          </Link>

          {/* Replace "Weather" with "Plant" */}
          <Link
            to="/plant"
            className={`${styles.menuItem} ${isActive('/plant') ? styles.active : ''}`}
          >
            <img src={plant} alt="Plant" className={styles.icon} /> {/* Use the plant icon */}
            <span>Plant</span>
          </Link>

          <div className={styles.bottomMenu}>
            <Link
              to="/settings"
              className={`${styles.menuItem} ${isActive('/settings') ? styles.active : ''}`}
            >
              <img src={settingsIcon} alt="Settings" className={styles.icon} />
              <span>Settings</span>
            </Link>

            <Logout />
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.content}>
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  );
}