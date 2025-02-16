import React, { useState, useEffect } from 'react';  
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, CircularProgress, Alert, Button, CardMedia } from '@mui/material';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/properties/${id}/`)
      .then(response => {
        console.log('Property details:', response.data);  // Debug log
        setProperty(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching property:', err);
        setError(err);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ marginTop: '2rem' }}>
        <Alert severity="error">Error loading property details.</Alert>
      </Container>
    );

  // Function to construct full image URL
  const getImageUrl = (imgPath) => {
    if (!imgPath) return "https://placehold.co/400x200";
    return imgPath.startsWith('http') ? imgPath : `http://127.0.0.1:8000${imgPath}`;
  };

  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Button variant="outlined" onClick={() => navigate(-1)}>Back</Button>
      <Typography variant="h4" gutterBottom sx={{ marginTop: '1rem' }}>
        {property.title}
      </Typography>

      {/* Display multiple images if available */}
      {property.images && property.images.length > 0 ? (
        property.images.map((img) => (
          <CardMedia
            key={img.id}
            component="img"
            height="200"
            image={getImageUrl(img.image)}
            alt={img.caption || property.title}
            sx={{ marginBottom: '1rem' }}
          />
        ))
      ) : (
        <CardMedia
          component="img"
          height="200"
          image={getImageUrl(property.image)}
          alt={property.title}
          sx={{ marginBottom: '1rem' }}
        />
      )}

      <Typography variant="body1" sx={{ marginTop: '1rem' }}>
        {property.description}
      </Typography>
      <Typography variant="h6" sx={{ marginTop: '1rem' }}>
        Price: {property.price}
      </Typography>
      <Typography variant="body2">
        Address: {property.address}, {property.city}
      </Typography>

      {/* New lines for additional property details */}
      <Typography variant="body2">
        <strong>Rooms:</strong> {property.rooms}
      </Typography>
      <Typography variant="body2">
        <strong>Property Type:</strong> {property.property_type}
      </Typography>
    </Container>
  );
};

export default PropertyDetails;