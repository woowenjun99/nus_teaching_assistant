import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getUserTutorialGroupsQuery = `-- name: GetUserTutorialGroups :many
SELECT course_code, course_offering, teaching_assistant
FROM TutorialMembers 
WHERE student_id = $1
UNION
SELECT course_code, course_offering, teaching_assistant
FROM TutorialGroups
WHERE teaching_assistant = $1`;

export interface GetUserTutorialGroupsArgs {
    studentId: string;
}

export interface GetUserTutorialGroupsRow {
    courseCode: string;
    courseOffering: string;
    teachingAssistant: string;
}

export async function getUserTutorialGroups(client: Client, args: GetUserTutorialGroupsArgs): Promise<GetUserTutorialGroupsRow[]> {
    const result = await client.query({
        text: getUserTutorialGroupsQuery,
        values: [args.studentId],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            courseCode: row[0],
            courseOffering: row[1],
            teachingAssistant: row[2]
        };
    });
}

export const getAllTutorialGroupsQuery = `-- name: GetAllTutorialGroups :many
SELECT course_code, course_offering, teaching_assistant FROM TutorialGroups`;

export interface GetAllTutorialGroupsRow {
    courseCode: string;
    courseOffering: string;
    teachingAssistant: string;
}

export async function getAllTutorialGroups(client: Client): Promise<GetAllTutorialGroupsRow[]> {
    const result = await client.query({
        text: getAllTutorialGroupsQuery,
        values: [],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            courseCode: row[0],
            courseOffering: row[1],
            teachingAssistant: row[2]
        };
    });
}

export const createTutorialGroupQuery = `-- name: CreateTutorialGroup :exec
INSERT INTO TutorialGroups(course_code, course_offering, teaching_assistant)
VALUES ($1, $2, $3)`;

export interface CreateTutorialGroupArgs {
    courseCode: string;
    courseOffering: string;
    teachingAssistant: string;
}

export async function createTutorialGroup(client: Client, args: CreateTutorialGroupArgs): Promise<void> {
    await client.query({
        text: createTutorialGroupQuery,
        values: [args.courseCode, args.courseOffering, args.teachingAssistant],
        rowMode: "array"
    });
}

export const deleteTutorialGroupQuery = `-- name: DeleteTutorialGroup :exec
DELETE FROM TutorialGroups
WHERE course_code = $1 AND course_offering = $2 AND teaching_assistant = $3`;

export interface DeleteTutorialGroupArgs {
    courseCode: string;
    courseOffering: string;
    teachingAssistant: string;
}

export async function deleteTutorialGroup(client: Client, args: DeleteTutorialGroupArgs): Promise<void> {
    await client.query({
        text: deleteTutorialGroupQuery,
        values: [args.courseCode, args.courseOffering, args.teachingAssistant],
        rowMode: "array"
    });
}

