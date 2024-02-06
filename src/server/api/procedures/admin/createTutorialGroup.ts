import { z } from "zod";
import { protectedProcedure } from "../../trpc";
import { createTutorialGroup } from "~/server/db/sqlc/tutorial_groups_sql";
import { withTransaction } from "~/server/db/pool";
import { getUser } from "~/server/db/sqlc/users_sql";

export const createTutorialGroupProcedure = protectedProcedure
  .input(
    z.object({
      courseCode: z.string(),
      courseOffering: z.string(),
      tutorialGroup: z.string(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    // Verify if the user has permission to create the tutorial group
    await withTransaction(async (pool) => {
      const foundUser = await getUser(pool, { id: ctx.session.user.id });

      if (!foundUser || !foundUser.isAdmin) {
        throw Error("No permission to create tutorial");
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await createTutorialGroup(pool, {
        courseCode: input.courseCode,
        courseOffering: input.courseOffering,
        tutorialGroup: input.tutorialGroup,
        teachingAssistant: ctx.session.user.id,
      });
    });
  });
