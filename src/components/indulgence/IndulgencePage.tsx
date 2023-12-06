import { Calendar } from "@mantine/dates"

import { ActionIcon, Box, Center, Container, Flex, Title } from "@mantine/core"
import { MdAdd } from "react-icons/md"
import { useIndulgencesQuery } from "../../hooks/trpc/indulgence/useIndulgencesQuery"
import useDailyIndulgencesModalStore from "../../hooks/zustand/modals/useDailyIndulgencesModalStore"
import useIndulgenceModalStore from "../../hooks/zustand/modals/useIndulgenceModalStore"
import { buildIndulgenceInput } from "../../trpcServer/routers/indulgence/types/IndulgenceInput"
import CenterLoader from "../_common/flexboxes/CenterLoader/CenterLoader"
import FlexCol from "../_common/flexboxes/FlexCol"
import LoggedLayout from "../_common/layout/LoggedLayout/LoggedLayout"
import CalendarDay from "./CalendarDay/CalendarDay"
import IndulgenceProgress from "./IndulgenceProgress/IndulgenceProgress"
import IndulgenceSettingsInputs from "./IndulgenceSettingsInputs/IndulgenceSettingsInputs"

type Props = {}

const IndulgencePage = ({ ...props }: Props) => {
  const { openModal } = useIndulgenceModalStore()
  const { data: myIndulgences, isLoading } = useIndulgencesQuery()

  const { openModal: openDailyIndulgences } = useDailyIndulgencesModalStore()

  return (
    <LoggedLayout>
      <Container mt={40} mx="auto">
        {isLoading ? (
          <CenterLoader />
        ) : (
          <Center>
            <FlexCol gap={16}>
              <Title order={4} align="center">
                Indulgence
              </Title>

              <Calendar
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                weekendDays={[]}
                __onDayClick={(_, date) => {
                  openDailyIndulgences(date)
                  // const selectedDate = date.toISOString().split("T")[0]
                  // const foundIndulgence = myIndulgences?.find(
                  //   (indulgence) => indulgence.date.split("T")[0] === selectedDate
                  // )
                  // if (foundIndulgence) {
                  //   openModal(indulgenceOutputToInput(foundIndulgence))
                  //   return
                  // }
                  // openModal(
                  //   buildIndulgenceInput({
                  //     date: date.toISOString(),
                  //   })
                  // )
                }}
                renderDay={(day) => {
                  const isHighlighted = new Date().getDate() === day.getDate()
                  return <CalendarDay day={day} isHighlighted={isHighlighted} />
                }}
              />

              <IndulgenceSettingsInputs />

              <Flex>
                <ActionIcon
                  size="lg"
                  onClick={() => {
                    openModal(
                      buildIndulgenceInput({
                        date: new Date().toISOString(),
                      })
                    )
                  }}
                  variant="filled"
                  color="primary"
                >
                  <MdAdd />
                </ActionIcon>

                <Box mx={8} />

                <IndulgenceProgress />
              </Flex>
            </FlexCol>
          </Center>
        )}
      </Container>
    </LoggedLayout>
  )
}

export default IndulgencePage
