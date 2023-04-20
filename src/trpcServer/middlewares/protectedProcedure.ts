import { TRPCError } from "@trpc/server"
import trpcServer from "../trpcServer"

const isAuthed = trpcServer.middleware(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

export const protectedProcedure = trpcServer.procedure.use(isAuthed)
