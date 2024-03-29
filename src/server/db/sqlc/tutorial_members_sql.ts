import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const getUserTutorialsQuery = `-- name: GetUserTutorials :many
SELECT tm.course_code, tm.course_offering
FROM TutorialMembers as tm
LEFT JOIN TutorialGroups as t
ON tm.course_code = t.course_code AND tm.course_offering = t.course_offering
WHERE student_id = $1
ORDER BY tm.joined_at
LIMIT 10 OFFSET $2`;

export interface GetUserTutorialsArgs {
    studentId: string;
    offset: string;
}

export interface GetUserTutorialsRow {
    courseCode: string;
    courseOffering: string;
}

export async function getUserTutorials(client: Client, args: GetUserTutorialsArgs): Promise<GetUserTutorialsRow[]> {
    const result = await client.query({
        text: getUserTutorialsQuery,
        values: [args.studentId, args.offset],
        rowMode: "array"
    });
    return result.rows.map(row => {
        return {
            courseCode: row[0],
            courseOffering: row[1]
        };
    });
}

