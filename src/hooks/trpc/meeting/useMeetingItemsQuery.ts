import { MeetingItemOutput } from "../../../trpcServer/routers/meeting/types/MeetingOutput"
import { trpc } from "../../../utils/trpc/trpc"

export const useMeetingItemsQuery = () => {
  return trpc.meeting.myItems.useQuery<[MeetingItemOutput]>()
}
