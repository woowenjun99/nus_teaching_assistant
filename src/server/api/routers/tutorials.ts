import { createTRPCRouter } from "~/server/api/trpc";
import { getUserTutorialsProcedure } from "../procedures/tutorials/getUserTutorials";

export const tutorialRouter = createTRPCRouter({
  getUserTutorials: getUserTutorialsProcedure,
});
