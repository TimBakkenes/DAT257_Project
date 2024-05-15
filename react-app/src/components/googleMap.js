import React, {useState, useRef, useEffect} from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF} from '@react-google-maps/api';
import storeData from '../data/stores.json';
import "./css/info.css"


import axios from 'axios';

export function Google (username) {
    const mapStyles = {
      height: "100vh",
      width: "100%"
    };
  
    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;


    const [center, setCenter] = useState({
      lat: 57.7089,
      lng: 11.9746
    })
    const [type, setType] = useState('Random')
    

    const [customStores, setCustomStores] = useState([])
    const [filteredCustomStores, setFilteredCustomStores] = useState([]);
  console.log(filteredCustomStores)
    useEffect(() => {
      var url = "http://127.0.0.1:8000/api/get/get_stores"
      axios.get(url).then((response) => {
        setCustomStores(response.data)
        setFilteredCustomStores(response.data)
        // console.log(response.data)
      }).catch((error) => {
        alert("Failed to fetch stores" + error)
      })
    }, []) 

    
    
    const handleCloseStore = () => {
      setSelectedStore(null);
    }

    const handleStoreClick = (store) => {
      setSelectedStore(store);
    }

    const mapRef = useRef(null);

    const [selectedPlace, setSelectedPlace] = useState(null);
    const [selectedStore, setSelectedStore] = useState(null);

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

    // Code for adding stores to the map
    
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
      console.log(formLocation)
    } else {
      alert("Please select the specific location");
    }
  };

  const handleCloseClick = () => {
    
    setSelectedPlace(null);
    setShowForm(false);
  }

  const [id, setId] = useState('');
  const handleSetId = (e) => {
    setCenter({lat: formLocation.lat, lng: formLocation.lng})
    setId(e)
  }

  const [description, setDesription] = useState('');
  const handleSetDescription = (e) => {
    setCenter({lat: formLocation.lat, lng: formLocation.lng})
    setDesription(e);
  }

  const addStore = async () => {
    try {
      /* console.log({data: {
        name: id,
        owner: username.parameter,
        description: description,
        type: type,
        lat: formLocation.lat,
        long: formLocation.lng,
      }}) */
      // use data destructuring to get data from the promise object
      const response = await axios.post("http://127.0.0.1:8000/api/post/add_store", {
        "name": id,
        "owner": username.parameter,
        "description": description,
        "type": type,
        "lat": formLocation.lat,
        "long": formLocation.lng
      }).catch(error => {alert("Failed to add store: " + error)}); 

      window.location.reload()
      
      console.log(response.data)
    } catch (error) {
      console.log(error);
      console.log("Wrong password")
    }

  }

  const filterOptions = ['All', 'Clothing', 'Furniture', 'Random'];
  
  console.log(filteredCustomStores)


   const applyFilter = (option) => {
    if (option !== 'All') {
      var filtered = customStores.filter(store => store.type === option);
      setFilteredCustomStores(filtered);
    } else {
      setFilteredCustomStores(customStores);
    }
  } 

  const handleTypeChange = (type) => {
    console.log(type);
    setType(type);
  }

  const [showGoogleStores, setShowGStores] = useState(true);

  const toggleGoogleStores = () => {
    setShowGStores(prevState => !prevState)

  }

    return (
      <div className='container'>
        <div className='store-filter'>
          <select name="select" onChange={ (event) => applyFilter(event.target.value)}  >
            {filterOptions.map(function(n) { 
              return (<option >{n}</option>);
            })}
          </select>
        </div>
        <div className='googleButton'>
          <button onClick={toggleGoogleStores}>Show Google Stores</button>
        </div>
      
      <LoadScript
        googleMapsApiKey={API_KEY}
      >
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={center}
          onClick={handleMapClick}
        >
          {showGoogleStores && storeData.places.map(place => (
                    <MarkerF
                        key={place.id} 
                        position={{ lat: place.location.latitude, lng: place.location.longitude }}
                        title={place.displayName.text} 
                        onClick={ ()=> handleMarkerClick(place)}
                        
                    />
                ))}


          
          {filteredCustomStores.map(store => (
            <MarkerF
              key={store.name}
              position={{lat: store.latitude, lng: store.longitude}}
              onClick={() => handleStoreClick(store)}
              icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
            />
          ))}
          
          {showForm && (
              <InfoWindowF position={formLocation} onCloseClick={handleCloseClick}>
                <div style={{backgroundColor:'white'}}>
                  <h3>Add your store by answering these questions</h3>
                  <p>Name:</p>
                  <input onChange={(e) => handleSetId(e.target.value)}/>
                  <br></br>
                  <p>Type of store:</p>
                  <select onChange={(event) => handleTypeChange(event.target.value)}>
                    <option >{"Clothing"}</option>
                    <option >{"Furniture"}</option>
                    <option >{"Random"}</option>
                  </select>
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
                        </div>
                    </InfoWindowF>
                )}
          
          {selectedStore && (
                    <InfoWindowF
                        position={{ lat: selectedStore.latitude, lng: selectedStore.longitude }}
                        onCloseClick={handleCloseStore}
                        ref={mapRef}
                    >
                        <div style={{backgroundColor:'white', minWidth:'200px', minHeight:'100px'}}>
                            <h3>{selectedStore.name}</h3>
                            <p>{selectedStore.description}</p>
                            <p>Owner: {selectedStore.owner}</p>
                            <p>Rating: </p>
                            <button className='addFavouritesButton' onClick={handleAddFavourites}  style={{ 
                                  position: 'absolute',
                                  
                                  right: '5px',
                                  bottom: '5px',
                                  backgroundSize: 'cover', 
                                  backgroundPosition: 'center', 
                                  backgroundRepeat: 'no-repeat',
                                  }}>Add to favourites</button>
                        </div>
                    </InfoWindowF>
                )}
            
        </GoogleMap>
      </LoadScript>
      </div>
    );
  };
  