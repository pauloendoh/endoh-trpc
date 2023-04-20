import { create } from "zustand"
import {
  buildInterestInput,
  InterestInput,
} from "../../../trpcServer/routers/interest/types/InterestInput"

interface IStore {
  isOpen: boolean
  initialValue: InterestInput
  openModal: (initialValue: InterestInput) => void
  closeModal: () => void
}

const useInterestModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: buildInterestInput(),
  openModal: (initialValue) => {
    set({ isOpen: true, initialValue })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useInterestModalStore
