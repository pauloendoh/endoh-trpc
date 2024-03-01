import { DayConfigOutput } from "../../../trpcServer/routers/diary/types/DayConfigOutput"
import { trpc } from "../../../utils/trpc/trpc"

export const useGlobalConfigQuery = () => {
  return trpc.diary.getOrCreateGlobalConfig.useQuery<DayConfigOutput>()
}
