import { create } from "zustand"
import { ClothingInput } from "../../../trpcServer/routers/clothing/types/ClothingInput"

interface IStore {
  isOpen: boolean
  initialValue: ClothingInput | null
  openModal: (initialValue: ClothingInput | null) => void
  closeModal: () => void
}

const useClothingModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: null,
  openModal: (initialValue: ClothingInput | null) => {
    set({ isOpen: true, initialValue })
  },
  closeModal: () => {
    set({ isOpen: false })
  },
}))

export default useClothingModalStore
