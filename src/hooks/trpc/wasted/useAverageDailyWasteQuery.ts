import { trpc } from "../../../utils/trpc/trpc"

export const useAverageDailyWasteQuery = () => {
  return trpc.wasted.averageDailyWaste.useQuery<number>()
}
