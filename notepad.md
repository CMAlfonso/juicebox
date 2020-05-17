CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL
);

INSERT INTO users (username, password)
VALUES
    ('harry', 'potter1'),
    ('ron', 'weasley7'),
    ('hermione', 'granger1');


TAGS COMING OUT AS "[ARRAY]"
AUTHOR COMING OUT AS "[OBJECT]"