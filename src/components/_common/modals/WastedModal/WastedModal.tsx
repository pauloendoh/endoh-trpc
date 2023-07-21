import { Modal } from "@mantine/core"
import { useEffect } from "react"
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
import MyNumberInputV2 from "../../inputs/MyNumberInputV2"

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

  return (
    <Modal
      opened={isOpen}
      onClose={closeDialog}
      title={form.watch("id") ? "Edit Wasted Time" : "Add Wasted Time"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FlexCol gap={16}>
          <MyNumberInputV2
            {...form.register("minutes", {
              required: "Required",
              min: {
                value: 0,
                message: "Must be greater than 0",
              },
            })}
            onChange={(value) => {
              form.setValue("minutes", value)
            }}
            value={form.watch("minutes")}
            precision={0}
            label="Minutes"
            max={undefined}
            min={0}
            w={100}
          />

          <SaveCancelButtons onCancel={closeDialog} isLoading={isLoading} />
        </FlexCol>
      </form>
    </Modal>
  )
}

export default WastedModal
