-- name: GetUserTutorials :many
SELECT tm.course_code, tm.course_offering, tm.student_role, t.is_over
FROM TutorialMembers as tm
LEFT JOIN Tutorials as t
ON tm.course_code = t.course_code AND tm.course_offering = t.course_offering
WHERE student_id = $1
ORDER BY tm.joined_at
LIMIT 10 OFFSET $2;