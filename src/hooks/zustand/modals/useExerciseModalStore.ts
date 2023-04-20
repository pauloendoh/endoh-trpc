import { create } from "zustand"

interface IStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

const useExerciseModalStore = create<IStore>((set) => ({
  isOpen: false,
  openModal: () => {
    set({ isOpen: true })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useExerciseModalStore
