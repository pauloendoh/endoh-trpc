import { Box, Button, Flex } from "@mantine/core"

interface Props {
  submitButtonId?: string
  disabled?: boolean
  isLoading?: boolean
  onSave?: () => void
  onCancel?: () => void
}

const SaveCancelButtons = (props: Props) => {
  return (
    <Flex>
      <Button
        loading={props.isLoading}
        type="submit"
        color="primary"
        id={props.submitButtonId}
        disabled={props.disabled}
        onClick={props.onSave}
      >
        Save
      </Button>

      <Box ml={8}>
        <Button onClick={props.onCancel} variant="subtle">
          Cancel
        </Button>
      </Box>
    </Flex>
  )
}

export default SaveCancelButtons
