import { NumberInput } from "@mantine/core"
import React from "react"

type Props = React.ComponentProps<typeof NumberInput>

const MyNumberInput = React.forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    return (
      <NumberInput
        autoComplete="off"
        stepHoldDelay={500}
        stepHoldInterval={100}
        ref={ref}
        {...props}
      />
    )
  }
)

export default MyNumberInput
