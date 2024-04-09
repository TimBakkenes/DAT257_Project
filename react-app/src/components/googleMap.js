import React, {useState, useRef} from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF} from '@react-google-maps/api';
import storeData from '../data/stores.json';
import ".//css/info.css"

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

    const mapRef = useRef(null);

    const [selectedPlace, setSelectedPlace] = useState(null);

    const handleMarkerClick = (place) => {
      setSelectedPlace(place);
    };

    const handleCloseInfoWindow = () => {
        setSelectedPlace(null);
    };

    const handleMapClick = () => {
      setSelectedPlace(null);
    };
    
    

    return (
      <LoadScript
        googleMapsApiKey={API_KEY}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={gothenburg}
          onClick={handleMapClick}
        >
          {storeData.places.map(place => (
                    <MarkerF
                        key={place.id} 
                        position={{ lat: place.location.latitude, lng: place.location.longitude }}
                        title={place.displayName.text} 
                        onClick={ ()=> handleMarkerClick(place)}
                    />
                ))}
          
          {selectedPlace && (
                    <InfoWindowF
                        position={{ lat: selectedPlace.location.latitude, lng: selectedPlace.location.longitude }}
                        onCloseClick={handleCloseInfoWindow}
                        ref={mapRef}
                    >
                        <div style={{backgroundColor:'white'}}>
                            <h3>{selectedPlace.displayName.text}</h3>
                            <p>{selectedPlace.formattedAddress}</p>
                            <p>Rating: {selectedPlace.rating}</p>
                            <a href={selectedPlace.websiteUri} >Visit Website</a>
                        </div>
                    </InfoWindowF>
                )}
            
        </GoogleMap>
        
      </LoadScript>
    );
  };
  