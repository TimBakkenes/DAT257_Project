
CREATE VIEW Agg_Ratings AS (
    SELECT 
        store,
        ROUND(AVG(rating), 2) AS rating
    FROM Ratings
    GROUP BY store
);