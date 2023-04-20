import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"
import React from "react"

type Props = React.ComponentProps<typeof NumberInput>

const MyNumberInput = React.forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref) => {
    return (
      <NumberInput autoComplete="off" ref={ref} {...props}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    )
  }
)

export default MyNumberInput
