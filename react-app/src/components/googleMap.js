import React from 'react';
import { GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api';

export function Google () {
    const mapStyles = {
      height: "100vh",
      width: "100%"
    };
  
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  
    const gothenburg = {
        lat: 57.7089,
        lng: 11.9746
      };
    

    return (
      <LoadScript
        googleMapsApiKey={API_KEY}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={gothenburg}
        >
          <MarkerF position={gothenburg} />
        </GoogleMap>
      </LoadScript>
    );
  };
  