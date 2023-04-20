import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { pushOrReplace } from "endoh-utils"
import { trpc } from "../../../utils/trpc/trpc"
import { useMyNotifications } from "../../useMyNotifications"

export const useSaveExerciseMutation = () => {
  const queryClient = useQueryClient()
  const key = getQueryKey(trpc.exercise.myExercises, undefined, "query")

  const { setSuccessMessage, setErrorMessage } = useMyNotifications()

  return trpc.exercise.saveExercise.useMutation({
    onSuccess: async (saved) => {
      queryClient.setQueryData<typeof saved[]>(key, (curr) =>
        pushOrReplace(curr, saved, "id")
      )

      setSuccessMessage("Exercise saved")
    },
    onError: (err) => {
      const fieldErrors = err.data?.zodError?.fieldErrors || {}

      Object.entries(fieldErrors).forEach((entry) => {
        const [field, messages] = entry
        setErrorMessage(`${messages?.[0]}`)
      })
    },
  })
}
