// src/components/PropertyCard.js
import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, Button, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/properties/${property.id}`);
  };

  return (
    <Card sx={{ maxWidth: 345, transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)', boxShadow: 6 } }}>
      <CardActionArea onClick={handleViewDetails}>
        <CardMedia
          component="img"
          height="140"
          image={property.image || 'https://placehold.co/300x140'}
          alt={property.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {property.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.description.length > 100 ? property.description.substring(0, 100) + '...' : property.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={handleViewDetails}>
          View Details
        </Button>
        <Button size="small" variant="outlined" color="secondary">
          Contact Agent
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;
