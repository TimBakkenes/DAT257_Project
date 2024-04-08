import './App.css';

import { useState } from 'react';
import { Google } from './components/googleMap';
import { FavoriteStores } from './components/favourites';
import { Header } from './components/header';

function App() {

  const [showFavorites, setShowFavorites] = useState(false);

  const toggleFavorites = () => {
    setShowFavorites(prevState => !prevState);
  };

  return (

    <div>
       <Header toggleFavorites={toggleFavorites} />
      <div className='FavouritesPage'>
        <div className={`FavouriteStores ${showFavorites ? 'visible' : 'hidden'}`}>
          <FavoriteStores/>
        </div>
        <div className={`Google ${showFavorites ? 'map-small' : 'map-large'}`}>
          <Google/>
        </div>
      </div>
    </div>
  );
}

export default App;
