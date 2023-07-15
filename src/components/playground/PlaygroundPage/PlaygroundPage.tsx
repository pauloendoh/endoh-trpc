import { Box } from "@mantine/core"
import { Container } from "react-grid-system"
import LoggedLayout from "../../_common/layout/LoggedLayout/LoggedLayout"
import I18nSection from "./I18nSection/I18nSection"
import NumberFormatSection from "./NumberFormatSection/NumberFormatSection"
import ReactTableTest from "./ReactTableTest/ReactTableTest"
import Tiptap from "./Tiptap/Tiptap"

type Props = {}

const PlaygroundPage = ({ ...props }: Props) => {
  return (
    <LoggedLayout>
      <Container>
        <h1>Playground</h1>
        <Tiptap />

        <Box mt={24} />
        <I18nSection />

        <NumberFormatSection />
        <ReactTableTest />
      </Container>
    </LoggedLayout>
  )
}

export default PlaygroundPage
