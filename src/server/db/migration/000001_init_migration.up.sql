BEGIN;
	CREATE TABLE Users (
		created_at TIMESTAMPTZ(6) DEFAULT(CURRENT_TIMESTAMP),
		is_admin BOOL NOT NULL DEFAULT(FALSE),
		email TEXT UNIQUE NOT NULL,
		full_name TEXT,
		student_id TEXT PRIMARY KEY
	);

	CREATE TABLE Tutorials (
		course_code TEXT NOT NULL,
		course_offering TEXT NOT NULL,
		is_course_over BOOL DEFAULT(FALSE),
		joined_at TIMESTAMPTZ(6) DEFAULT(CURRENT_TIMESTAMP),
		PRIMARY KEY (course_code, course_offering)
	);

	CREATE TYPE Roles AS ENUM('students', 'teaching_assistant');

	CREATE TABLE TutorialMembers (
		course_code TEXT NOT NULL,
		course_offering TEXT NOT NULL,
		student_id TEXT NOT NULL,
		student_role Roles NOT NULL DEFAULT('students'),
		FOREIGN KEY (student_id) REFERENCES Users ON DELETE CASCADE,
		FOREIGN KEY (course_code,
			course_offering) REFERENCES Tutorials (course_code,
			course_offering),
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