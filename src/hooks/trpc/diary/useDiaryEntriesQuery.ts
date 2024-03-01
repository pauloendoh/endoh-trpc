import { DiaryEntryOutput } from "../../../trpcServer/routers/diary/types/DiaryEntryOutput"
import { trpc } from "../../../utils/trpc/trpc"

export const useDiaryEntriesQuery = () => {
  return trpc.diary.myDiaryEntries.useQuery<DiaryEntryOutput[]>()
}
