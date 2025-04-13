import React, { useState, useRef } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import styles from './Dashboard.module.css';
import dashboardHome from './dashboardhome.png';
import dashboardWater from './dahboardwater.png';
import dashboardWeather from './dashboardwather.png';
import dashboardHelp from './dashboardhelp.png';
import settingsIcon from './Settings (1).png';
import exportstyle from './exportstyle.png';
import Logout from '../Logout/Logout';

export default function Dashboard() {
  const location = useLocation();
  const [dragActive, setDragActive] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    if (!file.type.match('image.*')) {
      alert('Please upload an image file only');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      alert('File size should not exceed 20MB');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const onButtonClick = () => {
    inputRef.current.click();
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

          <div className={styles.formSection}>
            <div>
              <div
                className={styles.uploadSection}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={inputRef}
                  type="file"
                  className={styles.inputFile}
                  accept="image/*"
                  onChange={handleChange}
                  style={{ display: 'none' }}
                />

                <button className={styles.uploadButton} onClick={onButtonClick}>
                  <img src={exportstyle} alt="Upload" className={styles.uploadIcon} />
                </button>
              </div>

              <div className={styles.inputRow}>
                <div className={styles.formGroup}>
                  <label>Category</label>
                  <input type="text" placeholder="Enter your category" />
                </div>

                <div className={styles.formGroup}>
                  <label>Origin</label>
                  <input type="text" placeholder="Enter your origin" />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Description</label>
                <input type="text" placeholder="Enter your description" />
              </div>

              <div className={styles.formGroup}>
                <label>Watering Frequency</label>
                <input type="text" placeholder="Enter your water frequency" />
              </div>
            </div>
          </div>
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
            to="/soil-water"
            className={`${styles.menuItem} ${isActive('/soil-water') ? styles.active : ''}`}
          >
            <img src={dashboardWater} alt="Soil & Water" className={styles.icon} />
            <span>Soil & Water</span>
          </Link>

          <Link
            to="/weather"
            className={`${styles.menuItem} ${isActive('/weather') ? styles.active : ''}`}
          >
            <img src={dashboardWeather} alt="Weather" className={styles.icon} />
            <span>Weather</span>
          </Link>

          <Link
            to="/help-support"
            className={`${styles.menuItem} ${isActive('/help-support') ? styles.active : ''}`}
          >
            <img src={dashboardHelp} alt="Help & Support" className={styles.icon} />
            <span>Help & Support</span>
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
        <div className={styles.header}>
          <div className={styles.notifications}>
            <span className={styles.notificationIcon}>🔔</span>
            <span className={styles.notificationCount}>12</span>
          </div>
          <div className={styles.userProfile}>
            <span>Ali Ahmed</span>
            <div className={styles.avatar}>👤</div>
          </div>
        </div>

        <div className={styles.content}>
          {renderDashboardContent()}
        </div>
      </div>
    </div>
  );
} 