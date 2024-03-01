import { DayConfigOutput } from "../../../trpcServer/routers/diary/types/DayConfigOutput"
import { trpc } from "../../../utils/trpc/trpc"

export const useDayConfigQuery = () => {
  return trpc.diary.getOrCreateDayConfig.useQuery<DayConfigOutput>({
    date: new Date().toISOString().split("T")[0],
  })
}
