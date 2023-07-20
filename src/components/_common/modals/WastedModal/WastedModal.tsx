import { Modal, NumberInput } from "@mantine/core"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { useSaveWastedMutation } from "../../../../hooks/trpc/wasted/useSaveWastedMutation"
import { useMyMediaQuery } from "../../../../hooks/useMyMediaQuery"
import useWastedModalStore from "../../../../hooks/zustand/modals/useWastedModalStore"
import {
  buildWastedInput,
  WastedInput,
} from "../../../../trpcServer/routers/wasted/types/WastedInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"

type Props = {}

const WastedModal = (props: Props) => {
  const { isOpen, closeDialog, initialValue } = useWastedModalStore()
  const form = useForm<WastedInput>({
    defaultValues: initialValue || buildWastedInput(),
  })

  const { mutateAsync, isLoading } = useSaveWastedMutation()

  const onSubmit = async (data: WastedInput) => {
    data.minutes = Number(data.minutes)
    mutateAsync(data, {
      onSuccess: (saved) => {
        closeDialog()
      },
    })
  }

  const { isMobile } = useMyMediaQuery()

  useEffect(() => {
    if (isOpen) {
      form.reset(initialValue || buildWastedInput())

      if (!isMobile) {
        setTimeout(() => {
          form.setFocus("minutes")
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
      onClose={closeDialog}
      title={form.watch("id") ? "Edit Wasted Time" : "Add Wasted Time"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FlexCol className="gap-2 w-full items-start">
          <NumberInput
            id="minutes"
            label="Minutes"
            {...form.register("minutes")}
            max={undefined}
            min={0}
            defaultValue={form.watch("minutes")}
            value={undefined}
            onChange={(value) => {
              if (!value) {
                form.setValue("minutes", 0)
                return
              }

              form.setValue("minutes", value)
            }}
            type="number"
          />
        </FlexCol>

        <SaveCancelButtons onCancel={closeDialog} />
      </form>
    </Modal>
  )
}

export default WastedModal
