BEGIN;
    DROP TABLE IF EXISTS Users, Tutorials, TutorialMembers, TutorialQuestions CASCADE;
    DROP TYPE IF EXISTS Roles;
COMMIT;