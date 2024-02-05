import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getAllTutorialsQuery = `-- name: GetAllTutorials :many
SELECT course_code, course_offering, is_over, start_date, tutorial_group, teaching_assistant FROM Tutorials
ORDER BY start_date
LIMIT 10 OFFSET $1`;

export interface GetAllTutorialsArgs {
    offset: string;
}

export interface GetAllTutorialsRow {
    courseCode: string;
    courseOffering: string;
    isOver: boolean;
    startDate: Date;
    tutorialGroup: string;
    teachingAssistant: string;
}

export async function getAllTutorials(client: Client, args: GetAllTutorialsArgs): Promise<GetAllTutorialsRow[]> {
    const result = await client.query({
        text: getAllTutorialsQuery,
        values: [args.offset],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            courseCode: row[0],
            courseOffering: row[1],
            isOver: row[2],
            startDate: row[3],
            tutorialGroup: row[4],
            teachingAssistant: row[5]
        };
    });
}
