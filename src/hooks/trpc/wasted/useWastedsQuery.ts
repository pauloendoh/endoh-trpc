import { WastedOutput } from "../../../trpcServer/routers/wasted/types/WastedOutput"
import { trpc } from "../../../utils/trpc/trpc"

export const useWastedsQuery = () => {
  return trpc.wasted.myWasteds.useQuery<WastedOutput[]>()
}
