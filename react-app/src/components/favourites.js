import React, { useEffect, useState } from 'react';

export function FavoriteStores() {
    
    const [stores, setStores] = useState([
        {
            name: "Store 1",
            image: "store1.jpg",
            rating: 4.5,
            description: "Test 1"
          },
          {
            name: "Store 2",
            image: "store2.jpg",
            rating: 4.4,
            description: "Test 2"
          },
          {
            name: "Store 3",
            image: "store2.jpg",
            rating: 3.2,
            description: "Test 3"
          }
    ]);

  const renderStars = (rating) => {
    const starCount = Math.round(rating);
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < starCount) {
        stars.push(<span key={i} className="star">&#9733;</span>); // Filled star
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>); // Empty star
      }
    }
    return stars;
  };
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setStores([
            {
                name: "Store 1",
                image: "store1.jpg",
                rating: 4.5,
                description: "Test 1"
              },
              {
                name: "Store 2",
                image: "store2.jpg",
                rating: 4.4,
                description: "Test 2"
              },
              {
                name: "Store 3",
                image: "store2.jpg",
                rating: 3.2,
                description: "Test 3"
              }
        ]);
      }, 1000);
  
      return () => clearTimeout(timer);
    }, []);
  
    return (
    <div className="stores-wrapper">
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', whiteSpace:'nowrap' }}>
            <h2>Your Favourite Stores</h2>
        </div>

      <div className="stores-container">
        {stores.map((store, index) => (
          <div key={index} className="store">
            <img src={store.image} alt={store.name} />
            <h2>{store.name}</h2>
            <div className="rating">
              {renderStars(store.rating)}
              <span>({store.rating})</span>
            </div>
            <p>Description: {store.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}