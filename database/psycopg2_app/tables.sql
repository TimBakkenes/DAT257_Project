DROP TABLE Users;

CREATE TABLE Users(
    id INT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE
); 

CREATE TABLE Stores(
    id INT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE Ratings(
    id INT NOT NULL PRIMARY KEY,
    rating INT NOT NULL
);

CREATE TABLE Favourites (
    user_id INT NOT NULL,
    store_id INT NOT NULL,
    rating_id INT NOT NULL,
    PRIMARY KEY (user_id, store_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (store_id) REFERENCES Stores(id),
    FOREIGN KEY (rating_id) REFERENCES Ratings(id)
);


INSERT INTO users (id, username) VALUES (1, 'Axel')