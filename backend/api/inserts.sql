INSERT INTO Users (username, displayname, bio) VALUES ('11111111', 'Axel', 'Likes lego');
INSERT INTO Users (username, displayname, bio) VALUES ('22222222', 'Tim', 'Also likes lego');
INSERT INTO Users (username, displayname, bio) VALUES ('33333333', 'Anton', 'Hates lego');
INSERT INTO Users (username, displayname, bio) VALUES ('TimTennis02', 'Tim Bakkenes', 'Likes to sell lego');

INSERT INTO Passwords VALUES ('11111111', 'a');
INSERT INTO Passwords VALUES ('22222222', 'b');
INSERT INTO Passwords VALUES ('33333333', 'c');

INSERT INTO Stores (name, owner, description, type, latitude, longitude) VALUES ('K mart', '11111111', 'Axels Second Hand Lego Store', 'Clothing', 57.708870, 11.974560);
INSERT INTO Stores (name, owner, description, type, latitude, longitude) VALUES ('Test store', '11111111', 'Axels Second Second Hand Lego Store', 'Clothing', 57.708870, 11.974560);

INSERT INTO Ratings (rating_user, store, rating) VALUES ('22222222', 'K mart', 5);

INSERT INTO Favourites (user_id, store) VALUES ('22222222', 'K mart');
