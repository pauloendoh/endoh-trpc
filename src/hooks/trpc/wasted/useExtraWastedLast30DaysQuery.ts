import { trpc } from "../../../utils/trpc/trpc"

export const useExtraWastedLast30DaysQuery = () => {
  return trpc.wasted.extraWastedLast30Days.useQuery<number>()
}
