import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSaveExerciseMutation } from "../../../../hooks/trpc/exercise/useSaveExerciseMutation"
import useExerciseModalStore from "../../../../hooks/zustand/modals/useExerciseModalStore"
import {
  buildExerciseInput,
  ExerciseInput,
} from "../../../../trpcServer/routers/exercise/types/ExerciseInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"

type Props = {}

const ExerciseModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useExerciseModalStore()
  const {
    reset,
    watch,
    handleSubmit,
    register,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<ExerciseInput>({
    defaultValues: initialValue || buildExerciseInput(),
  })

  const { mutateAsync } = useSaveExerciseMutation()

  const onSubmit = async (data: ExerciseInput) => {
    mutateAsync(data, {
      onSuccess: () => {
        closeModal()
      },
    })
  }

  useEffect(() => {
    if (isOpen) {
      reset(initialValue || buildExerciseInput())

      setTimeout(() => {
        setFocus("title")
      }, 200)
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {watch("id") ? "Edit Exercise" : "Create Exercise"}
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input {...register("title")} />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                {...register("description")}
                isInvalid={!!errors.description}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.pump}>
              <FormLabel>Pump</FormLabel>
              <NumberInput
                {...register("pump")}
                onChange={(value) => setValue("pump", Number(value))}
                min={0}
                max={5}
                step={1}
                isInvalid={!!errors.pump}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>{errors.pump?.message}</FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <SaveCancelButtons onCancel={closeModal} />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default ExerciseModal
