import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { UserService } from "./UserService"
import { userInputSchema } from "./types/UserInput"

const service = new UserService()

export const UserRouter = router({
  myUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await service.findUsers(ctx.session.user.id)
    return users
  }),
  saveUser: protectedProcedure
    .input(userInputSchema)
    .mutation(async ({ ctx, input }) => {
      const user = await service.saveUser(ctx.session.user.id, input)
      return user
    }),
})
