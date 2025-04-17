import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from './Add-plant.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// إضافة الثوابت
export const wateringFrequencies = {
    DAILY: "daily",
    EVERY_OTHER_DAY: "every other day",
    WEEKLY: "weekly",
    BIWEEKLY: "biweekly",
    MONTHLY: "monthly"
};

export const plantCategories = {
    ORNAMENTAL: "ornamental",
    MEDICINAL_AROMATIC: "medicinal & aromatic",
    FRUIT: "fruit",
    SHADE: "shade",
    AIR_PURIFYING: "air-purifying"
};

export const soilTypes = {
    CLAY: "clay",
    SANDY: "sandy",
    LOAMY: "loamy",
    PEATY: "peaty",
    SILTY: "silty",
    CHALKY: "chalky"
};

const AddPlant = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showSuccessIcon, setShowSuccessIcon] = useState(false);
    const [showErrorIcon, setShowErrorIcon] = useState(false);

    // تهيئة النموذج بقيم فارغة
    const [formData, setFormData] = useState({
        name: '',
        scientificName: '',
        category: '',
        origin: '',
        description: '',
        wateringFrequency: '',
        soilType: '',
        temperatureRange: {
            min: '',
            max: ''
        },
        image: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'temperatureRange.min' || name === 'temperatureRange.max') {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleFileDrop = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            console.log('Selected image file:', file.name);
            setFormData(prev => ({
                ...prev,
                image: file
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setShowSuccessIcon(false);
        setShowErrorIcon(false);

        try {
            const submitData = new FormData();

            submitData.append('name', formData.name);
            submitData.append('scientificName', formData.scientificName);
            submitData.append('category', formData.category);
            submitData.append('origin', formData.origin);
            submitData.append('description', formData.description);

            if (formData.image) {
                submitData.append('Image', formData.image);
            }

            submitData.append('wateringFrequency', formData.wateringFrequency);
            submitData.append('soilType', formData.soilType);
            submitData.append('temperatureRange[min]', formData.temperatureRange.min);
            submitData.append('temperatureRange[max]', formData.temperatureRange.max);

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const config = {
                headers: {
                    'token': token,
                    'Content-Type': 'multipart/form-data'
                }
            };

            const response = await axios.post(
                'https://green-world-vert.vercel.app/plant/add-plant',
                submitData,
                config
            );

            if (response.data.success === true) {
                setShowSuccessIcon(true);
                toast.success('Plant created successfully!', {
                    icon: <FontAwesomeIcon icon={faCheck} className="text-success" />,
                    position: "top-center",
                    autoClose: 3000
                });

                // زيادة وقت التأخير قبل الانتقال
                setTimeout(() => {
                    navigate('/dashboard/plant');
                }, 3000);
            } else {
                throw new Error(response.data.message || 'Failed to add plant');
            }
        } catch (error) {
            setShowErrorIcon(true);
            console.error('Error Details:', error);

            if (error.response?.data?.message === 'plant already exist') {
                toast.error('Plant already exists!', {
                    icon: <FontAwesomeIcon icon={faTimes} className="text-danger" />
                });
            } else {
                toast.error(`Error adding plant: ${error.message}`, {
                    icon: <FontAwesomeIcon icon={faTimes} className="text-danger" />
                });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.updateContent}>
            <h1>Add Your Plant</h1>
            <form onSubmit={handleSubmit} className={styles.formSection}>
                {showSuccessIcon && (
                    <motion.div
                        className={styles.successIconContainer}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20
                        }}
                    >
                        <motion.div
                            className={styles.successIcon}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                            <span className={styles.successText}>Plant created successfully!</span>
                        </motion.div>
                    </motion.div>
                )}
                {showErrorIcon && (
                    <div className={styles.iconContainer}>
                        <FontAwesomeIcon icon={faTimes} className={styles.errorIcon} />
                    </div>
                )}
                <div className={styles.inputRow}>
                    <div className={styles.formGroup}>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Plant Name"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Scientific Name</label>
                        <input
                            type="text"
                            name="scientificName"
                            placeholder="Enter Scientific Name"
                            value={formData.scientificName}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                <div className={styles.inputRow}>
                    <div className={styles.formGroup}>
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select category</option>
                            {Object.values(plantCategories).map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Origin</label>
                        <input
                            type="text"
                            name="origin"
                            value={formData.origin}
                            onChange={handleInputChange}
                            placeholder="Enter origin"
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter description"
                        required
                        rows="3"
                    />
                </div>

                <div className={styles.inputRow}>
                    <div className={styles.formGroup}>
                        <label>Watering Frequency</label>
                        <select
                            name="wateringFrequency"
                            value={formData.wateringFrequency}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select frequency</option>
                            {Object.values(wateringFrequencies).map((frequency) => (
                                <option key={frequency} value={frequency}>
                                    {frequency}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formGroup}>
                        <label>Soil Type</label>
                        <select
                            name="soilType"
                            value={formData.soilType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Select soil type</option>
                            {Object.values(soilTypes).map((soilType) => (
                                <option key={soilType} value={soilType}>
                                    {soilType}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.inputRow}>
                    <div className={styles.formGroup}>
                        <label>Temperature Range (Max °C)</label>
                        <input
                            type="number"
                            name="temperatureRange.max"
                            value={formData.temperatureRange.max}
                            onChange={handleInputChange}
                            placeholder="Enter maximum temperature"
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Temperature Range (Min °C)</label>
                        <input
                            type="number"
                            name="temperatureRange.min"
                            value={formData.temperatureRange.min}
                            onChange={handleInputChange}
                            placeholder="Enter minimum temperature"
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Upload Image</label>
                    <div className={styles.uploadArea}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileDrop}
                            style={{ display: 'none' }}
                            id="imageUpload"
                        />
                        <label htmlFor="imageUpload" className={styles.uploadButton}>
                            {formData.image ? formData.image.name : 'Choose images or drag & drop it here.'}
                        </label>
                    </div>
                </div>

                <motion.button
                    type="submit"
                    className={styles.submitButton}
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {loading ? 'Adding Plant...' : 'Add Plant'}
                </motion.button>
            </form>
        </div>
    );
};

export default AddPlant; 