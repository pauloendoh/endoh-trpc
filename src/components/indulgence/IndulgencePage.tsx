import { Calendar } from "@mantine/dates"

import { Center, Container, Title, useMantineTheme } from "@mantine/core"
import { useIndulgencesQuery } from "../../hooks/trpc/indulgence/useIndulgencesQuery"
import useIndulgenceModalStore from "../../hooks/zustand/modals/useIndulgenceModalStore"
import {
  buildIndulgenceInput,
  indulgenceOutputToInput,
} from "../../trpcServer/routers/indulgence/types/IndulgenceInput"
import FlexCol from "../_common/flexboxes/FlexCol"
import LoggedLayout from "../_common/layout/LoggedLayout/LoggedLayout"
import CalendarDay from "./CalendarDay/CalendarDay"

type Props = {}

const IndulgencePage = ({ ...props }: Props) => {
  const theme = useMantineTheme()
  const { openModal } = useIndulgenceModalStore()
  const { data: myIndulgences } = useIndulgencesQuery()

  return (
    <LoggedLayout>
      <Container mt={40} mx="auto">
        <Center>
          <FlexCol gap={16}>
            <Title order={4}>Indulgence</Title>
            <Calendar
              weekendDays={[]}
              __onDayClick={(_, date) => {
                const selectedDate = date.toISOString().split("T")[0]
                const foundIndulgence = myIndulgences?.find(
                  (indulgence) => indulgence.date.split("T")[0] === selectedDate
                )
                if (foundIndulgence) {
                  openModal(indulgenceOutputToInput(foundIndulgence))
                  return
                }
                openModal(
                  buildIndulgenceInput({
                    date: date.toISOString(),
                  })
                )
              }}
              renderDay={(day) => {
                const isHighlighted = new Date().getDate() === day.getDate()
                return <CalendarDay day={day} isHighlighted={isHighlighted} />
              }}
            />
          </FlexCol>
        </Center>
      </Container>
    </LoggedLayout>
  )
}

export default IndulgencePage
