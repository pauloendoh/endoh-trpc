import { Button, Container } from "@mantine/core"
import { DateTime } from "luxon"
import { useMemo } from "react"
import { useRecurrentItemsQuery } from "../../hooks/trpc/recurrent/useRecurrentItemsQuery"
import useRecurrentModalStore from "../../hooks/zustand/modals/useRecurrentModalStore"
import { buildRecurrentItemInput } from "../../trpcServer/routers/recurrent/types/RecurrentItemInput"
import FlexCol from "../_common/flexboxes/FlexCol"
import LoggedLayout from "../_common/layout/LoggedLayout/LoggedLayout"
import RecurrentItemList from "./RecurrentItemList/RecurrentItemList"

type Props = {}

const RecurrentPage = ({ ...props }: Props) => {
  const { openModal } = useRecurrentModalStore()

  const { data } = useRecurrentItemsQuery()
  const todayItems = useMemo(() => {
    if (!data) {
      return []
    }

    return data
      .filter((item) => {
        const tomorrowDateTime = DateTime.now().plus({ days: 1 }).startOf("day")
        const nextDateTime = DateTime.fromISO(item.nextDate).startOf("day")

        const daysDiff = nextDateTime.diff(tomorrowDateTime, "days").days

        return daysDiff < 0
      })
      .sort((a, b) => a.everyNDays - b.everyNDays)
  }, [data])

  const nextDayItems = useMemo(() => {
    if (!data) {
      return []
    }

    return data
      .filter((item) => {
        const tomorrowDateTime = DateTime.now().plus({ days: 1 }).startOf("day")
        const nextDateTime = DateTime.fromISO(item.nextDate).startOf("day")

        const daysDiff = nextDateTime.diff(tomorrowDateTime, "days").days

        return daysDiff >= 0
      })
      .sort(
        (a, b) =>
          new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime()
      )
  }, [data])

  return (
    <LoggedLayout>
      <Container mt={20} size="sm">
        <Button onClick={() => openModal(buildRecurrentItemInput())}>
          + Add Item
        </Button>

        <FlexCol gap={40} mt={24}>
          <RecurrentItemList type={"today"} items={todayItems} />
          <RecurrentItemList type={"nextDays"} items={nextDayItems} />
        </FlexCol>
      </Container>
    </LoggedLayout>
  )
}

export default RecurrentPage
