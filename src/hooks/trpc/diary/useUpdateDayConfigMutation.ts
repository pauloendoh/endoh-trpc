import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useUpdateDayConfigMutation = () => {
  const queryClient = useQueryClient()

  return trpc.diary.updateDayConfig.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(
        trpc.diary.getOrCreateDayConfig,
        undefined,
        "query"
      )

      queryClient.setQueryData(queryKey, saved)

      myNotifications.success("Config saved!")
    },
  })
}
