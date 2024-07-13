import { create } from "zustand"
import { RecurrentItemInput } from "../../../trpcServer/routers/recurrent/types/RecurrentItemInput"

interface IStore {
  isOpen: boolean
  initialValue: RecurrentItemInput | null
  openModal: (initialValue: RecurrentItemInput | null) => void
  closeModal: () => void
}

const useRecurrentModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: null,
  openModal: (initialValue) => {
    set({ isOpen: true, initialValue })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useRecurrentModalStore
