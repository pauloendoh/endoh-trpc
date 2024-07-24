import { Box, Button, Checkbox, Modal, Textarea } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { useDeleteRecurrentItemMutation } from "../../../../hooks/trpc/recurrent/useDeleteRecurrentItemMutation"
import { useSaveRecurrentItemMutation } from "../../../../hooks/trpc/recurrent/useSaveRecurrentItemMutation"
import { useMyMediaQuery } from "../../../../hooks/useMyMediaQuery"
import useRecurrentModalStore from "../../../../hooks/zustand/modals/useRecurrentModalStore"
import {
  buildRecurrentItemInput,
  RecurrentItemInput,
  recurrentItemOutputToInput,
} from "../../../../trpcServer/routers/recurrent/types/RecurrentItemInput"

import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"
import FlexVCenter from "../../flexboxes/FlexVCenter"
import MyNumberInputV2 from "../../inputs/MyNumberInputV2"

type Props = {}

const RecurrentModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useRecurrentModalStore()
  const form = useForm<RecurrentItemInput>({
    defaultValues: initialValue || buildRecurrentItemInput(),
  })

  const { mutateAsync, isLoading } = useSaveRecurrentItemMutation()

  const onSubmit = async (data: RecurrentItemInput) => {
    mutateAsync(data, {
      onSuccess: (saved) => {
        form.reset(recurrentItemOutputToInput(saved))
        closeModal()
      },
    })
  }

  const { isMobile } = useMyMediaQuery()

  useEffect(() => {
    if (isOpen) {
      form.reset(initialValue || buildRecurrentItemInput())

      form.setFocus("description")
    }
  }, [isOpen, isMobile])

  const isDisabled = useMemo(() => {
    return JSON.stringify(form.watch()) === JSON.stringify(initialValue)
  }, [form.watch(), initialValue])

  const { mutateAsync: submitDelete } = useDeleteRecurrentItemMutation()

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={form.watch("id") ? "Edit Recurrent Item" : "Create Recurrent Item"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FlexCol gap={16}>
          <Textarea
            {...form.register("description")}
            label="Description"
            autosize
            minRows={3}
          />

          <FlexVCenter>
            <MyNumberInputV2
              label="Every N days"
              onChange={(value) => {
                form.setValue("everyNDays", value)
              }}
              precision={0}
              value={form.watch("everyNDays")}
              sx={{
                width: 100,
              }}
            />

            <DateInput
              value={
                form.watch("nextDate") ? new Date(form.watch("nextDate")) : null
              }
              onChange={(value) => {
                if (value) {
                  form.setValue("nextDate", value?.toISOString())
                  return
                }
                form.setValue("nextDate", "")
              }}
              label="Next Date"
              placeholder="Date input"
              maw={400}
              mx="auto"
              popoverProps={{
                withinPortal: true,
              }}
            />
          </FlexVCenter>

          <Checkbox
            checked={form.watch("isHighPriority")}
            label="High priority"
            styles={{
              label: {
                cursor: "pointer",
              },
              input: {
                cursor: "pointer !important",
              },
            }}
            onChange={(e) => {
              form.setValue("isHighPriority", e.currentTarget.checked, {
                shouldDirty: true,
              })
            }}
          />

          <Box />

          <FlexVCenter justify={"space-between"}>
            <SaveCancelButtons
              disabled={isDisabled}
              isLoading={isLoading}
              onCancel={closeModal}
              onEnabledAndCtrlEnter={() => onSubmit(form.watch())}
            />

            {form.watch("id") && (
              <Button
                variant="subtle"
                color="red"
                onClick={() => {
                  if (confirm("Are you sure?")) {
                    submitDelete(
                      {
                        id: form.watch("id")!,
                      },
                      {
                        onSuccess: () => {
                          closeModal()
                        },
                      }
                    )
                  }
                }}
              >
                Delete
              </Button>
            )}
          </FlexVCenter>
        </FlexCol>
      </form>
    </Modal>
  )
}

export default RecurrentModal
