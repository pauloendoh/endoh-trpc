import { DateTime } from "luxon"
import { create } from "zustand"

interface IStore {
  selectedDate: string | null
  setSelectedDate: (newValue: string) => void
}

const useDiaryStore = create<IStore>((set, get) => ({
  selectedDate: DateTime.now().toISODate(),
  setSelectedDate: (newValue) => {
    set({ selectedDate: newValue })
  },
}))

export default useDiaryStore
