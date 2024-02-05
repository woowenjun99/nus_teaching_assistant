import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env";
import { createUser, getUser } from "./db/sqlc/users_sql";
import { pool } from "./db/pool";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isAdmin: boolean;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  // ...other properties
  // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    signIn: async ({ user }) => {
      // Explicitly create a callback function here so that we can save the user
      // in the database when he first login
      const foundUser = await getUser(pool, { id: user.id });
      if (!foundUser) await createUser(pool, { id: user.id });
      return true;
    },
    session: async ({ session, token }) => {
      // Used to get the information about whether the user is admin
      if (session.user.isAdmin === undefined && token.sub) {
        const foundUser = await getUser(pool, { id: token.sub });
        session.user.isAdmin = foundUser ? foundUser.isAdmin : false;
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
