// src/components/PropertySearchForm.js

import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Grid,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * PropertySearchForm Component
 * 
 * This component renders a search form for property listings. It includes:
 * - Tabs section for filtering by status or agent.
 * - A location input field with a search icon.
 * - A dropdown for selecting an area expansion.
 * - A group of checkboxes for property types.
 * - A submit button that logs the form state to the console.
 */
const PropertySearchForm = () => {
  // Manage the active tab (0: 'Ne shitje', 1: 'Te shitura', 2: 'Agent')
  const [selectedTab, setSelectedTab] = useState(0);

  // Manage the location input
  const [location, setLocation] = useState('');

  // Manage the area expansion dropdown value
  const [areaExpansion, setAreaExpansion] = useState('+ 0 km');

  // Manage the property types checkboxes state
  const [propertyTypes, setPropertyTypes] = useState({
    All: false,
    House: false,
    Apartments: false,
    Condo: false,
    Townhouse: false,
    Other: false,
  });

  // Handle tab changes
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Handle changes in the property types checkboxes
  const handleCheckboxChange = (event) => {
    setPropertyTypes({
      ...propertyTypes,
      [event.target.name]: event.target.checked,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Gather the current form state
    const formState = {
      selectedTab,
      location,
      areaExpansion,
      propertyTypes,
    };
    // For now, just log the state to the console
    console.log('Search Form State:', formState);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 2,
        border: '1px solid #ccc',
        borderRadius: 2,
        mb: 4,
      }}
    >
      {/* Tabs Section */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        <Tab label="Ne shitje" />
        <Tab label="Te shitura" />
        <Tab label="Agent" />
      </Tabs>

      {/* Location Input Field with Search Icon */}
      <TextField
        fullWidth
        label="Område"
        placeholder="Write adress"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 2 }}
      />

      {/* Area Expansion Dropdown */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Select
          value={areaExpansion}
          onChange={(e) => setAreaExpansion(e.target.value)}
        >
          <MenuItem value="+ 0 km">+ 0 km</MenuItem>
          <MenuItem value="+ 1 km">+ 1 km</MenuItem>
          <MenuItem value="+ 2 km">+ 2 km</MenuItem>
          <MenuItem value="+ 3 km">+ 3 km</MenuItem>
          <MenuItem value="+ 4 km">+ 4 km</MenuItem>
          <MenuItem value="+ 5 km">+ 5 km</MenuItem>
        </Select>
        <FormHelperText>Utöka område med</FormHelperText>
      </FormControl>

      {/* Property Types Checkbox Group */}
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <FormLabel component="legend">Property Types</FormLabel>
        <FormGroup>
          <Grid container spacing={1}>
            {Object.keys(propertyTypes).map((type) => (
              <Grid item xs={6} sm={3} key={type}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={propertyTypes[type]}
                      onChange={handleCheckboxChange}
                      name={type}
                    />
                  }
                  label={type}
                />
              </Grid>
            ))}
          </Grid>
        </FormGroup>
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" fullWidth>
        Hitta bostäder till salu
      </Button>
    </Box>
  );
};

export default PropertySearchForm;
