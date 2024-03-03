import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"
import { useDayConfigQuery } from "./useDayConfigQuery"

export const useUpdateDayConfigMutation = () => {
  const { refetch } = useDayConfigQuery()

  return trpc.diary.updateDayConfig.useMutation({
    onSuccess: async (saved, input) => {
      refetch()

      myNotifications.success("Config saved!")
    },
  })
}
