CREATE TABLE Users (
    username TEXT PRIMARY KEY,
    displayname TEXT NOT NULL,
    bio TEXT 
); 

CREATE TABLE Passwords(
    c_user TEXT PRIMARY KEY,
    password TEXT,
    FOREIGN KEY (c_user) REFERENCES Users(username)
);

CREATE TABLE Stores(
    name TEXT PRIMARY KEY,
    owner TEXT REFERENCES Users(username) ON DELETE CASCADE,
    description TEXT NOT NULL,
    type TEXT CHECK (type in ('Clothing', 'Furniture', 'Random')),
    latitude NUMERIC(8, 6) NOT NULL,
    longitude NUMERIC(8, 6) NOT NULL
);

CREATE TABLE Ratings(
    rating_user TEXT REFERENCES Users(username) ON DELETE CASCADE,
    store TEXT REFERENCES Stores(name) ON DELETE CASCADE,
    rating INTEGER CHECK (rating in (1, 2, 3, 4, 5)),
    PRIMARY KEY (rating_user, store)
);

CREATE TABLE Favourites (
    user_id TEXT REFERENCES Users(username) ON DELETE CASCADE,
    store TEXT REFERENCES Stores(name) ON DELETE CASCADE,
    PRIMARY KEY (user_id, store)
);
