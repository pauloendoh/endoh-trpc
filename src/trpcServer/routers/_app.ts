import { z } from "zod"
import { procedure, router } from "../trpcServer"
import { userRouter } from "./userRouter"
export const appRouter = router({
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      }
    }),
  user: userRouter,
})
// export type definition of API
export type AppRouter = typeof appRouter
