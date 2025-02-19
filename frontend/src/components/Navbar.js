import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Balkanet
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>
        <Button color="inherit" component={RouterLink} to="/properties">
          Properties
        </Button>
        <Button color="inherit" component={RouterLink} to="/create-property">
          Create Property
        </Button>
        <Button color="inherit" component={RouterLink} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
