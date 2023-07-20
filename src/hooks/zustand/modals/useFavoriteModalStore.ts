import { create } from "zustand"
import { FavoriteInput } from "../../../trpcServer/routers/favorite/types/FavoriteInput"

interface IStore {
  isOpen: boolean
  initialValue: FavoriteInput | null
  openDialog: (initialValue: FavoriteInput | null) => void
  closeDialog: () => void
}

const useFavoriteModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: null,
  openDialog: (initialValue: FavoriteInput | null) => {
    set({ isOpen: true, initialValue })
  },
  closeDialog: () => {
    set({ isOpen: false })
  },
}))

export default useFavoriteModalStore
