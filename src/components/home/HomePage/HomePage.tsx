import { Box, Button, Container } from "@chakra-ui/react"
import { signOut } from "next-auth/react"
import { routes } from "../../../hooks/trpc/myTrpc"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"
type Props = {}

const HomePage = (props: Props) => {
  const { data: user } = routes.user.me.useQuery()
  return (
    <Box>
      <FlexVCenter>{user?.name}</FlexVCenter>
      <Box>
        <Button onClick={() => signOut()}>Logout</Button>
      </Box>

      <Container mt={4}>
        <Box>ue</Box>
        <Box>Lmao</Box>
        <Box>Lmao</Box>
      </Container>
    </Box>
  )
}

export default HomePage
