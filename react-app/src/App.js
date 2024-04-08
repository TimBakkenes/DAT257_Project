import logo from './logo.svg';
import './App.css';

import { useState } from 'react';
import { Google } from './components/googleMap';
import { FavoriteStores } from './components/favourites';
import { Header } from './components/header';
import { Factpage } from './components/factpage';

function App() {

  const [showFavorites, setShowFavorites] = useState(false);
  const [showFactpage, setShowFactpage] = useState(false);


  const toggleFavorites = () => {
    setShowFavorites(prevState => !prevState);
  };

  const toggleFactpage = () => {
    setShowFactpage(prevState => !prevState);
  };

  return (

    <div>
       <Header toggleFavorites={toggleFavorites} toggleFactpage={toggleFactpage}  />
      <div className='FavouritesPage'>
        <div className={`FavouriteStores ${showFavorites ? 'visible' : 'hidden'}`}>
          <FavoriteStores/>
        </div>
        <div className={`Google ${showFavorites ? 'map-small' : 'map-large'}`}>
          <Google/>
        </div>
      
      </div>
      {showFactpage && (
        <div className='Factpage'>
          <Factpage/>
        </div>
        
      )}
    </div>
  );
}

export default App;