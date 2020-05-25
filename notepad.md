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


curl http://localhost:3000/api/posts -X POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJyb24iLCJpYXQiOjE1OTAzMTAwODV9.JkrWLKDs7lxxfzU0FbMqTkv1q1QrMoAjRTTzHdKiwtM' -H 'Content-Type: application/json' -d '{"title": "test post", "content": "how is this?", "tags": " #once #twice    #happy"}'

curl http://localhost:3000/api/posts/3 -X PATCH -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJyb24iLCJpYXQiOjE1OTAzMTAwODV9.JkrWLKDs7lxxfzU0FbMqTkv1q1QrMoAjRTTzHdKiwtM' -H 'Content-Type: application/json' -d '{"title": "updating my old stuff", "tags": "#oldisnewagain"}'

curl http://localhost:3000/api/posts -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJyb24iLCJpYXQiOjE1OTAzMTAwODV9.JkrWLKDs7lxxfzU0FbMqTkv1q1QrMoAjRTTzHdKiwtM'
