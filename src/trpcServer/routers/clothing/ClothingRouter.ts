import { randomUUID } from "crypto"
import { z } from "zod"
import { protectedProcedure } from "../../middlewares/protectedProcedure"
import { router } from "../../trpcServer"
import { ClothingService } from "./ClothingService"
import { clothingInputSchema } from "./types/ClothingInput"
import { $FindClothingsByUser } from "./use-cases/$FindClothingsByUser"
import { $SaveClothing } from "./use-cases/$SaveClothing"

const service = new ClothingService()
const $findClothingsByUser = new $FindClothingsByUser()
const $saveClothing = new $SaveClothing()

export const ClothingRouter = router({
  myClothings: protectedProcedure.query(async ({ ctx }) => {
    return $findClothingsByUser.exec(ctx.session.user.id)
  }),
  saveClothing: protectedProcedure
    .input(clothingInputSchema)
    .mutation(async ({ ctx, input }) => {
      const clothing = await $saveClothing.exec({
        requesterId: ctx.session.user.id,
        input,
      })
      return clothing
    }),
  createPresignedUrl: protectedProcedure
    .input(
      z.object({
        extension: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const url = await service.createPresignedUrl({
        userId: ctx.session.user.id,
        extension: input.extension,
        uuid: randomUUID(),
      })
      return url
    }),
})
