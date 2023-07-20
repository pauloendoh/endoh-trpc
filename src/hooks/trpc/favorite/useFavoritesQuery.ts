import { FavoriteOutput } from "../../../trpcServer/routers/favorite/types/FavoriteOutput"
import { trpc } from "../../../utils/trpc/trpc"

export const useFavoritesQuery = () => {
  return trpc.favorite.myFavorites.useQuery<FavoriteOutput[]>()
}
