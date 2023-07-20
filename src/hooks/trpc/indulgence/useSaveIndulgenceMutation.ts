import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { pushOrReplace } from "endoh-utils"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useSaveIndulgenceMutation = () => {
  const queryClient = useQueryClient()

  return trpc.indulgence.saveIndulgence.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(
        trpc.indulgence.myIndulgences,
        undefined,
        "query"
      )

      queryClient.setQueryData<(typeof saved)[]>(queryKey, (curr) =>
        pushOrReplace(curr, saved, "id")
      )

      myNotifications.success("Indulgence saved!")
    },
  })
}
