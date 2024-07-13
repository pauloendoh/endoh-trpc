import { Flex } from "@mantine/core"
import React from "react"

type Props = React.ComponentProps<typeof Flex> & {
  children: React.ReactNode
}

const FlexCol = (props: Props) => {
  return (
    <Flex
      {...props}
      sx={{
        flexDirection: "column",
        ...props.sx,
      }}
    >
      {props.children}
    </Flex>
  )
}

export default FlexCol
