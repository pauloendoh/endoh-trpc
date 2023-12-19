import { ActionIcon, Text } from "@mantine/core"
import { useEffect, useMemo, useState } from "react"
import { MdRefresh } from "react-icons/md"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"

type Props = {
  numberOfPeople: number
}

const MeetingTimer = ({ ...props }: Props) => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((curr) => curr + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const timerLabel = useMemo(() => {
    // for example: '00:23 min'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")} min`
  }, [seconds])

  const questionRangeMinutes = useMemo(() => {
    return Math.floor(Math.sqrt(props.numberOfPeople)) + 1
  }, [props.numberOfPeople])

  const isOver = useMemo(() => {
    return seconds >= questionRangeMinutes * 60
  }, [questionRangeMinutes, seconds])

  return (
    <FlexVCenter className="MeetingTimer">
      <Text
        size="lg"
        sx={{
          color: isOver ? "red" : undefined,
        }}
      >
        {timerLabel}
      </Text>
      &nbsp;/&nbsp;
      <Text size="sm">{questionRangeMinutes} min</Text>
      <ActionIcon ml={16} onClick={() => setSeconds(0)} size="lg">
        <MdRefresh fontSize={24} />
      </ActionIcon>
    </FlexVCenter>
  )
}

export default MeetingTimer
