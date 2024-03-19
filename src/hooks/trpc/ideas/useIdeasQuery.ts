import { trpc } from "../../../utils/trpc/trpc"

export const useIdeasQuery = () => {
  return trpc.idea.myIdeas.useQuery()
}
