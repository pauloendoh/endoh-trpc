import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
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
    setValue,
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
    <Modal isOpen={isOpen} onClose={closeModal} size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{watch("id") ? "Edit Tag" : "Create Tag"}</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FlexCol gap={4}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input {...register("name")} autoComplete="off" />
              </FormControl>
            </FlexCol>
          </ModalBody>

          <ModalFooter>
            <SaveCancelButtons onCancel={closeModal} />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ExerciseTagModal
