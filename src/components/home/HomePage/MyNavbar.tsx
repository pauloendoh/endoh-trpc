import FlexVCenter from "@/components/_common/flexboxes/FlexVCenter"
import { myTrpc } from "@/hooks/trpc/myTrpc"
import {
  Burger,
  Button,
  Container,
  createStyles,
  Header,
  Title,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { FaRegFolderOpen } from "react-icons/fa"

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}))

const MyNavbar = () => {
  const [opened, { toggle }] = useDisclosure(false)
  const { classes, cx } = useStyles()

  const meQuery = myTrpc.user.me.useQuery()

  return (
    <Header height={60} mb={40}>
      <Container className={classes.header}>
        <Link href={"/"}>
          <a
            style={{
              color: "unset",
              textDecoration: "unset",
            }}
          >
            <FlexVCenter gap={8}>
              <FaRegFolderOpen size={28} />
              <Title order={2}>devfol.io</Title>
            </FlexVCenter>
          </a>
        </Link>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />

        <Button onClick={() => signOut()}>logout</Button>
      </Container>
    </Header>
  )
}

export default MyNavbar
