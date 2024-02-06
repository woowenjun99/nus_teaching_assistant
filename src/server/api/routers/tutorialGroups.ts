import { createTRPCRouter } from "~/server/api/trpc";
import { getUserTutorialsProcedure } from "../procedures/tutorialGroups/getUserTutorials";
import { getAllTutorialsProcedure } from "../procedures/admin/getAllTutorials";
import { createTutorialGroupProcedure } from "../procedures/admin/createTutorialGroup";

export const tutorialGroupsRouter = createTRPCRouter({
  createTutorialGroup: createTutorialGroupProcedure,
  getAllTutorials: getAllTutorialsProcedure,
  getUserTutorials: getUserTutorialsProcedure,
});
