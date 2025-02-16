import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import PropertyCard from './PropertyCard';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/properties/')
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

  if (loading)
    return (
      <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ marginTop: '2rem' }}>
        <Alert severity="error">Error loading properties.</Alert>
      </Container>
    );

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
              <PropertyCard property={property} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default PropertyList;
