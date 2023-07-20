import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { pushOrReplace } from "endoh-utils"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useSaveFavoriteMutation = () => {
  const queryClient = useQueryClient()

  return trpc.favorite.saveFavorite.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(
        trpc.favorite.myFavorites,
        undefined,
        "query"
      )

      queryClient.setQueryData<(typeof saved)[]>(queryKey, (curr) =>
        pushOrReplace(curr, saved, "id")
      )

      myNotifications.success("Favorite saved")
    },
  })
}
