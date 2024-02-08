-- name: CreateUser :exec
INSERT INTO Users(id) 
VALUES ($1);

-- name: GetUser :one
SELECT * FROM Users WHERE id=$1 LIMIT 1 OFFSET 0;
