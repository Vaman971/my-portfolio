// src/lib/auth.ts
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
callbacks: {
  async signIn({ user, account }: { user: any; account: any}) {
    return true; // allow for now
  },

  async session({ session }: { session: any }) {
    // If session.user.email is not set, return the session as is
    if (!session?.user?.email) return session;

    // Fetch fresh user data from DB
    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (dbUser) {
      session.user.id = dbUser.id;
      session.user.role = dbUser.role;
    }
    return session;
  },
},
    pages: {
    signIn: "/signin", // custom admin sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
