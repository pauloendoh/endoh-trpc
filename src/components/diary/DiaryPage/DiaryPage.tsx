import { Container } from "@mantine/core"
import LoggedLayout from "../../_common/layout/LoggedLayout/LoggedLayout"
import DiaryTable from "./DiaryTable/DiaryTable"

type Props = {}

const DiaryPage = ({ ...props }: Props) => {
  return (
    <LoggedLayout>
      <Container mt={20}>
        <DiaryTable />
      </Container>
    </LoggedLayout>
  )
}

export default DiaryPage
