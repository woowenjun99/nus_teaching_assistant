BEGIN;
	CREATE TABLE Users (
		created_at TIMESTAMPTZ(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
		email TEXT UNIQUE,
		full_name TEXT,
		is_admin BOOL NOT NULL DEFAULT(FALSE),
		id TEXT PRIMARY KEY
	);

	CREATE TABLE TutorialGroups(
		course_code TEXT NOT NULL,
		course_offering TEXT NOT NULL,
		teaching_assistant TEXT NOT NULL REFERENCES Users ON DELETE CASCADE,
		PRIMARY KEY (course_code, course_offering, teaching_assistant)
	);

	CREATE TABLE TutorialMembers(
		course_code TEXT NOT NULL,
		course_offering TEXT NOT NULL,
		teaching_assistant TEXT NOT NULL REFERENCES Users,
		joined_at TIMESTAMPTZ(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
		student_id TEXT NOT NULL REFERENCES Users ON DELETE CASCADE,
		FOREIGN KEY (course_code, course_offering, teaching_assistant) REFERENCES TutorialGroups ON DELETE CASCADE,
		PRIMARY KEY (course_code, course_offering, student_id),
		CHECK (student_id <> teaching_assistant)
	);
COMMIT;