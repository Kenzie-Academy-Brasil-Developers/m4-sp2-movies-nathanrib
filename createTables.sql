CREATE TABLE movies (
id SERIAL PRIMARY KEY, 
moviename VARCHAR(55) UNIQUE  NOT NULL, 
description TEXT, 
duration INTEGER NOT NULL, 
price INTEGER NOT NULL  
);

SELECT * from movies;