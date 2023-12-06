import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"

export const useUpdateIndulgenceSettingsMutation = () => {
  const queryClient = useQueryClient()

  return trpc.indulgence.updateIndulgenceSettings.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(
        trpc.indulgence.indulgenceSettings,
        undefined,
        "query"
      )

      queryClient.setQueryData(queryKey, saved)

      myNotifications.success("Indulgence settings saved!")
    },
  })
}
