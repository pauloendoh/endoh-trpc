import { Flex, LoadingOverlay, Radio, useMantineTheme } from "@mantine/core"

import { DateTime } from "luxon"
import { useMemo } from "react"
import { useSaveRecurrentItemMutation } from "../../../../hooks/trpc/recurrent/useSaveRecurrentItemMutation"
import useRecurrentModalStore from "../../../../hooks/zustand/modals/useRecurrentModalStore"
import { RecurrentItemOutput } from "../../../../trpcServer/routers/recurrent/types/RecurrentItemOutput"
import FlexCol from "../../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../../_common/flexboxes/FlexVCenter"
import Span from "../../../_common/text/Span"

type Props = {
  item: RecurrentItemOutput
  type: "today" | "nextDays"
}

const RecurrentItem = ({ item, ...props }: Props) => {
  const { openModal } = useRecurrentModalStore()
  const everyNDaysLabel = useMemo(() => {
    if (item.everyNDays === 1) {
      return "Every day"
    }

    return `Every ${item.everyNDays} days`
  }, [item])

  const nextDayLabel = useMemo(() => {
    if (props.type !== "nextDays") {
      return ""
    }
    const nextDateTime = DateTime.fromISO(item.nextDate)

    const today = DateTime.now().startOf("day")
    const daysDiff = nextDateTime.diff(today, "days").days
    if (daysDiff < 2) {
      return "Tomorrow"
    }

    return `In ${Math.floor(daysDiff)} days`
  }, [item])

  const lateNDays = useMemo(() => {
    if (props.type === "nextDays") {
      return 0
    }
    const nextDateTime = DateTime.fromISO(item.nextDate)
    const today = DateTime.now().startOf("day")
    const daysDiff = nextDateTime.diff(today, "days").days

    return Math.ceil(Math.abs(daysDiff))
  }, [item])

  const theme = useMantineTheme()

  const { mutateAsync, isLoading } = useSaveRecurrentItemMutation()

  const handleClickRadio = () => {
    const nextDate = DateTime.now()
      .plus({ days: item.everyNDays })
      .startOf("day")
      .toISO()

    mutateAsync({
      ...item,
      nextDate,
    })
  }

  return (
    <Flex mt={8} gap={8} pos="relative">
      <LoadingOverlay visible={isLoading} />
      <Radio
        disabled={props.type === "nextDays"}
        checked={false}
        color="red"
        size="xs"
        sx={{
          marginTop: 6,
        }}
        styles={{
          radio: {
            cursor: props.type === "today" ? "pointer" : "not-allowed",
          },
        }}
        onClick={handleClickRadio}
      />
      <FlexCol
        sx={{
          cursor: "pointer",
          width: "100%",
        }}
        onClick={() => openModal(item)}
      >
        <Span>{item.description}</Span>
        <FlexVCenter justify={"space-between"}>
          <Span
            size="sm"
            sx={{
              color:
                props.type === "today"
                  ? theme.colors.red[6]
                  : theme.colors.gray[6],
            }}
          >
            {props.type === "nextDays" && `${nextDayLabel}  · `}
            {everyNDaysLabel}
            {item.isHighPriority && ` ·  High priority`}
          </Span>
          {lateNDays > 0 && (
            <Span
              size="sm"
              sx={{
                color: theme.colors.red[6],
              }}
            >
              {lateNDays} days late
            </Span>
          )}
        </FlexVCenter>
      </FlexCol>
    </Flex>
  )
}

export default RecurrentItem
