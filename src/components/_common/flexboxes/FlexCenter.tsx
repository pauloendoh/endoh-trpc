import { Box } from "@mantine/core"
import React from "react"

type Props = React.ComponentProps<typeof Box> & {
  children: React.ReactNode
}

const FlexCenter = (props: Props) => {
  return (
    <Box display="flex" sx={{ alignItems: "center", justifyContent: "center" }}>
      {props.children}
    </Box>
  )
}

export default FlexCenter
