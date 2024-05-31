import { ActionIcon, Box, Menu, Modal, useMantineTheme } from "@mantine/core"
import { useEffect, useMemo } from "react"
import { Controller, useForm } from "react-hook-form"
import { MdClose, MdDelete, MdMoreHoriz } from "react-icons/md"
import { useDeleteRecurrentEntryMutation } from "../../../../hooks/trpc/diary/useDeleteRecurrentEntryMutation"
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

  const { mutate: submitDelete } = useDeleteRecurrentEntryMutation()
  const theme = useMantineTheme()

  return (
    <Modal
      zIndex={9999}
      onClose={handleClose}
      opened={isOpen}
      size="xs"
      styles={{
        title: {
          width: "100%",
        },
      }}
      title={
        initialValue?.id ? (
          <FlexVCenter justify={"space-between"}>
            <span>Edit recurrent entry</span>
            <Menu shadow="md" position="bottom-end">
              <Menu.Target>
                <ActionIcon>
                  <MdMoreHoriz />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={() => handleClose()} icon={<MdClose />}>
                  Close
                </Menu.Item>
                <Menu.Item
                  sx={{
                    color: theme.colors.red[6],
                  }}
                  icon={<MdDelete />}
                  onClick={() => {
                    if (!initialValue.id) return
                    if (
                      confirm(
                        "Are you sure you want to delete this recurrent entry?"
                      )
                    ) {
                      submitDelete(initialValue.id, {
                        onSuccess: () => {
                          handleClose()
                        },
                      })
                    }
                  }}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </FlexVCenter>
        ) : (
          "Add recurrent entry"
        )
      }
      withCloseButton={false}
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
              saveWidth={200}
              saveText="Save recurrent entry"
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
