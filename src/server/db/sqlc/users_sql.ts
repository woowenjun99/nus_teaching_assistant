import { QueryArrayConfig, QueryArrayResult } from "pg";

interface Client {
    query: (config: QueryArrayConfig) => Promise<QueryArrayResult>;
}

export const createUserQuery = `-- name: CreateUser :exec
INSERT INTO Users(id) 
VALUES ($1)`;

export interface CreateUserArgs {
    id: string;
}

export async function createUser(client: Client, args: CreateUserArgs): Promise<void> {
    await client.query({
        text: createUserQuery,
        values: [args.id],
        rowMode: "array"
    });
}

export const getUserQuery = `-- name: GetUser :one
SELECT created_at, email, full_name, is_admin, id FROM Users WHERE id=$1 LIMIT 1 OFFSET 0`;

export interface GetUserArgs {
    id: string;
}

export interface GetUserRow {
    createdAt: Date;
    email: string | null;
    fullName: string | null;
    isAdmin: boolean;
    id: string;
}

export async function getUser(client: Client, args: GetUserArgs): Promise<GetUserRow | null> {
    const result = await client.query({
        text: getUserQuery,
        values: [args.id],
        rowMode: "array"
    });
    if (result.rows.length !== 1) {
        return null;
    }
    const row = result.rows[0];
    return {
        createdAt: row[0],
        email: row[1],
        fullName: row[2],
        isAdmin: row[3],
        id: row[4]
    };
}

