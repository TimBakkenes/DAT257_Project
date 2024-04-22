INSERT INTO Users (id, username, bio) VALUES ('11111111', 'Axel', 'Likes lego');
INSERT INTO Users (id, username, bio) VALUES ('22222222', 'Tim', 'Also likes lego');
INSERT INTO Users (id, username, bio) VALUES ('33333333', 'Anton', 'Hates lego');

INSERT INTO Stores (id, owner, name, latitude, longitude) VALUES ('111111', '11111111', 'Axels Second Hand Lego Store', 57.708870, 11.974560);

INSERT INTO Ratings (rating_user, store, rating) VALUES ('22222222', '111111', 5);

INSERT INTO Favourites (user_id, store) VALUES ('22222222', '111111');
