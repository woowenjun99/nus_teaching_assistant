import { createTRPCRouter } from "~/server/api/trpc";
import { tutorialGroupsRouter } from "./routers/tutorialGroups";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  tutorialGroups: tutorialGroupsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
