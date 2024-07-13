import { useQueryClient } from "@tanstack/react-query"
import { getQueryKey } from "@trpc/react-query"
import { pushOrReplace } from "endoh-utils"
import Span from "../../../components/_common/text/Span"
import { myNotifications } from "../../../utils/mantine/myNotifications"
import { trpc } from "../../../utils/trpc/trpc"
import useRecurrentModalStore from "../../zustand/modals/useRecurrentModalStore"

export const useSaveRecurrentItemMutation = () => {
  const queryClient = useQueryClient()
  const { openModal } = useRecurrentModalStore()
  return trpc.recurrent.saveRecurrentItem.useMutation({
    onSuccess: async (saved, input) => {
      const queryKey = getQueryKey(
        trpc.recurrent.myRecurrentItems,
        undefined,
        "query"
      )

      queryClient.setQueryData<(typeof saved)[]>(queryKey, (curr) =>
        pushOrReplace(curr, saved, "id")
      )

      myNotifications.success(
        <Span>
          Item saved!
          <Span
            c="primary"
            style={{
              cursor: "pointer",
              marginLeft: 8,
              textDecoration: "underline",
            }}
            onClick={() => {
              openModal(saved)
            }}
          >
            Open item
          </Span>
        </Span>
      )
    },
  })
}
