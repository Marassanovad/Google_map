import './App.css';
// import { useState } from 'react';
// import type { Place } from "./api/Place";

import React from 'react';
import LocationSearch from './components/LocationSearch'; 

const App = () => {
  return (
    <div>
      <h1>React Leaflet Map</h1>
      <LocationSearch />
    </div>
  );
};

export default App;

