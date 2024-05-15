
CREATE VIEW Agg_Ratings AS (
    SELECT 
        store,
        ROUND(AVG(rating), 2) AS rating
    FROM Ratings
    GROUP BY store
);

CREATE VIEW UserFavouriteStores AS
   SELECT user_id, store, description
    FROM Favourites 
    JOIN Stores ON name = store
