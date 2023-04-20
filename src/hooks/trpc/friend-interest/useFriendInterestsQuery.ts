import { trpc } from "../../../utils/trpc/trpc"

export const useFriendInterestsQuery = (
  param: Parameters<typeof trpc.friendInterest.findByFriend.useQuery>[0]
) => {
  return trpc.friendInterest.findByFriend.useQuery(param, {
    enabled: true,
  })
}
