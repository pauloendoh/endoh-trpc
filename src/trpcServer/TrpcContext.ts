import * as trpc from "@trpc/server"
import * as trpcNext from "@trpc/server/adapters/next"
import myPrismaClient from "../utils/myPrismaClient"
import { getServerAuthSession } from "./common/getServerAuthSession"

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx
  const session = await getServerAuthSession({ req, res })

  return {
    req,
    res,
    session,
    prisma: myPrismaClient,
  }
}

export type TrpcContext = trpc.inferAsyncReturnType<typeof createContext>
