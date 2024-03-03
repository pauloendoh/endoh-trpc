import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useUpdateGlobalConfigMutation = () => {
  const queryClient = useQueryClient()

  return trpc.diary.updateGlobalConfig.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(
        trpc.diary.getOrCreateGlobalConfig,
        undefined,
        "query"
      )

      queryClient.setQueryData(queryKey, saved)

      myNotifications.success("Config saved!")
    },
  })
}
