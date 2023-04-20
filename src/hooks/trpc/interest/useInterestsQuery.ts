import { trpc } from "../../../utils/trpc/trpc"

export const useInterestsQuery = () => {
  return trpc.interest.myInterests.useQuery(undefined, {
    enabled: true,
  })
}
