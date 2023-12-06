import { Box, Indicator, useMantineTheme } from "@mantine/core"
import { useMemo } from "react"
import { useIndulgencesQuery } from "../../../hooks/trpc/indulgence/useIndulgencesQuery"

type Props = {
  isHighlighted: boolean
  day: Date
}

const CalendarDay = ({ ...props }: Props) => {
  const theme = useMantineTheme()
  const { data } = useIndulgencesQuery()

  const count = useMemo(() => {
    if (!data) return null

    const foundIndulgences = data.filter(
      (indulgence) =>
        indulgence.date.split("T")[0] === props.day.toISOString().split("T")[0]
    )

    if (!foundIndulgences.length) return null

    return foundIndulgences.reduce((acc, indulgence) => {
      return acc + indulgence.points
    }, 0)
  }, [data, props.day])

  return (
    <Indicator
      color="red"
      disabled={count === null}
      label={count ?? undefined}
      size={16}
    >
      <Box
        sx={{
          background: props.isHighlighted
            ? theme.colors.blue[3]
            : "transparent",
          borderRadius: 4,
          padding: 4,
        }}
      >
        {props.day.getDate()}
      </Box>
    </Indicator>
  )
}

export default CalendarDay
