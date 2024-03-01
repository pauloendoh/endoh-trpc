import { create } from "zustand"
import {
  buildDiaryEntryInput,
  DiaryEntryInput,
} from "../../../trpcServer/routers/diary/types/DiaryEntryInput"

interface IStore {
  isOpen: boolean
  initialValue: DiaryEntryInput
  openModal: (initialValue: DiaryEntryInput) => void
  closeModal: () => void
}

const useEntryModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: buildDiaryEntryInput(),
  openModal: (initialValue) => {
    set({ isOpen: true, initialValue })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useEntryModalStore
