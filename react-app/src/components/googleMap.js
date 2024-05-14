import React, {useState, useRef} from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF} from '@react-google-maps/api';
import storeData from '../data/stores.json';
import ".//css/info.css"
import axios from 'axios'

export function Google (username) {
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

    /* const handleMapClick = () => {
      setSelectedPlace(null);
    }; */
    
    const handleAddFavourites = () => {
      alert('Added to Favoutries')
    };

    // Code for adding stores to the map
    const [selectedLocation, setSelectedLocation] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [formLocation, setFormLocation] = useState("");

    // handle click on map
  const handleMapClick = (mapProps) => {
    setSelectedPlace(null);
    if (mapProps) {
      const lat = mapProps.latLng.lat();
      const lng = mapProps.latLng.lng();
      setShowForm(true);
      setFormLocation({ lat, lng });
      setSelectedLocation({ lat, lng });
    } else {
      alert("Please select the specific location");
    }
  };

  const handleCloseClick = () => {
    setSelectedLocation(null);
    setSelectedPlace(null);
    setShowForm(false);
  }

  const [id, setId] = useState('');
  const handleSetId = (e) => {
    setId(e)
  }

  const [description, setDesription] = useState('');
  const handleSetDescription = (e) => {
    setDesription(e);
  }

  const addStore = async () => {
    try {
      console.log({data: {
        name: id,
        owner: username.parameter,
        description: description,
        lat: formLocation.lat,
        long: formLocation.lng,
      }})
      // use data destructuring to get data from the promise object
      const response = await axios.post("http://127.0.0.1:8000/api/post/add_store", {
        "name": id,
        "owner": username.parameter,
        "description": description,
        "lat": formLocation.lat,
        "long": formLocation.lng
      }); 
      
      console.log(response.data)
    } catch (error) {
      console.log(error);
      console.log("Wrong password")
    }

  }

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
          
          {showForm && (
              <InfoWindowF position={formLocation} onCloseClick={handleCloseClick}>
                <div style={{backgroundColor:'white'}}>
                  <h3>Add your store by answering these questions</h3>
                  <p>Name:</p>
                  <input onChange={(e) => handleSetId(e.target.value)}/>
                  <br></br>
                  <p>Description(What are you going to sell for example?)</p>
                  <input onChange={(e) => handleSetDescription(e.target.value)}/>
                  <br></br>
                  <br></br>


                  <button className="app-button" onClick={addStore} >
                    Add Store
                  </button>
                </div>
                
              </InfoWindowF>
            )}
          
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
  