import './App.css';

import { useState } from 'react';
import { Google } from './components/googleMap';
import { FavoriteStores } from './components/favourites';
import { Header } from './components/header';
import { Factpage } from './components/factpage';
import { ProfileSlideOut } from './components/profileslideout';
import { Contact } from './components/contactpage';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {

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
  };

  const toggleContact = () => {
    setShowContact(prevState => !prevState);
  };

  return (
    <div>
      <Header toggleFavorites={toggleFavorites} toggleFactpage={toggleFactpage} navigateProfilePage={navigateProfilePage} toggleContact={toggleContact}/>
      <div className='FavouritesPage'>
        <div className={`FavouriteStores ${showFavorites ? 'visible' : 'hidden'}`}>
          <FavoriteStores/>
        </div>
        <div className={`Google ${showFavorites ? 'map-small' : (showProfile ? 'map-semi-small' : 'map-large')}`}>
          <Google/> 
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
   
export default App;