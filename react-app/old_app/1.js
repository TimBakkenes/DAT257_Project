
// AIzaSyDqcwYMC3uRoHFK3RmqwFEFhwh0kChm0_Q

import React, { useState } from 'react'; // Import useState here
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapComponent = () => {
  const [search, setSearch] = useState(""); // State to hold the search input


  const containerStyle = {
    position: 'relative', // Establishes a positioning context for absolute positioning
    height: '100vh',
    width: '100%', // The container takes the full width of the viewport
  };

  const topRightContainerStyle = {
    position: 'absolute', // Position the container absolutely within the relative container
    top: 0,
    right: 0,
    margin: '20px', // Add some space from the top and right edges
    display: 'flex', // Use flexbox for horizontal layout
    alignItems: 'center', // Center items vertically
  };

  const searchInputStyle = {
    marginRight: '10px', // Add some space between the search input and the button
    padding: '10px',
  };

  const buttonStyle = {
    padding: '10px',
    cursor: 'pointer',
  };

  const mapStyles = {
    height: "100vh",
    width: "50%",
  };

  //const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const API_KEY = "";

  const defaultCenter = {
    lat: 7.2905715,
    lng: 80.6337262
  };

  // Placeholder for login click action
  const handleLoginClick = () => {
    console.log('Login button clicked!');
    // Here, you would implement or call your actual login logic
  };

  // Placeholder function for handling search submissions
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search submitted for:', search);
    // Here, you would implement or trigger the search functionality
  };

  return (
    <div style={containerStyle}>
      <div style={topRightContainerStyle}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex' }}>
          <input
            type="text"
            placeholder="Search..."
            style={searchInputStyle}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" style={{ display: 'none' }}>Search</button>
        </form>
        <button style={buttonStyle} onClick={handleLoginClick}>Login</button>
      </div>
      <LoadScript googleMapsApiKey={API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={defaultCenter}
        >
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapComponent;