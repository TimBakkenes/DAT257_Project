 DROP TABLE Users;

CREATE TABLE Users(
    id INT NOT NULL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE
); 



INSERT INTO users (id, username) VALUES (1, 'Axel')