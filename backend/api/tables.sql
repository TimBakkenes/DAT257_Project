CREATE TABLE Users(
    id VARCHAR(8) PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    bio TEXT 
); 

CREATE TABLE Stores(
    id VARCHAR(6) PRIMARY KEY,
    owner VARCHAR(8) REFERENCES Users(id),
    name TEXT NOT NULL UNIQUE,
    latitude NUMERIC(8, 6) NOT NULL,
    longitude NUMERIC(8, 6) NOT NULL
);

CREATE TABLE Ratings(
    rating_user VARCHAR(8) REFERENCES Users(id),
    store VARCHAR(6) REFERENCES Stores(id),
    rating INTEGER CHECK (rating in (1, 2, 3, 4, 5)),
    PRIMARY KEY (rating_user, store)
);

CREATE TABLE Favourites (
    user_id VARCHAR(8) REFERENCES Users(id),
    store VARCHAR(6) REFERENCES Stores(id),
    PRIMARY KEY (user_id, store)
);
