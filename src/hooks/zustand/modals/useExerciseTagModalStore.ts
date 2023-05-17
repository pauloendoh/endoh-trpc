import { create } from "zustand"
import {
  buildTagInput,
  TagInput,
} from "../../../trpcServer/routers/exercise/types/TagInput"

interface IStore {
  isOpen: boolean
  initialValue: TagInput
  openModal: (initialValue: TagInput) => void
  closeModal: () => void
}

const useExerciseTagModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: buildTagInput(),
  openModal: (initialValue) => {
    set({ isOpen: true, initialValue })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useExerciseTagModalStore
