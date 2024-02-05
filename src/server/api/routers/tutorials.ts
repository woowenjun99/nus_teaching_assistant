import { createTRPCRouter } from "~/server/api/trpc";
import { getUserTutorialsProcedure } from "../procedures/tutorials/getUserTutorials";
import { getAllTutorialsProcedure } from "../procedures/admin/getAllTutorials";

export const tutorialRouter = createTRPCRouter({
  getAllTutorials: getAllTutorialsProcedure,
  getUserTutorials: getUserTutorialsProcedure,
});
