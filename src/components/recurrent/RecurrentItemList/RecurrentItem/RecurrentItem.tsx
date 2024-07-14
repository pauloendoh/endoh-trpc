import { Flex, Radio, useMantineTheme } from "@mantine/core"
import { DateTime } from "luxon"
import { useMemo } from "react"
import { useSaveRecurrentItemMutation } from "../../../../hooks/trpc/recurrent/useSaveRecurrentItemMutation"
import useRecurrentModalStore from "../../../../hooks/zustand/modals/useRecurrentModalStore"
import { RecurrentItemOutput } from "../../../../trpcServer/routers/recurrent/types/RecurrentItemOutput"
import FlexCol from "../../../_common/flexboxes/FlexCol"
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

  const theme = useMantineTheme()

  const { mutateAsync } = useSaveRecurrentItemMutation()

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
    <Flex mt={8} gap={8}>
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
        </Span>
      </FlexCol>
    </Flex>
  )
}

export default RecurrentItem
