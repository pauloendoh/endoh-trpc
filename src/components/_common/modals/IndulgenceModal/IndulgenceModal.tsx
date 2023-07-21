import { Flex, Modal, TextInput } from "@mantine/core"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { useIndulgencesQuery } from "../../../../hooks/trpc/indulgence/useIndulgencesQuery"
import { useSaveIndulgenceMutation } from "../../../../hooks/trpc/indulgence/useSaveIndulgenceMutation"
import { useMyMediaQuery } from "../../../../hooks/useMyMediaQuery"
import useIndulgenceModalStore from "../../../../hooks/zustand/modals/useIndulgenceModalStore"
import {
  buildIndulgenceInput,
  IndulgenceInput,
} from "../../../../trpcServer/routers/indulgence/types/IndulgenceInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"
import FlexVCenter from "../../flexboxes/FlexVCenter"
import MyNumberInputV2 from "../../inputs/MyNumberInputV2"
import Span from "../../text/Span"

type Props = {}

const IndulgenceModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useIndulgenceModalStore()
  const form = useForm<IndulgenceInput>({
    defaultValues: initialValue || buildIndulgenceInput(),
  })

  const { data: myIndulgences } = useIndulgencesQuery()

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

  const sumPrevious7Days = useMemo(() => {
    let sum = 0

    if (!myIndulgences) return sum

    const currentDate = new Date(form.getValues("date")).getTime()
    const sevenDaysAgo = new Date(
      new Date(form.getValues("date")).getTime() - 7 * 24 * 60 * 60 * 1000
    ).getTime()

    for (const indulgence of myIndulgences) {
      if (
        new Date(indulgence.date).getTime() >= sevenDaysAgo &&
        new Date(indulgence.date).getTime() <= currentDate
      ) {
        sum += Number(indulgence.points)
      }
    }

    return sum
  }, [form.getValues("date")])

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
              precision={2}
              value={form.watch("points")}
              label="Points"
              onChange={(value) => {
                form.setValue("points", value)
              }}
              w={80}
            />
          </Flex>

          <FlexVCenter justify={"space-between"}>
            <SaveCancelButtons
              disabled={isDisabled}
              isLoading={isLoading}
              onCancel={closeModal}
              onEnabledAndCtrlEnter={() => onSubmit(form.watch())}
            />
            <Span>
              Last 7 days: <b>{sumPrevious7Days} points</b>
            </Span>
          </FlexVCenter>
        </FlexCol>
      </form>
    </Modal>
  )
}

export default IndulgenceModal
