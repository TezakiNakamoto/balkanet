import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PROPERTY_TYPE_CHOICES = [
  { value: 'AP', label: 'Apartment' },
  { value: 'HS', label: 'House' },
  { value: 'CO', label: 'Condo' },
  { value: 'TH', label: 'Townhouse' },
  { value: 'OT', label: 'Other' }
];

const PropertyForm = () => {
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    rooms: 1,
    property_type: 'AP'
  });
  const [images, setImages] = useState([]); // Array of image files
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    // Convert the FileList to an array
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setError('You must be logged in to create a property.');
      return;
    }
  
    const formData = new FormData();
    Object.entries(propertyData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    // Append images under the key 'images'
    images.forEach(file => {
      formData.append('images', file);
    });
  
    axios.post('http://127.0.0.1:8000/api/properties/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      }
    })
    .then(response => {
      console.log('Property created:', response.data);
      setError('');
      navigate('/');
    })
    .catch(err => {
      console.error('Error creating property:', err.response?.data || err);
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('An error occurred while creating the property.');
      }
    });
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Typography variant="h5" gutterBottom>
        Create New Property
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          name="title"
          value={propertyData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={propertyData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={propertyData.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Address"
          name="address"
          value={propertyData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="City"
          name="city"
          value={propertyData.city}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="State"
          name="state"
          value={propertyData.state}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Zip Code"
          name="zip_code"
          value={propertyData.zip_code}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rooms"
          name="rooms"
          type="number"
          value={propertyData.rooms}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Property Type"
          name="property_type"
          value={propertyData.property_type}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        >
          {PROPERTY_TYPE_CHOICES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Typography variant="body1" sx={{ marginTop: '1rem' }}>
          Upload Images
        </Typography>
        <input 
          type="file" 
          accept="image/*" 
          multiple 
          onChange={handleFileChange} 
        />
        <Button variant="contained" type="submit" fullWidth sx={{ marginTop: '1rem' }}>
          Create Property
        </Button>
      </form>
    </Container>
  );
};

export default PropertyForm;
