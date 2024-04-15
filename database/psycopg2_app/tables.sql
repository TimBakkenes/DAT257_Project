 DROP TABLE Users;

CREATE TABLE Users(
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE
); 

INSERT INTO users (id, username) VALUES (1, 'Axel')