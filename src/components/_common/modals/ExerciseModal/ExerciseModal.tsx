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
  Textarea,
} from "@chakra-ui/react"
import { useEffect } from "react"
import { Col, Row } from "react-grid-system"
import { useForm } from "react-hook-form"
import { useSaveExerciseMutation } from "../../../../hooks/trpc/exercise/useSaveExerciseMutation"
import useExerciseModalStore from "../../../../hooks/zustand/modals/useExerciseModalStore"
import {
  buildExerciseInput,
  ExerciseInput,
} from "../../../../trpcServer/routers/exercise/types/ExerciseInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"
import ExerciseTagSelector from "./ExerciseTagSelector/ExerciseTagSelector"

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
    data.pump = Number(data.pump)
    data.like = Number(data.like)

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
            <FlexCol gap={4}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input {...register("title")} />
              </FormControl>

              <ExerciseTagSelector
                selectedTagIds={watch("tagIds") || []}
                onChange={(selectedTagIds) =>
                  setValue("tagIds", selectedTagIds)
                }
              />
              <Row>
                <Col xs={6}>
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
                </Col>
                <Col xs={6}>
                  <FormControl isInvalid={!!errors.like}>
                    <FormLabel>Interest</FormLabel>
                    <NumberInput
                      {...register("like")}
                      onChange={(value) => setValue("like", Number(value))}
                      min={0}
                      max={5}
                      step={1}
                      isInvalid={!!errors.like}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <FormErrorMessage>{errors.like?.message}</FormErrorMessage>
                  </FormControl>
                </Col>
              </Row>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  {...register("description")}
                  isInvalid={!!errors.description}
                  resize="vertical"
                />
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

export default ExerciseModal
