import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { useState } from 'react';
import { Google } from './components/googleMap';
import { FavoriteStores } from './components/favourites';
import { Header } from './components/header';
import { Factpage } from './components/factpage';
import { ProfileSlideOut } from './components/profileslideout';
import { Login } from './components/login'
import { Homepage } from './components/homepage';
 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {

  const [showFavorites, setShowFavorites] = useState(false);
  const [showFactpage, setShowFactpage] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites(prevState => !prevState);
  };

  const toggleFactpage = () => {
    setShowFactpage(prevState => !prevState);
  };

  const navigateProfilePage = () => {
    setShowProfile(prevState => !prevState);
  };

  return (
    <div>
      <Homepage/>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Homepage/>} />
        </Routes>
      </BrowserRouter> */}

    </div>
    
      
    
    
  );
}
   
export default App;