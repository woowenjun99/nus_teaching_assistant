import { createTRPCRouter } from "~/server/api/trpc";
import { getUserTutorialsProcedure } from "../procedures/tutorials/getUserTutorials";
import { getAllTutorialsProcedure } from "../procedures/admin/getAllTutorials";
import { createTutorialGroupProcedure } from "../procedures/admin/createTutorialGroup";
import { deleteTutorialGroupProcedure } from "../procedures/admin/deleteTutorialGroup";

export const tutorialGroupsRouter = createTRPCRouter({
  createTutorialGroup: createTutorialGroupProcedure,
  deleteTutorialGroup: deleteTutorialGroupProcedure,
  getAllTutorials: getAllTutorialsProcedure,
  getUserTutorials: getUserTutorialsProcedure,
});
