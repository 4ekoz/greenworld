import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';
import dashboardHome from './dashboardhome.png';
import dashboardWater from './dahboardwater.png';
import dashboardWeather from './dashboardwather.png';
import dashboardHelp from './dashboardhelp.png';
import settingsIcon from './Settings (1).png';
import logoutIcon from './Logout.png';

export default function DashboardLayout({ children }) {
    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarContent}>
                    <Link to="/dashboard" className={styles.menuItem}>
                        <img src={dashboardHome} alt="Dashboard" className={styles.icon} />
                        <span>Dashboard</span>
                    </Link>

                    <Link to="/soil-water" className={styles.menuItem}>
                        <img src={dashboardWater} alt="Soil & Water" className={styles.icon} />
                        <span>Soil & Water</span>
                    </Link>

                    <Link to="/weather" className={styles.menuItem}>
                        <img src={dashboardWeather} alt="Weather" className={styles.icon} />
                        <span>Weather</span>
                    </Link>

                    <Link to="/help-support" className={styles.menuItem}>
                        <img src={dashboardHelp} alt="Help & Support" className={styles.icon} />
                        <span>Help & Support</span>
                    </Link>

                    <div className={styles.bottomMenu}>
                        <Link to="/settings" className={styles.menuItem}>
                            <img src={settingsIcon} alt="Settings" className={styles.icon} />
                            <span>Setting</span>
                        </Link>

                        <Link to="/logout" className={styles.menuItem}>
                            <img src={logoutIcon} alt="Logout" className={styles.icon} />
                            <span>Logout</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {children}
            </div>
        </div>
    );
} 