-- name: GetUserTutorialGroups :many
SELECT course_code, course_offering, teaching_assistant
FROM TutorialMembers 
WHERE student_id = $1
UNION
SELECT course_code, course_offering, teaching_assistant
FROM TutorialGroups
WHERE teaching_assistant = $1;

-- name: GetAllTutorialGroups :many
SELECT * FROM TutorialGroups;

-- name: CreateTutorialGroup :exec
INSERT INTO TutorialGroups(course_code, course_offering, teaching_assistant)
VALUES ($1, $2, $3);

-- name: DeleteTutorialGroup :exec
DELETE FROM TutorialGroups
WHERE course_code = $1 AND course_offering = $2 AND teaching_assistant = $3;