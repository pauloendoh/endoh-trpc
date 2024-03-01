import { WastedOutput } from "../../../trpcServer/routers/wasted/types/WastedOutput"
import { trpc } from "../../../utils/trpc/trpc"

export const useRecurrentEntriesQuery = () => {
  return trpc.diary.myRecurrentEntries.useQuery<WastedOutput[]>()
}
