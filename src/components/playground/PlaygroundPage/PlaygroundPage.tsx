import { Container } from "react-grid-system"
import LoggedLayout from "../../_common/layout/LoggedLayout/LoggedLayout"
import Tiptap from "./Tiptap/Tiptap"

type Props = {}

const PlaygroundPage = ({ ...props }: Props) => {
  return (
    <LoggedLayout>
      <Container>
        <h1>Playground</h1>
        <Tiptap />
      </Container>
    </LoggedLayout>
  )
}

export default PlaygroundPage
