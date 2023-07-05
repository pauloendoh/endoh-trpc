import { Box, Button, Header, Title } from "@mantine/core"
import { signOut } from "next-auth/react"
import React from "react"
import { trpc } from "../../../../utils/trpc/trpc"
import urls from "../../../../utils/urls"
import FlexVCenter from "../../flexboxes/FlexVCenter"
import MyNextLink from "../../next/MyNextLink"

type Props = {
  children?: React.ReactNode
}

const LoggedLayout = ({ ...props }: Props) => {
  const { data: user, refetch } = trpc.user.me.useQuery()

  return (
    <Box>
      <Header height={60}>
        <FlexVCenter px={24} h="100%" justify={"space-between"}>
          <Title order={4}>tRPC</Title>

          <FlexVCenter gap={16}>
            <MyNextLink href={urls.pages.index}>Exercises</MyNextLink>
            <MyNextLink href={urls.pages.clothes}>Clothes</MyNextLink>
            <MyNextLink href={urls.pages.playground}>Playground</MyNextLink>
          </FlexVCenter>

          <FlexVCenter gap={16}>
            <FlexVCenter>{user?.name}</FlexVCenter>
            <Button onClick={() => signOut()}>Logout</Button>
          </FlexVCenter>
        </FlexVCenter>
      </Header>
      {props.children}
    </Box>
  )
}

export default LoggedLayout
