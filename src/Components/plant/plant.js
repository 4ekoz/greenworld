import React from 'react';
import styles from './plant.module.css';

function PlantPage() {
    return (
        <div className={styles.plantContainer}>
            <h1>Plants List</h1>
            <div className={styles.plantsGrid}>
                {/* سيتم إضافة محتوى القائمة هنا */}
            </div>
        </div>
    );
}

export default PlantPage; 