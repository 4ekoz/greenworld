import React from 'react';
import styles from './SoilWater.module.css';

export default function SoilWater() {
    return (
        <div className={styles.soilWaterContainer}>
            <h1>Soil & Water Management</h1>
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Soil Moisture</h3>
                    <div className={styles.value}>75%</div>
                </div>
                <div className={styles.statCard}>
                    <h3>Water Level</h3>
                    <div className={styles.value}>85%</div>
                </div>
                <div className={styles.statCard}>
                    <h3>pH Level</h3>
                    <div className={styles.value}>6.5</div>
                </div>
                <div className={styles.statCard}>
                    <h3>Temperature</h3>
                    <div className={styles.value}>24°C</div>
                </div>
            </div>
        </div>
    );
} 