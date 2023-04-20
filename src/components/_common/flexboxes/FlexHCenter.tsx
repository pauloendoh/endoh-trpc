import { Box } from "@mantine/core"
import React from "react"

type Props = React.ComponentProps<typeof Box> & {
  children: React.ReactNode
}

const FlexHCenter = (props: Props) => {
  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      {props.children}
    </Box>
  )
}

export default FlexHCenter
