import { createTRPCRouter } from "~/server/api/trpc";
import { getUserTutorialsProcedure } from "../procedures/users/getUserTutorials";
import { createTutorialGroupProcedure } from "../procedures/admin/createTutorialGroup";
import { deleteTutorialGroupProcedure } from "../procedures/admin/deleteTutorialGroup";

export const tutorialGroupsRouter = createTRPCRouter({
  createTutorialGroup: createTutorialGroupProcedure,
  deleteTutorialGroup: deleteTutorialGroupProcedure,
  getUserTutorials: getUserTutorialsProcedure,
});
