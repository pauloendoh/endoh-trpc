import { Flex, Modal, TextInput } from "@mantine/core"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { useSaveIndulgenceMutation } from "../../../../hooks/trpc/indulgence/useSaveIndulgenceMutation"
import { useMyMediaQuery } from "../../../../hooks/useMyMediaQuery"
import useIndulgenceModalStore from "../../../../hooks/zustand/modals/useIndulgenceModalStore"
import {
  buildIndulgenceInput,
  IndulgenceInput,
} from "../../../../trpcServer/routers/indulgence/types/IndulgenceInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"
import MyNumberInputV2 from "../../inputs/MyNumberInputV2"

type Props = {}

const IndulgenceModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useIndulgenceModalStore()
  const form = useForm<IndulgenceInput>({
    defaultValues: initialValue || buildIndulgenceInput(),
  })

  const { mutateAsync, isLoading } = useSaveIndulgenceMutation()

  const onSubmit = async (data: IndulgenceInput) => {
    mutateAsync(data, {
      onSuccess: (saved) => {
        closeModal()
      },
    })
  }

  const { isMobile } = useMyMediaQuery()

  useEffect(() => {
    if (isOpen) {
      form.reset(initialValue || buildIndulgenceInput())

      if (!isMobile) {
        setTimeout(() => {
          form.setFocus("title")
        }, 200)
      }
    }
  }, [isOpen, isMobile])

  const isDisabled = useMemo(() => {
    return JSON.stringify(form.watch()) === JSON.stringify(initialValue)
  }, [form.watch(), initialValue])

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={form.watch("id") ? "Edit indulgence" : "Create indulgence"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FlexCol gap={16}>
          <TextInput label="Title" {...form.register("title")} />

          <Flex gap={16}>
            <MyNumberInputV2
              precision={0}
              value={form.watch("points")}
              label="Points"
              onChange={(value) => {
                form.setValue("points", value)
              }}
              w={80}
            />
          </Flex>

          <SaveCancelButtons
            disabled={isDisabled}
            isLoading={isLoading}
            onCancel={closeModal}
            onEnabledAndCtrlEnter={() => onSubmit(form.watch())}
          />
        </FlexCol>
      </form>
    </Modal>
  )
}

export default IndulgenceModal
