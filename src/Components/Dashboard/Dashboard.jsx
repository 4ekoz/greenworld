import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import styles from './Dashboard.module.css';
import dashboardHome from './dashboardhome.png';
import settingsIcon from './Settings (1).png';
import Logout from '../Logout/Logout';
import plant from "../Dashboard/plant.png";
import addPlantIcon from "../Add-plant/Addplanticon.png";



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
            to="/dashboard/plant"
            className={`${styles.menuItem} ${isActive('/dashboard/plant') ? styles.active : ''}`}
          >
            <img src={plant} alt="Plant" className={styles.icon} />
            <span>Plant</span>
          </Link>

          <Link
            to="/dashboard/add-plant"
            className={`${styles.menuItem} ${isActive('/dashboard/add-plant') ? styles.active : ''}`}
          >
            <img src={addPlantIcon} alt="Add Plant" className={styles.icon} />
            <span>Add plant</span>
          </Link>

          <div className={styles.bottomMenu}>
            <Link
              to="/dashboard/settings"
              className={`${styles.menuItem} ${isActive('/dashboard/settings') ? styles.active : ''}`}
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