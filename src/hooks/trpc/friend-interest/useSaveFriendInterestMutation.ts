import { useQueryClient } from "@tanstack/react-query"
import { trpc } from "../../../utils/trpc/trpc"
import { useMyNotifications } from "../../useMyNotifications"

export const useSaveFriendInterestMutation = () => {
  const queryClient = useQueryClient()

  const { setSuccessMessage } = useMyNotifications()

  return trpc.friendInterest.saveFriendInterest.useMutation({
    onSuccess: async (saved, input) => {},
  })
}
