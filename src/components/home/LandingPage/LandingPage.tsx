import FlexCol from "@/components/_common/flexboxes/FlexCol"
import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter"
import { Button, Divider, Flex, Paper, Text, Title } from "@mantine/core"
import { signIn } from "next-auth/react"
import { FaGithub } from "react-icons/fa"

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
      <Paper
        sx={(theme) => ({
          paddingBlock: 16,
          paddingInline: 24,
          width: "fit-content",
          background: theme.colors.dark[5],
        })}
      >
        <FlexCol gap={8} align="center">
          <Title order={1} sx={{ fontWeight: "normal" }}>
            devfol.io
          </Title>

          <Text sx={{ marginTop: 8 }}>Porfolio for developers</Text>
        </FlexCol>

        <Divider my="sm" label="Enter via" labelPosition="center" />

        <Button
          onClick={() => signIn("github")}
          size="lg"
          variant="filled"
          color="info"
          sx={{ marginTop: 16, width: 250 }}
          fullWidth
        >
          <FlexVCenter gap={8}>
            <FaGithub />
            <Text>Github</Text>
          </FlexVCenter>
        </Button>
      </Paper>
    </Flex>
  )
}

export default LandingPage
