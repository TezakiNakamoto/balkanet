import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PropertyList />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
    </Routes>
  );
}

export default App;
