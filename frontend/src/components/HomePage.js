// Example: src/App.js (for a standard Create React App project)
import React from 'react';
import PropertySearchForm from './PropertySearchForm';

function App() {
  return (
    <div>
      {/* Render the search form at the top */}
      <PropertySearchForm />
      {/* Other homepage content can go here */}
      <h1>Welcome to Balkanet!</h1>
      <p>Explore property listings below...</p>
    </div>
  );
}

export default App;
