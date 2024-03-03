import { create } from "zustand"

interface IStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const useDiaryConfigModalStore = create<IStore>((set) => ({
  isOpen: false,
  openModal: () => {
    set({ isOpen: true })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useDiaryConfigModalStore
