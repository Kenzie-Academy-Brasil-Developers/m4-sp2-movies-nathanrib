CREATE TABLE movies (
id SERIAL PRIMARY KEY, 
name VARCHAR(50) UNIQUE  NOT NULL, 
description TEXT, 
duration INTEGER NOT NULL, 
price INTEGER NOT NULL  
);

SELECT * from movies;

ALTER TABLE movies RENAME COLUMN moviename to "name";