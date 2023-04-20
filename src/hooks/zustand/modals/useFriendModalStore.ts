import { create } from "zustand"
import {
  buildFriendInput,
  FriendInput,
} from "../../../trpcServer/routers/friend/types/FriendInput"

interface IStore {
  isOpen: boolean
  initialValue: FriendInput
  openModal: (initialValue: FriendInput) => void
  closeModal: () => void
}

const useFriendModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: buildFriendInput(),
  openModal: (initialValue) => {
    set({ isOpen: true, initialValue })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useFriendModalStore
