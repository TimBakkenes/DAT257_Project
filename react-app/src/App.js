import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const defaultCenter = {
    lat: 7.2905715,
    lng: 80.6337262
  };

  return (
    <LoadScript
      googleMapsApiKey={API_KEY}
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

