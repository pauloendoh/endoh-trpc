import { trpc } from "../../../utils/trpc/trpc"

export const useFriendsQuery = () => {
  return trpc.friend.myFriends.useQuery(undefined, {
    enabled: true,
  })
}
