import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// دالة لتوليد ObjectId صالح
const generateValidObjectId = () => {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, '0');
  const random = Math.random().toString(16).slice(2).padStart(16, '0');
  return timestamp + random;
};

const Plant = () => {
  const [plants, setPlants] = useState([]);
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
  const [loading, setLoading] = useState(false);

  // استدعاء الـ API لجلب النباتات
  useEffect(() => {
    fetchPlants();
  }, []);

    const fetchPlants = async () => {
      try {
        const token = localStorage.getItem('token');
      console.log('=== Token Validation ===');
      console.log('Current token in localStorage:', token);
      console.log('Token length:', token?.length);
      console.log('======================');

        if (!token) {
        setError('يرجى تسجيل الدخول أولاً');
          return;
        }

      // تجهيز الكونفيج بنفس شكل التوكن اللي في صورة الـ login
      const config = {
          headers: {
          'token': `${token}`  // نتأكد إن التوكن بيتبعت كاسترينج
        }
      };

      console.log('Making request with config:', config);

      const res = await axios.get('https://green-world-vert.vercel.app/plant/get-plants', config);
      console.log('Response:', res.data);

      if (res.data && Array.isArray(res.data)) {
        setPlants(res.data);
        setError(null);
      } else {
        setPlants([]);
        setError('لم يتم العثور على نباتات');
      }
      } catch (err) {
      console.error('=== Fetch Plants Error ===');
      console.error('Error details:', {
        status: err.response?.status,
        message: err.response?.data?.message,
        token: localStorage.getItem('token')
      });
      setError(err.response?.data?.message || 'حدث خطأ أثناء جلب النباتات');
      setPlants([]);
    }
  };

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
      // استخدام التوكن من مثال الـ cURL للاختبار
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1obXdkYmhqdDMwN0BnbWFpbC5jb20iLCJfaWQiOiI2N2JhNWJkMmJhOWQ5MDI3ZGY2NWIyYzEiLCJpYXQiOjE3NDAyNjY0ODZ9.1JbZhGqJ3vDTQ3X7p3O_JHJDV9vYvL54XlmrCGAuI-s';

      console.log('=== Submit Debug ===');
      console.log('Using test token:', token);

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

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
      <h1>Plant List</h1>
        <button
          className="btn btn-success"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Cancel' : 'Add New Plant'}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showAddForm && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="name"
                value={newPlant.name}
                onChange={handleInputChange}
                placeholder="Plant Name"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="scientificName"
                value={newPlant.scientificName}
                onChange={handleInputChange}
                placeholder="Scientific Name"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="category"
                value={newPlant.category}
                onChange={handleInputChange}
                placeholder="Category"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="origin"
                value={newPlant.origin}
                onChange={handleInputChange}
                placeholder="Origin"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <select
                name="wateringFrequency"
                value={newPlant.wateringFrequency}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Biweekly">Biweekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="soilType"
                value={newPlant.soilType}
                onChange={handleInputChange}
                placeholder="Soil Type"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="number"
                name="maxTemp"
                value={newPlant.temperatureRange.max}
                onChange={handleInputChange}
                placeholder="Maximum Temperature"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="number"
                name="minTemp"
                value={newPlant.temperatureRange.min}
                onChange={handleInputChange}
                placeholder="Minimum Temperature"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="form-control"
                accept="image/*"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <textarea
                name="description"
                value={newPlant.description}
                onChange={handleInputChange}
                placeholder="Description"
                className="form-control"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Plant'}
          </button>
        </form>
      )}

      {plants.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Scientific Name</th>
              <th>Category</th>
              <th>Origin</th>
              <th>Watering Frequency</th>
              <th>Soil Type</th>
              <th>Temp (Max)</th>
              <th>Temp (Min)</th>
                <th>Image</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant) => (
              <tr key={plant.id}>
                <td>{plant.name}</td>
                <td>{plant.scientificName}</td>
                <td>{plant.category}</td>
                <td>{plant.origin}</td>
                <td>{plant.wateringFrequency}</td>
                <td>{plant.soilType}</td>
                <td>{plant.temperatureRange.max}</td>
                <td>{plant.temperatureRange.min}</td>
                <td>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    />
                </td>
                <td>{plant.description}</td>
                <td>
                    <span className={`badge ${plant.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                      {plant.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      ) : (
        <p>No plants found.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default Plant;