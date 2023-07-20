import { create } from "zustand"
import { WastedInput } from "../../../trpcServer/routers/wasted/types/WastedInput"

interface IStore {
  isOpen: boolean
  initialValue: WastedInput | null
  openDialog: (initialValue: WastedInput | null) => void
  closeDialog: () => void
}

const useWastedModalStore = create<IStore>((set) => ({
  isOpen: false,
  initialValue: null,
  openDialog: (initialValue: WastedInput | null) => {
    set({ isOpen: true, initialValue })
  },
  closeDialog: () => {
    set({ isOpen: false })
  },
}))

export default useWastedModalStore
