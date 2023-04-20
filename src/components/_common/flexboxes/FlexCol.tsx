import { Flex } from "@chakra-ui/react"
import React from "react"

type Props = React.ComponentProps<typeof Flex> & {
  children: React.ReactNode
}

const FlexCol = (props: Props) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
      {...props}
    >
      {props.children}
    </Flex>
  )
}

export default FlexCol
