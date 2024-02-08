import { getAllTutorialGroups } from "~/server/db/sqlc/tutorial_groups_sql";
import { protectedProcedure } from "../../trpc";
import { pool } from "~/server/db/pool";

export const getAllTutorialsProcedure = protectedProcedure.query(() =>
  getAllTutorialGroups(pool),
);
