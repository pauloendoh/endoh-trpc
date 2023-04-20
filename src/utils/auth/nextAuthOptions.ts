import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import myPrismaClient from "../myPrismaClient"

const prisma = myPrismaClient

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: String(process.env.GITHUB_ID),
      clientSecret: String(process.env.GITHUB_SECRET),
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session({ session, token, user }) {
      return { ...session, user: { ...session.user, id: user.id } }
    },
  },

  secret: process.env.SECRET,
}
