import { create } from "zustand"
import { IndulgenceInput } from "../../../trpcServer/routers/indulgence/types/IndulgenceInput"

interface IStore {
  isOpen: boolean
  initialValue: IndulgenceInput | null
  openModal: (initialValue: IndulgenceInput | null) => void
  closeModal: () => void
}

const useIndulgenceModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: null,
  openModal: (initialValue: IndulgenceInput | null) => {
    set({ isOpen: true, initialValue })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useIndulgenceModalStore
