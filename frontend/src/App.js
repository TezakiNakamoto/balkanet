import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import PropertyForm from './components/PropertyForm';
import Login from './components/Login';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/create-property" element={<PropertyForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

