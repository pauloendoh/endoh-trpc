import { Box, Button, Header, Title } from "@mantine/core"
import { motion } from "framer-motion"
import { signOut } from "next-auth/react"
import { useRouter } from "next/router"
import React from "react"
import { useMyMediaQuery } from "../../../../hooks/useMyMediaQuery"
import { trpc } from "../../../../utils/trpc/trpc"
import urls from "../../../../utils/urls"
import FlexVCenter from "../../flexboxes/FlexVCenter"
import MyNextLink from "../../next/MyNextLink"

type Props = {
  children?: React.ReactNode
}

const links = [
  { href: urls.pages.index, label: "Exercises" },
  { href: urls.pages.clothes, label: "Clothes" },
  { href: urls.pages.playground, label: "Playground" },
]

const LoggedLayout = ({ ...props }: Props) => {
  const { data: user, refetch } = trpc.user.me.useQuery()

  const { isMobile } = useMyMediaQuery()

  const path = useRouter().pathname

  return (
    <Box>
      <Header height={60}>
        <FlexVCenter px={24} h="100%" justify={"space-between"}>
          {!isMobile && <Title order={4}>tRPC</Title>}

          <FlexVCenter gap={16}>
            {links.map((link) => (
              <MyNextLink className="relative" key={link.href} href={link.href}>
                {path === link.href && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 top-full block h-[1px] w-full bg-white"
                  />
                )}

                {link.label}
              </MyNextLink>
            ))}
          </FlexVCenter>

          <FlexVCenter gap={16}>
            {/* <FlexVCenter>{user?.name}</FlexVCenter>isMobile */}
            <Button onClick={() => signOut()}>Logout</Button>
          </FlexVCenter>
        </FlexVCenter>
      </Header>
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: 20,
        }}
      >
        {props.children}
      </motion.div>
    </Box>
  )
}

export default LoggedLayout
