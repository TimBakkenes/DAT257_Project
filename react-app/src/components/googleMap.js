import React, {useState, useRef} from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF} from '@react-google-maps/api';
import storeData from '../data/stores.json';
import ".//css/info.css"
import axios from 'axios';

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
    
    const handleAddFavourites = () => {
      axios.post("http://127.0.0.1:8000/api/post/add_favourite", {
        user: "11111111",
        store: "222222"
      })
      .then(response => {
        alert('Added to Favourites successfully');
        console.log(response);
      })
      .catch(error => {
          alert('Failed to add to Favourites');
          console.error('Error:', error);
      });
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
                            <button className='addFavouritesButton' onClick={handleAddFavourites}  style={{ 
                                  position: 'absolute',
                                  right: '5px',
                                  bottom: '5px',
                                  backgroundImage: "url('./components/css/Icon_heart.png')",
                                  backgroundSize: 'cover', 
                                  backgroundPosition: 'center', 
                                  backgroundRepeat: 'no-repeat',
                                  }}>Add to favourites</button>
                        </div>
                    </InfoWindowF>
                )}
            
        </GoogleMap>
        
      </LoadScript>
    );
  };
  