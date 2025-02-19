import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import PropertyForm from './components/PropertyForm';
import Login from './components/Login';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PropertyList />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
      <Route path="/create-property" element={<PropertyForm />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
