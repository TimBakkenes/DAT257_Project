import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function FavoriteStores(username) {
    
  const [favourtieStores, setFavouriteStores] = useState([])
  useEffect(() => {
    //console.log(username.parameter)
    var url = `http://127.0.0.1:8000/api/get/get_favourites?user=${username.parameter}`
    axios.get(url).then((response) => {
      setFavouriteStores(response.data)
      console.log("222")
      console.log(response.data)
    }).catch((error) => {
      alert("Failed to fetch favourites" + error)
    })
  }, []) 

    /* const [stores, setStores] = useState([
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
    ]); */

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
  
    /* useEffect(() => {
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
    }, []); */

    useEffect(() => {
      fetchRatings();
      console.log("Test")
      console.log(aggstoreRating)
    }, []);

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
  
    return (
    <div className="stores-wrapper">
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50px', whiteSpace:'nowrap' }}>
            
            <h1 className="fact-page-heading">Your Favourite Stores</h1>
        </div>

      <div className="stores-container">
        {favourtieStores.map((store, index) => (
          <div key={index} className="store">
            <h2>{store.name}</h2>
            <div className="rating">
              {renderStars(aggstoreRating[store.name])}
              <span>({aggstoreRating[store.name]})</span>
            </div>
            <p>Description: {store.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}