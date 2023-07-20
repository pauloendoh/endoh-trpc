import { protectedProcedure } from "../../middlewares/protectedProcedure";
import { router } from "../../trpcServer";
import { FavoriteService } from "./FavoriteService";
import { favoriteInputSchema } from "./types/FavoriteInput";

const service = new FavoriteService();

export const favoriteRouter = router({
  myFavorites: protectedProcedure.query(async ({ ctx }) => {
    const data = await service.findFavoritesByUserId(ctx.session.user.id);
    return data;
  }),

  saveFavorite: protectedProcedure
    .input(favoriteInputSchema)
    .mutation(async ({ ctx, input }) => {
      const data = await service.saveFavorite(ctx.session.user.id, input);
      return data;
    }),
});
