import { Progress } from "@mantine/core"
import { useMemo } from "react"
import { useIndulgenceSettingsQuery } from "../../../hooks/trpc/indulgence/useIndulgenceSettingsQuery"
import { useIndulgencesQuery } from "../../../hooks/trpc/indulgence/useIndulgencesQuery"
import FlexCol from "../../_common/flexboxes/FlexCol"
import Span from "../../_common/text/Span"

type Props = {}

const IndulgenceProgress = ({ ...props }: Props) => {
  const { data: settings } = useIndulgenceSettingsQuery()
  const { data: myIndulgences } = useIndulgencesQuery()

  const totalPoints = useMemo(() => {
    if (!myIndulgences || !settings) return 0

    let lastResetDay = new Date()

    for (let i = 0; i < 7; i++) {
      const day = new Date()
      day.setDate(day.getDate() - i)

      if (day.getDay() === settings.resetsOnDay) {
        day.setHours(0, 0, 0, 0)
        lastResetDay = day
        break
      }
    }

    const indulgencesFromDay = myIndulgences.filter((indulgence) => {
      const indulgenceDate = new Date(indulgence.date)
      return indulgenceDate.getTime() >= lastResetDay.getTime()
    })

    return indulgencesFromDay.reduce((acc, indulgence) => {
      return acc + indulgence.points
    }, 0)
  }, [myIndulgences, settings?.resetsOnDay])

  const percentage = useMemo(() => {
    if (!settings) return 0

    return (totalPoints / settings.maxPointsPerWeek) * 100
  }, [settings, totalPoints])

  const resetsInNDaysLabel = useMemo(() => {
    if (!settings) return ""

    debugger
    const today = new Date().getDay()
    const resetsInNDays =
      today > settings.resetsOnDay
        ? 7 - Math.abs(settings.resetsOnDay - today)
        : Math.abs(settings.resetsOnDay - today)

    if (resetsInNDays === 0) return "resets today"
    if (resetsInNDays === 1) return "resets tomorrow"
    if (resetsInNDays === 2) return "resets in 2 days"
    if (resetsInNDays === 3) return "resets in 3 days"
    if (resetsInNDays === 4) return "resets in 4 days"
    if (resetsInNDays === 5) return "resets in 5 days"
    if (resetsInNDays === 6) return "resets in 6 days"

    return ""
  }, [settings?.resetsOnDay])

  const color = useMemo(() => {
    if (percentage >= 100) return "red"
    if (percentage >= 80) return "orange"
    if (percentage >= 60) return "yellow"
    if (percentage >= 40) return "lime"
    if (percentage >= 20) return "green"
    return "cyan"
  }, [percentage])

  return (
    <FlexCol className="IndulgenceProgress">
      <Progress
        w="240px"
        color={color}
        value={percentage}
        label={`${totalPoints.toFixed(1)} / ${settings?.maxPointsPerWeek}`}
        size="xl"
      />
      <Span size="sm">
        {((settings?.maxPointsPerWeek || 0) - totalPoints).toFixed(1)} left (
        {resetsInNDaysLabel})
      </Span>
    </FlexCol>
  )
}

export default IndulgenceProgress
