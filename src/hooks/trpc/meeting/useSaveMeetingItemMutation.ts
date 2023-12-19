import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { pushOrReplace } from "endoh-utils"
import { trpc } from "../../../utils/trpc/trpc"

export const useSaveMeetingItemMutation = () => {
  const queryClient = useQueryClient()

  return trpc.meeting.saveMeetingItem.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(trpc.meeting.myItems, undefined, "query")

      queryClient.setQueryData<(typeof saved)[]>(queryKey, (curr) =>
        pushOrReplace(curr, saved, "id")
      )
    },
  })
}
