import { Modal, TextInput } from "@mantine/core"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSaveInterestMutation } from "../../../../hooks/trpc/interest/useSaveInterestMutation"
import useInterestModalStore from "../../../../hooks/zustand/modals/useInterestModalStore"
import { InterestInput } from "../../../../trpcServer/routers/interest/types/InterestInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"
import MyNumberInput from "../../inputs/MyNumberInput"

type Props = {}

const InterestModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useInterestModalStore()
  const {
    reset,
    watch,
    handleSubmit,
    register,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<InterestInput>({
    defaultValues: initialValue,
  })

  const { mutateAsync } = useSaveInterestMutation()

  const onSubmit = async (data: InterestInput) => {
    mutateAsync(data, {
      onSuccess: () => {
        closeModal()
      },
    })
  }

  useEffect(() => {
    if (isOpen) {
      reset(initialValue)

      setTimeout(() => {
        setFocus("name")
      }, 200)
    }
  }, [isOpen])

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={watch("id") ? "Edit Interest" : "Create Interest"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexCol gap={4}>
          <TextInput label="Name" {...register("name")} autoComplete="off" />

          <MyNumberInput
            w={"96px"}
            min={0}
            max={3}
            value={watch("userInterestLevel")}
            onChange={(value) => {
              const num = Number(value)
              if (num >= 0 && num <= 3) {
                setValue("userInterestLevel", Number(value))
              }
            }}
          />
        </FlexCol>

        <SaveCancelButtons
          onSave={handleSubmit(onSubmit)}
          onCancel={closeModal}
        />
      </form>
    </Modal>
  )
}

export default InterestModal
