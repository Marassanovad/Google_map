import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { search } from '../api/search';
import './Search.css';

// Компонент для центрирования карты на выбранном местоположении
const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, map.getZoom(), { animate: true });
  return null;
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      setError('');
      const results = await search(query);
      if (results.length > 0) {
        setLocations(results);
        setSelectedLocation(results[0]); // Выберите первое место по умолчанию
      } else {
        setError('No locations found');
        setLocations([]);
        setSelectedLocation(null);
      }
    } catch (err) {
      setError('An error occurred while searching');
      console.error('Search error:', err);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter a location"
        />
        <button onClick={handleSearch}>Search</button>
        {error && <p>{error}</p>}
        {locations.length > 0 && (
          <ul>
            {locations.map((location, index) => (
              <li
                key={index}
                onClick={() => setSelectedLocation(location)}
                style={{ cursor: 'pointer' }}
              >
                {location.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="map">
        <MapContainer
          center={selectedLocation ? selectedLocation.coordinates : [51.5074, -0.1278]} // Default to London
          zoom={13}
          style={{ height: '100vh', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {selectedLocation && (
            <>
              <ChangeView center={selectedLocation.coordinates} />
              <Marker position={selectedLocation.coordinates}>
                <Popup>
                  {selectedLocation.name}
                </Popup>
              </Marker>
            </>
          )}
          {locations.map((location, index) => (
            <Marker key={index} position={location.coordinates}>
              <Popup>
                {location.name}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Search;
