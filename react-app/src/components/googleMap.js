import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import storeData from '../data/stores.json';
import './css/info.css';
import axios from 'axios';

export function Google (username) {
    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const [center, setCenter] = useState({ lat: 57.7089, lng: 11.9746 });
    const [type, setType] = useState('Random');
    const [customStores, setCustomStores] = useState([]);
    const [filteredCustomStores, setFilteredCustomStores] = useState([]);
    const [selectedStore, setSelectedStore] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formLocation, setFormLocation] = useState({});
    const [id, setId] = useState('');
    const [description, setDescription] = useState('');
    const [userRating, setUserRating] = useState(1);
    const [selectedPlace, setSelectedPlace] = useState(null); 

    const mapRef = useRef(null); 

    useEffect(() => {
        fetchStores();
    }, []);

    useEffect(() => {
      fetchRatings();

      
  }, []);

    const fetchStores = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/get/get_stores");
            setCustomStores(response.data);
            setFilteredCustomStores(response.data);
        } catch (error) {
            alert("Failed to fetch stores: " + error);
        }
    };

    const handleStoreClick = (store) => {
        setSelectedStore(store);
    };

    /* const fetchUserRating = async (storeName) => {
        try {
            const response = await axios.post('http://localhost:8000/api/get/get_ratings', {params: {
                user: username.parameter,
                store: storeName
            }});
            setUserRating(response.data.rating || 1); 
        } catch (error) {
            console.error('Failed to fetch rating:', error);
        }
    }; */

    

    const [aggstoreRating, setaggStoreRating] = useState({})
    const fetchRatings = async () => {
        try {
          const aggResponse = await axios.get('http://localhost:8000/api/get/get_all_stores_ratings')
          var storeRatings = aggResponse.data.reduce((acc, [name, rating]) => {
            acc[name] = rating;
            return acc;
          }, {});
          setaggStoreRating(storeRatings)
          console.log(aggstoreRating)
      } catch (error) {
          console.error('Failed to fetch rating:', error);
      }
    }

    const submitRating = async (storeName, userRating) => {
        console.log(storeName);
        console.log(username.parameter)
        try {
            await axios.post('http://localhost:8000/api/post/add_rating', {
                user: username.parameter,
                store: storeName,
                rating: userRating
            });
            alert('Rating submitted successfully');
            const updatedStores = customStores.map(store => {
                if (store.name === storeName) {
                    return { ...store, rating: userRating };
                }
                return store;
            });
            setCustomStores(updatedStores);
            setSelectedStore(prevState => ({ ...prevState, rating: userRating }));
        } catch (error) {
            console.error('Failed to submit rating:', error);
        }
    };

    const handleMapClick = (mapProps) => {
        setSelectedPlace(null);
        if (mapProps) {
            const lat = mapProps.latLng.lat();
            const lng = mapProps.latLng.lng();
            setShowForm(true);
            setCenter({lat: lat, lng: lng})
            setFormLocation({ lat, lng });
        } else {
            alert("Please select the specific location");
        }
    };

    const handleCloseClick = () => {
        setSelectedPlace(null);
        setShowForm(false);
    };

    const addStore = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/post/add_store", {
                name: id,
                owner: username.parameter,
                description: description,
                type: type,
                lat: formLocation.lat,
                long: formLocation.lng
            });
            window.location.reload();
        } catch (error) {
            alert("Failed to add store: " + error);
        }
    };

    const filterOptions = ['All', 'Clothing', 'Furniture', 'Random'];

    const applyFilter = (option) => {
        if (option !== 'All') {
            const filtered = customStores.filter(store => store.type === option);
            setFilteredCustomStores(filtered);
        } else {
            setFilteredCustomStores(customStores);
        }
    };

    const handleTypeChange = (type) => {
        setType(type);
    };

    const [showGoogleStores, setShowGStores] = useState(true);

    const toggleGoogleStores = () => {
        setShowGStores(prevState => !prevState);
    };

    const handleAddFavourites = () => {
        var data = {
            user: username.parameter,
            store: selectedStore.name
        };
        axios.post("http://127.0.0.1:8000/api/post/add_favourite", data)
            .then(response => {
                alert('Added to Favourites successfully');
                window.location.reload();
            })
            .catch(error => {
                alert('Failed to add to Favourites');
                console.error('Error:', error);
            });
    };

    const handleMarkerClick = (place) => {
        setSelectedPlace(place);
    };

    return (
        <div className='container'>
            <div className='store-filter'>
                <select name="select" onChange={(event) => applyFilter(event.target.value)}>
                    {filterOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            <div className='googleButton'>
                <button onClick={toggleGoogleStores}>Show Google Stores</button>
            </div>

            <LoadScript googleMapsApiKey={API_KEY}>
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
                            onClick={() => handleMarkerClick(place)}
                        />
                    ))}

                    {filteredCustomStores.map(store => (
                        <MarkerF
                            key={store.name}
                            position={{ lat: store.latitude, lng: store.longitude }}
                            onClick={() => handleStoreClick(store)}
                            icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
                        />
                    ))}

                    {showForm && (
                        <InfoWindowF position={formLocation} onCloseClick={handleCloseClick}>
                            <div style={{ backgroundColor: 'white' }}>
                                <h3>Add your store by answering these questions</h3>
                                <p>Name:</p>
                                <input onChange={(e) => setId(e.target.value)} />
                                <br />
                                <p>Type of store:</p>
                                <select onChange={(event) => handleTypeChange(event.target.value)}>
                                    {filterOptions.filter(option => option !== 'All').map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <br />
                                <p>Description (What are you going to sell for example?)</p>
                                <input onChange={(e) => setDescription(e.target.value)} />
                                <br />
                                <br />
                                <button className="app-button" onClick={addStore}>Add Store</button>
                            </div>
                        </InfoWindowF>
                    )}

                    {selectedPlace && (
                        <InfoWindowF
                            position={{ lat: selectedPlace.location.latitude, lng: selectedPlace.location.longitude }}
                            onCloseClick={() => setSelectedPlace(null)}
                            ref={mapRef}
                        >
                            <div style={{ backgroundColor: 'white' }}>
                                <h3>{selectedPlace.displayName.text}</h3>
                                <p>{selectedPlace.formattedAddress}</p>
                                <p>Rating: {selectedPlace.rating}</p>
                                <a href={selectedPlace.websiteUri}>Visit Website</a>
                            </div>
                        </InfoWindowF>
                    )}

                    {selectedStore && (
                        <InfoWindowF
                            position={{ lat: selectedStore.latitude, lng: selectedStore.longitude }}
                            onCloseClick={() => setSelectedStore(null)}
                            ref={mapRef}
                        >
                            <div style={{ backgroundColor: 'white', minWidth: '200px', minHeight: '100px' }}>
                                <h3>{selectedStore.name}</h3>
                                <p>{selectedStore.description}</p>
                                <p>Owner: {selectedStore.owner}</p>
                                <p>Type of store: {selectedStore.type}</p>
                                <p>Rating: {aggstoreRating[selectedStore.name]||"No rating set"}</p>
                                <select value={userRating} onChange={(rating) => setUserRating(rating.target.value)}>
                                    {[1, 2, 3, 4, 5].map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                                <br></br>

                                <button onClick={() => submitRating(selectedStore.name, userRating)}>Set Rating</button>

                                <button className='addFavouritesButton' onClick={handleAddFavourites} style={{
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
}
