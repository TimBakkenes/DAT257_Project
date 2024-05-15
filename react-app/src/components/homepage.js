import '../App.css';

import { useState } from 'react';
import { useLocation } from 'react-router-dom'

import { Google } from './googleMap';
import { FavoriteStores } from './favourites';
import { Header } from './header';
import { Factpage } from './factpage';
import { ProfileSlideOut } from './profileslideout';
import { Contact } from './contactpage';
import api from '../api';


import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Homepage() {

  const state = useLocation();
  const [currentUser, setCurrentUser] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFactpage, setShowFactpage] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites(prevState => !prevState);
  };

  const toggleFactpage = () => {
    setShowFactpage(prevState => !prevState);
  };

  const navigateProfilePage = () => {
    setShowProfile(prevState => !prevState);
    if (!currentUser) { 
      const username = state.state.user;
      if (username) {
        api.get(`/api/get/user/${username}`).then(response => {setCurrentUser(response.data);})};} 
  };  


  const toggleContact = () => {
    setShowContact(prevState => !prevState);
  };

  return (
    <div>
      <Header toggleFavorites={toggleFavorites} toggleFactpage={toggleFactpage} navigateProfilePage={navigateProfilePage} toggleContact={toggleContact}/>
      <div className='FavouritesPage'>
        <div className={`FavouriteStores ${showFavorites ? 'visible' : 'hidden'}`}>
          <FavoriteStores parameter={state.state.user}/>
        </div>
        <div className={`Google ${showFavorites ? 'map-small' : (showProfile ? 'map-semi-small' : 'map-large')}`}>
          <Google parameter={state.state.user}/> 
        </div>
      </div>
      {showFactpage && (
        <div className='Standardpage'>
          <Factpage/>
        </div>
      )}

      {showContact && (
          <div className='Standardpage'>
            <Contact/>
          </div>
        )}
        


{showProfile && currentUser && (
  <div className='ProfileSlideOut'>
    <ProfileSlideOut isVisible={showProfile} user={currentUser}/>
  </div>
)}
</div>
);
}

   
export default Homepage;