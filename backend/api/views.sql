
CREATE VIEW Agg_Ratings AS (
    SELECT 
        store,
        ROUND(AVG(rating), 2) AS rating
    FROM Ratings
    GROUP BY store
);

CREATE VIEW UserFavouriteStores AS
SELECT
    u.id AS user_id,
    u.name AS user_name,
    s.name AS store_name,
    s.description AS store_description,
    s.owner AS store_owner
FROM
    Favourites f
JOIN
    Users u ON f.user_id = u.id
JOIN
    Stores s ON f.store = s.name;