import { IndulgenceSettingsOutput } from "../../../trpcServer/routers/indulgence/types/IndulgenceOutput"
import { trpc } from "../../../utils/trpc/trpc"

export const useIndulgenceSettingsQuery = () => {
  return trpc.indulgence.indulgenceSettings.useQuery<IndulgenceSettingsOutput>()
}
