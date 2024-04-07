

import React from 'react';
import { GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api';

const App = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%"
  };

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KE;

  const placeType = 'cafe';

  const gothenburg = {
    lat: 57.7089,
    lng: 11.9746
  };

  const url =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' +
  gothenburg.lat +
  ',' +
  gothenburg.lng +
  '&radius=' +
  40 +
  '&type=' +
  placeType +
  '&key=' +
  API_KEY;


  function test() {
    let places = [];
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(res => {
        for (let googlePlace of res.results) {
          var place = {};
          var myLat = googlePlace.geometry.location.lat;
          var myLong = googlePlace.geometry.location.lng;
          var coordinate = {
            latitude: myLat,
            longitude: myLong,
          };
          place['placeTypes'] = googlePlace.types;
          place['coordinate'] = coordinate;
          place['placeId'] = googlePlace.place_id;
          place['placeName'] = googlePlace.name;
          places.push(place);
        }
        // Show all the places around 4 km from San Francisco.
        console.log('The places around San Francisco, CA, USA:'  + places.map(nearbyPlaces => nearbyPlaces.placeName),
        );
      })
      .catch(error => { 
        console.log(error);
      });

  }


  const defaultCenter = {
    lat: 7.2905715,
    lng: 80.6337262
  };

  

  const stores = {
    get_stores
  }

  function get_stores() {
    const radius = 200; // Search radius in meters
    const type = 'store'; // Type of place to search for (e.g., store, supermarket)

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${gothenburg}&radius=${radius}&type=${type}&key=${API_KEY}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Process the response data (e.g., extract store information)
        const stores = data.results;
        console.log(stores);
        // Display store information on the map or list it in your application
      })
      .catch(error => {
        console.error('Error fetching stores:', error);
      });
  };

  function logStores(stores) {
    console.log('Fetched stores:', stores);
  }
  
  // Call get_stores and pass the logStores function as the callback
  stores.get_stores(logStores);

  return (
    <LoadScript
    
      googleMapsApiKey={API_KEY}
    >
      
      <h2>Hello Group vi har fått google maps api:et att funka</h2>
      
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={gothenburg}
        >
        <MarkerF position={gothenburg}
         />
      </GoogleMap>
    </LoadScript>
  );
};

export default App;