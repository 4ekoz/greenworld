import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Plant.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import { Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

// دالة لتوليد ObjectId صالح
const generateValidObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const random = Math.random().toString(16).slice(2).padStart(16, '0');
  return timestamp + random;
};

const Plant = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: '',
    scientificName: '',
    category: '',
    origin: '',
    wateringFrequency: 'Weekly',
    soilType: '',
    temperatureRange: {
      max: '',
      min: ''
    },
    image: null,
    description: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          toast.error('Please login first');
          navigate('/login');
          return;
        }

        console.log('Using token from localStorage');

        const response = await axios.get('https://green-world-vert.vercel.app/plant/', {
          headers: {
            'token': token
          }
        });

        console.log('API Response:', response.data);

        if (response.data.success) {
          if (Array.isArray(response.data.plants)) {
            setPlants(response.data.plants);
            console.log('Plants loaded:', response.data.plants.length);
          } else {
            console.error('Plants data is not an array:', response.data.plants);
            setError('Invalid data format received');
          }
        } else {
          setError('Failed to fetch plants');
          console.error('API returned success: false');
        }
      } catch (err) {
        console.error('Error fetching plants:', err);
        if (err.response?.status === 401) {
          toast.error('Session expired. Please login again');
          navigate('/login');
        } else {
          setError(err.message || 'An error occurred while fetching plants');
          toast.error('Failed to load plants');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, [navigate]);

  // إضافة console.log لتتبع حالة المكون
  console.log('Current state:', { loading, error, plantsLength: plants?.length });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'maxTemp' || name === 'minTemp') {
      setNewPlant(prev => ({
        ...prev,
        temperatureRange: {
          ...prev.temperatureRange,
          [name === 'maxTemp' ? 'max' : 'min']: value
        }
      }));
    } else {
      setNewPlant(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewPlant(prev => ({
      ...prev,
      image: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      console.log('=== Submit Debug ===');
      console.log('Using token from localStorage');

      const formData = new FormData();
      formData.append('name', newPlant.name);
      formData.append('scientificName', newPlant.scientificName);
      formData.append('category', newPlant.category);
      formData.append('origin', newPlant.origin);
      formData.append('description', newPlant.description);
      formData.append('wateringFrequency', newPlant.wateringFrequency.toLowerCase()); // تحويل إلى حروف صغيرة
      formData.append('soilType', newPlant.soilType);
      formData.append('temperatureRange[min]', newPlant.temperatureRange.min);
      formData.append('temperatureRange[max]', newPlant.temperatureRange.max);

      if (newPlant.image) {
        formData.append('Image', newPlant.image);
      }

      const config = {
        headers: {
          'token': token
        }
      };

      console.log('=== Request Details ===');
      console.log('URL:', 'https://green-world-vert.vercel.app/plant/add-plant');
      console.log('Headers:', config.headers);
      console.log('Form Data:', Object.fromEntries(formData));

      const response = await axios.post(
        'https://green-world-vert.vercel.app/plant/add-plant',
        formData,
        config
      );

      console.log('Response:', response.data);

      toast.success('Plant added successfully!');
      setShowAddForm(false);
      setNewPlant({
        name: '',
        scientificName: '',
        category: '',
        origin: '',
        wateringFrequency: 'Weekly',
        soilType: '',
        temperatureRange: {
          max: '',
          min: ''
        },
        image: null,
        description: '',
      });
      fetchPlants();
    } catch (err) {
      console.error('=== Error Information ===');
      console.error('1. Full error object:', err);
      console.error('2. Error response data:', err.response?.data);
      console.error('3. Error status:', err.response?.status);
      console.error('4. Error headers:', err.response?.headers);
      console.error('=== End Error Information ===');
      toast.error(err.response?.data?.message || 'Failed to add plant');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="xl" color="#2c7a4b" />
        <p>Loading plants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p>Error: {error}</p>
      </div>
    );
  }

  // إضافة console.log قبل عرض الجدول
  console.log('Rendering table with plants:', plants);

  return (
    <motion.div 
      className={styles.plantContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className={styles.title}>Plants List</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.plantTable}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Scientific Name</th>
              <th>Category</th>
              <th>Origin</th>
              <th>Watering</th>
              <th>Soil Type</th>
              <th>Temperature</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {plants.length > 0 ? (
              plants.map((plant) => (
                <motion.tr
                  key={plant._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td>
                    {plant.Image?.secure_url ? (
                      <img 
                        src={plant.Image.secure_url} 
                        alt={plant.name}
                        className={styles.plantImage}
                      />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>{plant.name}</td>
                  <td>{plant.scientificName}</td>
                  <td>{plant.category}</td>
                  <td>{plant.origin}</td>
                  <td>{plant.wateringFrequency}</td>
                  <td>{plant.soilType}</td>
                  <td>
                    {plant.temperatureRange ? 
                      `${plant.temperatureRange.min}°C - ${plant.temperatureRange.max}°C` : 
                      'N/A'
                    }
                  </td>
                  <td className={styles.description}>{plant.description}</td>
                  <td className={styles.status}>
                    <FaCheckCircle className={styles.statusIconSuccess} />
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: 'center', padding: '20px' }}>
                  No plants found. Add some plants to see them here!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Plant;