import { Button, Container } from "@mantine/core"
import useIdeaModalStore from "../../hooks/zustand/modals/useIdeaModalStore"
import LoggedLayout from "../_common/layout/LoggedLayout/LoggedLayout"

type Props = {}

const IdeasPage = ({ ...props }: Props) => {
  const { openModal } = useIdeaModalStore()
  return (
    <LoggedLayout>
      <Container mt={20}>
        <Button onClick={() => openModal()}>Open Idea Modal</Button>
      </Container>
    </LoggedLayout>
  )
}

export default IdeasPage
