import { DateTime } from "luxon"
import { useMemo } from "react"
import { useDiaryEntriesQuery } from "../../../../../hooks/trpc/diary/useDiaryEntriesQuery"

const useFilteredEntries = (selectedDate: string | null) => {
  const { data } = useDiaryEntriesQuery()

  const filteredLearnings = useMemo(
    () =>
      data
        ?.filter(
          (l) => DateTime.fromISO(l.datetime).toISODate() === selectedDate
        )
        .sort((a, b) => a.datetime.localeCompare(b.datetime)) || [],
    [data, selectedDate]
  )

  return filteredLearnings
}

export default useFilteredEntries
