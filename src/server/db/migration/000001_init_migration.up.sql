BEGIN;
	CREATE TABLE Users (
		created_at TIMESTAMPTZ(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
		email TEXT UNIQUE,
		full_name TEXT,
		is_admin BOOL NOT NULL DEFAULT(FALSE),
		id TEXT PRIMARY KEY
	);

	CREATE TABLE TutorialGroups (
		course_code TEXT NOT NULL,
		course_offering TEXT NOT NULL,
		is_over BOOL NOT NULL DEFAULT(FALSE),
		start_date TIMESTAMPTZ(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
		tutorial_group TEXT NOT NULL,
		teaching_assistant TEXT NOT NULL REFERENCES Users,
		PRIMARY KEY (course_code, course_offering, tutorial_group)
	);

	CREATE TABLE TutorialMembers (
		course_code TEXT NOT NULL,
		course_offering TEXT NOT NULL,
		joined_at TIMESTAMPTZ(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
		student_id TEXT NOT NULL REFERENCES Users ON DELETE CASCADE,
		tutorial_group TEXT NOT NULL,
		FOREIGN KEY (course_code, course_offering, tutorial_group) REFERENCES TutorialGroups ON DELETE CASCADE,
		PRIMARY KEY (student_id, course_code, course_offering)
	);

	CREATE TABLE TutorialQuestions (
		created_at TIMESTAMPTZ(6) NOT NULL DEFAULT(CURRENT_TIMESTAMP),
		course_code TEXT NOT NULL,
		course_offering TEXT NOT NULL,
		question TEXT NOT NULL,
		question_id UUID PRIMARY KEY DEFAULT(gen_random_uuid()),
		student_id TEXT NOT NULL,
		FOREIGN KEY (student_id, course_code, course_offering) REFERENCES TutorialMembers ON DELETE CASCADE
	);
COMMIT;