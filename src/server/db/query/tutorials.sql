-- name: GetAllTutorials :many
SELECT * FROM Tutorials
ORDER BY start_date
LIMIT 10 OFFSET $1;