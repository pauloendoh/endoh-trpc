import { create } from "zustand"
import {
  buildIdeaInput,
  IdeaInput,
} from "../../../trpcServer/routers/diary copy/types/IdeaInput"

interface IStore {
  isOpen: boolean
  initialValue: IdeaInput
  openModal: (initialValue: IdeaInput) => void
  closeModal: () => void
}

const useIdeaModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: buildIdeaInput(),
  openModal: (initialValue: IdeaInput) => {
    set({ isOpen: true, initialValue })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useIdeaModalStore
