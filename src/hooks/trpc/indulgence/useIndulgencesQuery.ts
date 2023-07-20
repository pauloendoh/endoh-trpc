import { IndulgenceOutput } from "../../../trpcServer/routers/indulgence/types/IndulgenceOutput"
import { trpc } from "../../../utils/trpc/trpc"

export const useIndulgencesQuery = () => {
  return trpc.indulgence.myIndulgences.useQuery<IndulgenceOutput[]>()
}
