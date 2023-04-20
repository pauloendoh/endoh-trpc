import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { pushOrReplace } from "endoh-utils"
import { trpc } from "../../../utils/trpc/trpc"
import { useMyNotifications } from "../../useMyNotifications"

export const useSaveFriendMutation = () => {
  const queryClient = useQueryClient()

  const { setSuccessMessage } = useMyNotifications()

  return trpc.friend.saveFriend.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(trpc.friend.myFriends, undefined, "query")

      queryClient.setQueryData<typeof saved[]>(queryKey, (curr) =>
        pushOrReplace(curr, saved, "id")
      )

      setSuccessMessage("Friend saved")
    },
  })
}
