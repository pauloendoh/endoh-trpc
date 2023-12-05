import { create } from "zustand"

interface IStore {
  isOpen: boolean
  initialValue: Date | null
  openModal: (initialValue: Date | null) => void
  closeModal: () => void
}

const useDailyIndulgencesModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: null,
  openModal: (initialValue: Date | null) => {
    set({ isOpen: true, initialValue })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useDailyIndulgencesModalStore
