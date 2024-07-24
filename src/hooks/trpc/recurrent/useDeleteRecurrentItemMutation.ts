import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useDeleteRecurrentItemMutation = () => {
  const queryClient = useQueryClient()

  return trpc.recurrent.deleteRecurrentItem.useMutation({
    onSuccess: (saved, input) => {
      const queryKey = getQueryKey(
        trpc.recurrent.myRecurrentItems,
        undefined,
        "query"
      )

      queryClient.setQueryData<(typeof saved)[]>(queryKey, (curr) => {
        if (curr) {
          return curr.filter((item) => item.id !== input.id)
        }
      })

      myNotifications.success("Item deleted!")
    },
  })
}
