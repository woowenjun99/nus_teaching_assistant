import { getAllTutorials } from "~/server/db/sqlc/tutorials_sql";
import { protectedProcedure } from "../../trpc";
import { pool } from "~/server/db/pool";
import { z } from "zod";

export const getAllTutorialsProcedure = protectedProcedure
  .input(z.object({ offset: z.number().int().gte(0) }))
  .query(({ input }) => {
    return getAllTutorials(pool, {
      offset: input.offset.toString(),
    });
  });
