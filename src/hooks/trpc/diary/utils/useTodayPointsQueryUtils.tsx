import { useMemo } from "react"
import useFilteredEntries from "../../../../components/diary/DiaryPage/DiaryTable/useFilteredEntries/useFilteredEntries"
import useDiaryStore from "../../../zustand/domains/diary/useDiaryStore"
import { useDayConfigQuery } from "../useDayConfigQuery"

export const useTodayPointsQueryUtils = () => {
  const { selectedDate } = useDiaryStore()
  const { data: dayConfig } = useDayConfigQuery()

  const filteredEntries = useFilteredEntries(selectedDate)

  const todayPoints = useMemo(() => {
    return filteredEntries.reduce((acc, entry) => acc + entry.points, 0)
  }, [filteredEntries])

  const todayGoal = useMemo(() => {
    if (!dayConfig) {
      return 0
    }
    return dayConfig.pointsPerHour * dayConfig.availableHours
  }, [dayConfig])

  return { todayPoints, todayGoal }
}
