import { TextInput } from "@mantine/core"
import React from "react"

type Props = React.ComponentProps<typeof TextInput> & {
  onCtrlEnter?: (e: React.KeyboardEvent<HTMLDivElement>) => void
  onClickClearIcon?: () => void
}

const MyTextField = React.forwardRef<HTMLInputElement, Props>(
  ({ onCtrlEnter = (e) => {}, ...props }, ref) => {
    return (
      <TextInput
        autoComplete="off"
        size="sm"
        ref={ref}
        {...props}
        onKeyDown={(e) => {
          // I had to add a default function for onCtrlEnter to remove console.error
          if (e.key === "Enter" && e.ctrlKey && onCtrlEnter) {
            onCtrlEnter(e)
          } else if (props.onKeyDown) props.onKeyDown(e)
        }}
      />
    )
  }
)

export default MyTextField
