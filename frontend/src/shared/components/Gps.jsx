// GpsLocation.jsx
import React, { useState } from 'react';
import { getAddressFromCoordinates } from '../services/gps-serv.js';
import './styles/gps.css';

function GpsLocation({ onAddressRetrieved }) {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState('');
  const [address, setAddress] = useState('');

  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(newLocation);
          setError('');

          try {
            const address = await getAddressFromCoordinates(newLocation.lat, newLocation.lng);
            setAddress(address);
            onAddressRetrieved(address); // Pass address to parent
          } catch (error) {
            setError('Error retrieving address: ' + error.message);
          }
        },
        (err) => {
          setError('Error retrieving location: ' + err.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="gps-container">
      <button className="gps-button" onClick={getLocation}>Get Location</button>
      {location.lat && location.lng ? (
        <p className="gps-address">Address: {address}</p>
      ) : (
        <p className="gps-error">{error}</p>
      )}
    </div>
  );
}

export default GpsLocation;
