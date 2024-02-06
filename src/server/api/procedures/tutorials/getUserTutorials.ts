import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { getUserTutorials } from "~/server/db/sqlc/tutorial_members_sql";
import { pool } from "~/server/db/pool";

export const getUserTutorialsProcedure = protectedProcedure
  .input(
    z.object({
      offset: z.number().int().gte(0),
    }),
  )
  .query(async ({ ctx, input }) => {
    return getUserTutorials(pool, {
      studentId: ctx.session.user.id,
      offset: input.offset.toString(),
    });
  });
