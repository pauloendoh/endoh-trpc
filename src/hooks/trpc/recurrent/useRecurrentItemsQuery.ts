import { RecurrentItemOutput } from "../../../trpcServer/routers/recurrent/types/RecurrentItemOutput"
import { trpc } from "../../../utils/trpc/trpc"

export const useRecurrentItemsQuery = () => {
  return trpc.recurrent.myRecurrentItems.useQuery<RecurrentItemOutput[]>()
}
