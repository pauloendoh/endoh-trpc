import { create } from "zustand"

interface IStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const useIdeaModalStore = create<IStore>((set) => ({
  isOpen: false,
  openModal: () => {
    set({ isOpen: true })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useIdeaModalStore
