import { deleteTutorialGroup } from "~/server/db/sqlc/tutorial_groups_sql";
import { withTransaction } from "~/server/db/pool";
import { protectedProcedure } from "../../trpc";
import { z } from "zod";
import { getUser } from "~/server/db/sqlc/users_sql";

export const deleteTutorialGroupProcedure = protectedProcedure
  .input(
    z.object({
      courseCode: z.string(),
      courseOffering: z.string(),
      teachingAssistant: z.string(),
    }),
  )
  .mutation(({ ctx, input }) =>
    withTransaction(async (pool) => {
      const user = await getUser(pool, { id: ctx.session.user.id });
      if (!user || !user.isAdmin) {
        throw Error("No permission to delete tutorial");
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await deleteTutorialGroup(pool, {
        courseCode: input.courseCode,
        courseOffering: input.courseOffering,
        teachingAssistant: input.teachingAssistant,
      });
    }),
  );
