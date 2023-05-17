import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { pushOrReplace } from "endoh-utils"
import { trpc } from "../../../../utils/trpc/trpc"
import { useMyNotifications } from "../../../useMyNotifications"

export const useSaveTagMutation = () => {
  const queryClient = useQueryClient()

  const { setSuccessMessage } = useMyNotifications()

  return trpc.exercise.saveTag.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(trpc.exercise.findTags, undefined, "query")

      queryClient.setQueryData<(typeof saved)[]>(queryKey, (curr) =>
        pushOrReplace(curr, saved, "id")
      )

      setSuccessMessage("Tag saved")
    },
  })
}
