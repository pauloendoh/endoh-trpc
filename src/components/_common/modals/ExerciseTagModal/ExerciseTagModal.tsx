import { Modal, TextInput } from "@mantine/core"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSaveTagMutation } from "../../../../hooks/trpc/exercise/tag/useSaveTagMutation"
import useExerciseTagModalStore from "../../../../hooks/zustand/modals/useExerciseTagModalStore"
import { TagInput } from "../../../../trpcServer/routers/exercise/types/TagInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"

type Props = {}

const ExerciseTagModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useExerciseTagModalStore()
  const {
    reset,
    watch,
    handleSubmit,
    register,
    setFocus,
    formState: { errors },
  } = useForm<TagInput>({
    defaultValues: initialValue,
  })

  const { mutateAsync } = useSaveTagMutation()

  const onSubmit = async (data: TagInput) => {
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
      size="xs"
      title={watch("id") ? "Edit Tag" : "Create Tag"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexCol gap={16}>
          <TextInput label="Title" {...register("name")} autoComplete="off" />
          <SaveCancelButtons
            onCancel={closeModal}
            onEnabledAndCtrlEnter={() => {
              onSubmit(watch())
            }}
          />
        </FlexCol>
      </form>
    </Modal>
  )
}

export default ExerciseTagModal
