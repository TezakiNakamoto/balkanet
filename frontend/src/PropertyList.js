// src/components/PropertyList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>Error loading properties.</div>;

  return (
    <div>
      <h1>Property Listings</h1>
      {properties.length === 0 ? (
        <p>No properties available.</p>
      ) : (
        <ul>
          {properties.map((property) => (
            <li key={property.id}>
              <h2>{property.title}</h2>
              <p>{property.description}</p>
              <p>Price: {property.price}</p>
              <p>Address: {property.address}, {property.city}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertyList;
