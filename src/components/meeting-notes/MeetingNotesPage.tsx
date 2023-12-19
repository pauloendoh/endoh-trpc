import { Box, Container } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { localStorageKeys } from "../../utils/localStorageKeys"
import FlexCol from "../_common/flexboxes/FlexCol"
import FlexVCenter from "../_common/flexboxes/FlexVCenter"
import MyNumberInputV2 from "../_common/inputs/MyNumberInputV2"
import LoggedLayout from "../_common/layout/LoggedLayout/LoggedLayout"
import MeetingTable from "./MeetingTable/MeetingTable"
import MeetingTimer from "./MeetingTimer/MeetingTimer"

type Props = {}

const MeetingNotesPage = ({ ...props }: Props) => {
  const [numberOfPeople, setNumberOfPeople] = useLocalStorage<number>({
    key: localStorageKeys.meetingNumberOfPeople,
    defaultValue: 0,
  })

  return (
    <LoggedLayout>
      <Container mt={40} size="sm">
        <FlexCol>
          <FlexVCenter gap={24}>
            <MyNumberInputV2
              label="Number of people"
              value={numberOfPeople}
              onChange={(value) => setNumberOfPeople(value)}
              precision={0}
              w={120}
            />

            <Box mt={24}>
              <MeetingTimer numberOfPeople={numberOfPeople} />
            </Box>
          </FlexVCenter>

          <Box mt={24} />
          <MeetingTable />
        </FlexCol>
      </Container>
    </LoggedLayout>
  )
}

export default MeetingNotesPage
