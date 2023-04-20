import myPrismaClient from "@/utils/myPrismaClient"
import { protectedProcedure } from "../middlewares/protectedProcedure"
import { router } from "../trpcServer"

export const userRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await myPrismaClient.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    })
    return user
  }),
})
