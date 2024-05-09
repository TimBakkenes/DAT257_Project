import '../App.css';

import { useState } from 'react';
import { useLocation } from 'react-router-dom'

import { Google } from './googleMap';
import { FavoriteStores } from './favourites';
import { Header } from './header';
import { Factpage } from './factpage';
import { ProfileSlideOut } from './profileslideout';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Homepage() {

  const state = useLocation();

  console.log("test")
  const currentUser = state.state.user;
  console.log(currentUser);

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
      <Header toggleFavorites={toggleFavorites} toggleFactpage={toggleFactpage} navigateProfilePage={navigateProfilePage} />
      <div className='FavouritesPage'>
        <div className={`FavouriteStores ${showFavorites ? 'visible' : 'hidden'}`}>
          <FavoriteStores/>
        </div>
        <div className={`Google ${showFavorites ? 'map-small' : (showProfile ? 'map-semi-small' : 'map-large')}`}>
          <Google/> 
        </div>
      </div>
      {showFactpage && (
        <div className='Factpage'>
          <Factpage/>
        </div>
      )}
      {showProfile && (
        <div>
          <div className={`ProfileSlideOut ${showProfile ? 'visible' : 'hidden'}`}>
            <ProfileSlideOut/>
          </div>
          <div className={`Google ${showProfile ? 'map-semi-small' : 'map-semi-large'}`}>
            <Google/> 
          </div>
        </div>
      )}
    </div>
  );
}
   
export default Homepage;