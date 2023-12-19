import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useDeleteMeetingItemMutation = () => {
  const queryClient = useQueryClient()

  return trpc.meeting.deleteMeetingItem.useMutation({
    onSuccess: async (deleted, input) => {
      const queryKey = getQueryKey(trpc.meeting.myItems, undefined, "query")

      queryClient.setQueryData<(typeof deleted)[]>(queryKey, (curr) => {
        if (curr) {
          return curr.filter((item) => item.id !== input.id)
        }
      })

      myNotifications.success("Item deleted!")
    },
  })
}
