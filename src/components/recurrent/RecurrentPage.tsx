import {
  ActionIcon,
  Button,
  Container,
  useMantineColorScheme,
} from "@mantine/core"
import { IconMoonStars, IconSun } from "@tabler/icons-react"
import { DateTime } from "luxon"
import Head from "next/head"
import { useEffect, useMemo } from "react"
import { useRecurrentItemsQuery } from "../../hooks/trpc/recurrent/useRecurrentItemsQuery"
import useRecurrentModalStore from "../../hooks/zustand/modals/useRecurrentModalStore"
import { buildRecurrentItemInput } from "../../trpcServer/routers/recurrent/types/RecurrentItemInput"
import CenterLoader from "../_common/flexboxes/CenterLoader/CenterLoader"
import FlexCol from "../_common/flexboxes/FlexCol"
import FlexVCenter from "../_common/flexboxes/FlexVCenter"
import LoggedLayout from "../_common/layout/LoggedLayout/LoggedLayout"
import RecurrentItemList from "./RecurrentItemList/RecurrentItemList"

type Props = {}

const RecurrentPage = ({ ...props }: Props) => {
  const { openModal } = useRecurrentModalStore()

  const { data, isLoading } = useRecurrentItemsQuery()
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
      .sort((a, b) => {
        if (a.isHighPriority && !b.isHighPriority) {
          return -1
        }
        return 1
      })
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

  const { toggleColorScheme, colorScheme } = useMantineColorScheme()
  useEffect(() => {
    toggleColorScheme("light")
  }, [])
  const dark = colorScheme === "dark"

  return (
    <LoggedLayout>
      <Head>
        <title>Recurrent</title>
      </Head>
      <Container mt={20} size="sm">
        <FlexVCenter justify={"space-between"}>
          <Button onClick={() => openModal(buildRecurrentItemInput())}>
            + Add Item
          </Button>
          <ActionIcon
            variant="outline"
            color={dark ? "yellow" : "blue"}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
          </ActionIcon>
        </FlexVCenter>

        <FlexCol gap={40} mt={24} pb={240}>
          {isLoading ? <CenterLoader /> : null}
          <RecurrentItemList type={"today"} items={todayItems} />
          <RecurrentItemList type={"nextDays"} items={nextDayItems} />
        </FlexCol>
      </Container>
    </LoggedLayout>
  )
}

export default RecurrentPage
