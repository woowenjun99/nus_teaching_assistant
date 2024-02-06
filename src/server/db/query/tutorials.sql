-- name: GetAllTutorials :many
SELECT * FROM TutorialGroups
ORDER BY start_date
LIMIT 10 OFFSET $1;