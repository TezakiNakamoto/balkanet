import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const getImageUrl = (imgPath) => {
  if (!imgPath) return "https://placehold.co/400x200"; // fallback placeholder
  return imgPath.startsWith('http') ? imgPath : `http://127.0.0.1:8000${imgPath}`;
};

function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/properties/')
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching properties:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ marginTop: '2rem' }}>
        <Alert severity="error">Error loading properties.</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Property Listings
      </Typography>
      {properties.length === 0 ? (
        <Typography>No properties available.</Typography>
      ) : (
        <Grid container spacing={3}>
          {properties.map((property) => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 },
                }}
                onClick={() => navigate(`/properties/${property.id}`)}
              >
                <CardMedia
                  component="img"
                  height="180"
                  image={
                    property.images && property.images.length > 0
                      ? getImageUrl(property.images[0].image)
                      : getImageUrl(property.image)
                  }
                  alt={property.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {property.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {property.description.length > 100
                      ? property.description.substring(0, 100) + '...'
                      : property.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default PropertyList;
