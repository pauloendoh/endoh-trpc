import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { deleteFromArray } from "endoh-utils"
import { RecurrentEntryOutput } from "../../../trpcServer/routers/diary/types/RecurrentEntryOutput"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useDeleteRecurrentEntryMutation = () => {
  const queryClient = useQueryClient()

  return trpc.diary.deleteRecurrentEntry.useMutation({
    onSuccess: async (_, inputId) => {
      const queryKey = getQueryKey(
        trpc.diary.myRecurrentEntries,
        undefined,
        "query"
      )

      queryClient.setQueryData<RecurrentEntryOutput[]>(queryKey, (curr) => {
        if (!curr) return curr
        return deleteFromArray(curr, (item) => item.id === inputId)
      })

      myNotifications.success("Recurrent entry deleted!")
    },
  })
}
