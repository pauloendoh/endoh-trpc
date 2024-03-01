import { create } from "zustand"
import {
  buildRecurrentEntryInput,
  RecurrentEntryInput,
} from "../../../trpcServer/routers/diary/types/RecurrentEntryInput"

interface IStore {
  isOpen: boolean
  initialValue: RecurrentEntryInput
  openModal: (
    initialValue: RecurrentEntryInput,
    options?: {
      onSuccess?: (saved: RecurrentEntryInput) => void
    }
  ) => void
  onSuccess?: (saved: RecurrentEntryInput) => void
  closeModal: () => void
}

const useRecurrentEntryModalStore = create<IStore>((set, get) => ({
  isOpen: false,
  initialValue: buildRecurrentEntryInput(),
  openModal: (initialValue: RecurrentEntryInput, options) =>
    set({
      isOpen: true,
      initialValue,
      onSuccess: options?.onSuccess,
    }),
  closeModal: () => {
    set({ isOpen: false })
  },
  onSuccess: undefined,
}))

export default useRecurrentEntryModalStore
