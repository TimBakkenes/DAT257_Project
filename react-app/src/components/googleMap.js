import React from 'react';
import { GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api';
import storeData from '../data/stores.json';

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
    
      const handleMarkerClick = (name, address, rating, url) => {
        // do whatever you want
        console.log("Marker clicked:", name, address, rating, url);
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
          {storeData.places.map(place => (
                    <MarkerF
                        key={place.id} 
                        position={{ lat: place.location.latitude, lng: place.location.longitude }}
                        title={place.displayName.text} 
                        onClick={handleMarkerClick(place.displayName, place.formattedAddress, place.rating, place.websiteUri)}
                    />
                ))}
        </GoogleMap>
      </LoadScript>
    );
  };
  