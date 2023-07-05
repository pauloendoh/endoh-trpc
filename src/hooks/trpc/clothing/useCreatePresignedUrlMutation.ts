import { trpc } from "../../../utils/trpc/trpc"

export const useCreatePresignedUrlMutation = () => {
  return trpc.clothing.createPresignedUrl.useMutation({
    onSuccess: async (url, input) => {},
  })
}
