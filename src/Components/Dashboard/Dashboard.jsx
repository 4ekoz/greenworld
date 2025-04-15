import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import styles from './Dashboard.module.css';
import dashboardHome from './dashboardhome.png';
import settingsIcon from './Settings (1).png';
import Logout from '../Logout/Logout';
import plant from "../Dashboard/plant.png";
import addPlantIcon from "../Add-plant/Addplanticon.png";
import { motion } from 'framer-motion';

export default function Dashboard() {
  const location = useLocation();

  const menuItemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

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
      <motion.div
        className={styles.sidebar}
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.sidebarContent}>
          <motion.div
            custom={0}
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/dashboard"
              className={`${styles.menuItem} ${isActive('/dashboard') ? styles.active : ''}`}
            >
              <img src={dashboardHome} alt="Dashboard" className={styles.icon} />
              <span>Dashboard</span>
            </Link>
          </motion.div>

          <motion.div
            custom={1}
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/dashboard/plant"
              className={`${styles.menuItem} ${isActive('/dashboard/plant') ? styles.active : ''}`}
            >
              <img src={plant} alt="Plant" className={styles.icon} />
              <span>Plant</span>
            </Link>
          </motion.div>

          <motion.div
            custom={2}
            variants={menuItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/dashboard/add-plant"
              className={`${styles.menuItem} ${isActive('/dashboard/add-plant') ? styles.active : ''}`}
            >
              <img src={addPlantIcon} alt="Add Plant" className={styles.icon} />
              <span>Add plant</span>
            </Link>
          </motion.div>

          <div className={styles.bottomMenu}>
            <motion.div
              custom={3}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
            >
              <Link
                to="/dashboard/settings"
                className={`${styles.menuItem} ${isActive('/dashboard/settings') ? styles.active : ''}`}
              >
                <img src={settingsIcon} alt="Settings" className={styles.icon} />
                <span>Settings</span>
              </Link>
            </motion.div>

            <motion.div
              custom={4}
              variants={menuItemVariants}
              initial="hidden"
              animate="visible"
            >
              <Logout />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <div className={styles.mainContent}>
        <div className={styles.content}>
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  );
}