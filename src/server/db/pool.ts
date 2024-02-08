import { Pool } from "pg";
import { env } from "~/env";

export const pool = new Pool({
  connectionString: env.DATABASE_URL,
});

/**
 * Used to perform transactions in the database
 *
 * @param callback The series of actions to perform in the transaction.
 */
export const withTransaction = async (callback: (p: Pool) => Promise<unknown>) => {
  try {
    await pool.query("BEGIN");
    await callback(pool);
    await pool.query("COMMIT");
  } catch (e) {
    await pool.query("ROLLBACK");
  }
};
