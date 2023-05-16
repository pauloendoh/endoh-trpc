import { create } from "zustand"
import { ExerciseInput } from "../../../trpcServer/routers/exercise/types/ExerciseInput"

interface IStore {
  isOpen: boolean
  initialValue: ExerciseInput | null
  openModal: (initialValue: ExerciseInput | null) => void
  closeModal: () => void
}

const useExerciseModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: null,
  openModal: (initialValue: ExerciseInput | null) => {
    set({ isOpen: true, initialValue })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useExerciseModalStore
