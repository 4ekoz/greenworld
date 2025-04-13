import React from 'react';
import styles from './Settings.module.css';

const Settings = () => {
    return (
        <div className={styles.settingsContainer}>
            <h1>Settings</h1>
            <div className={styles.settingsContent}>
                <section className={styles.settingSection}>
                    <h2>Profile Settings</h2>
                    <div className={styles.settingItem}>
                        <label>Name</label>
                        <input type="text" placeholder="Your Name" />
                    </div>
                    <div className={styles.settingItem}>
                        <label>Email</label>
                        <input type="email" placeholder="Your Email" />
                    </div>
                </section>

                <section className={styles.settingSection}>
                    <h2>Notification Settings</h2>
                    <div className={styles.settingItem}>
                        <label>Email Notifications</label>
                        <input type="checkbox" />
                    </div>
                    <div className={styles.settingItem}>
                        <label>Push Notifications</label>
                        <input type="checkbox" />
                    </div>
                </section>

                <section className={styles.settingSection}>
                    <h2>App Settings</h2>
                    <div className={styles.settingItem}>
                        <label>Language</label>
                        <select>
                            <option value="en">English</option>
                            <option value="ar">العربية</option>
                        </select>
                    </div>
                    <div className={styles.settingItem}>
                        <label>Theme</label>
                        <select>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings; 