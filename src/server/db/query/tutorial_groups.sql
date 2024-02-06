-- name: GetAllTutorials :many
SELECT * FROM TutorialGroups
ORDER BY start_date
LIMIT 10 OFFSET $1;

-- name: CreateTutorialGroup :exec
INSERT INTO TutorialGroups (course_code, course_offering, teaching_assistant, tutorial_group)
VALUES ($1, $2, $3, $4);