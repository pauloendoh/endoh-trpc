import { trpc } from "../../../utils/trpc/trpc"

export const useSaveFriendInterestMutation = () => {
  return trpc.friendInterest.saveFriendInterest.useMutation({
    onSuccess: async (saved, input) => {},
  })
}
