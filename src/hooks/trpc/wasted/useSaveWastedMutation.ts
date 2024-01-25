import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { pushOrReplace } from "endoh-utils"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useSaveWastedMutation = () => {
  const queryClient = useQueryClient()

  return trpc.wasted.saveWasted.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(trpc.wasted.myWasteds, undefined, "query")

      queryClient.setQueryData<(typeof saved)[]>(queryKey, (curr) =>
        pushOrReplace(curr, saved, "id")
      )

      queryClient.refetchQueries(
        getQueryKey(trpc.wasted.extraWastedLast30Days, undefined, "query")
      )

      myNotifications.success("Wasted saved")
    },
  })
}
