import { Box, Button, Flex } from "@mantine/core"
import { signIn } from "next-auth/react"

const LandingPage = () => {
  return (
    <Flex
      sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <Button
          onClick={() => signIn("github")}
          size="lg"
          variant="filled"
          color="info"
          sx={{ marginTop: 16, width: 250 }}
        >
          Login
        </Button>
      </Box>
    </Flex>
  )
}

export default LandingPage
