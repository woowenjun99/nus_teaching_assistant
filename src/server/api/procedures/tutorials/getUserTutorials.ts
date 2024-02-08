import { protectedProcedure } from "../../trpc";
import { pool } from "~/server/db/pool";
import { getUserTutorialGroups } from "~/server/db/sqlc/tutorial_groups_sql";

export const getUserTutorialsProcedure = protectedProcedure.query(
  async ({ ctx }) => {
    return getUserTutorialGroups(pool, {
      studentId: ctx.session.user.id,
    });
  },
);
