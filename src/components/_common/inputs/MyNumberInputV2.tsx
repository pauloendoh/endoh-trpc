import { NumberInput } from "@mantine/core"
import React from "react"

type Props = React.ComponentProps<typeof NumberInput> & {
  precision: number
}

const MyNumberInputV2 = React.forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    return (
      <NumberInput
        autoComplete="off"
        stepHoldDelay={500}
        stepHoldInterval={100}
        removeTrailingZeros
        ref={ref}
        {...props}
        precision={props.precision}
      />
    )
  }
)

export default MyNumberInputV2
