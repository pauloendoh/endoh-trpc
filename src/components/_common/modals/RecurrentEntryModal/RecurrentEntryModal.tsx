import { Box, Modal } from "@mantine/core"
import { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { useSaveRecurrentEntryMutation } from "../../../../hooks/trpc/diary/useSaveRecurrentEntryMutation"
import useRecurrentEntryModalStore from "../../../../hooks/zustand/modals/useRecurrentEntryModalStore"
import {
  buildRecurrentEntryInput,
  RecurrentEntryInput,
} from "../../../../trpcServer/routers/diary/types/RecurrentEntryInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexVCenter from "../../flexboxes/FlexVCenter"
import MyNumberInputV2 from "../../inputs/MyNumberInputV2"
import MyTextField from "../../inputs/MyTextField"

const ariaLabel = "recurrent-learning-dialog"

const RecurrentEntryModal = () => {
  const { onSuccess, openModal, isOpen, initialValue, closeModal } =
    useRecurrentEntryModalStore()

  const handleClose = () => {
    closeModal()
  }

  const isLoading = useMemo(() => {
    return false
  }, [])

  const { reset, handleSubmit, formState, control, watch, setFocus } = useForm({
    defaultValues: initialValue || buildRecurrentEntryInput(),
  })

  const { mutate: submitSave } = useSaveRecurrentEntryMutation()

  useEffect(() => {
    if (isOpen) {
      reset(initialValue)

      setTimeout(() => {
        setFocus("description")
      }, 100)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const onSubmit = (values: RecurrentEntryInput) => {
    const input = {
      ...values,
    }

    submitSave(input, {
      onSuccess: (saved) => {
        handleClose()

        if (onSuccess) {
          onSuccess(saved)
        }
      },
    })
  }

  return (
    <Modal
      onClose={handleClose}
      opened={isOpen}
      size="xs"
      title={initialValue?.id ? "Edit recurrent entry" : "Add recurrent entry"}
    >
      <Box pb={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <FlexVCenter gap={16}>
              <Controller
                control={control}
                name="description"
                render={({ field: { ref, ...field } }) => (
                  <MyTextField
                    label="Description"
                    size="sm"
                    placeholder="e.g. 15 min of resting"
                    ref={ref}
                    error={formState.errors["description"]?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                control={control}
                name="points"
                render={({ field: { ref, ...field } }) => (
                  <MyNumberInputV2
                    onChange={(e) => {
                      field.onChange(e)
                    }}
                    w={100}
                    precision={2}
                    value={field.value}
                    label="Points"
                  />
                )}
              />
            </FlexVCenter>
          </Box>
          <Box mt={16}>
            <SaveCancelButtons
              isLoading={isLoading}
              disabled={isLoading}
              onCancel={handleClose}
              onEnabledAndCtrlEnter={() => {
                onSubmit(watch())
              }}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default RecurrentEntryModal
