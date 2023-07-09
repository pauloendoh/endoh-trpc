import { Modal, Textarea, TextInput } from "@mantine/core"
import { useEffect, useMemo } from "react"
import { Col, Row } from "react-grid-system"
import { useForm } from "react-hook-form"
import { useSaveExerciseMutation } from "../../../../hooks/trpc/exercise/useSaveExerciseMutation"
import { useMyMediaQuery } from "../../../../hooks/useMyMediaQuery"
import useExerciseModalStore from "../../../../hooks/zustand/modals/useExerciseModalStore"
import {
  buildExerciseInput,
  ExerciseInput,
  exerciseOutputToInput,
} from "../../../../trpcServer/routers/exercise/types/ExerciseInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"
import MyNumberInput from "../../inputs/MyNumberInput"
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
    getValues,
    formState: { errors },
  } = useForm<ExerciseInput>({
    defaultValues: initialValue || buildExerciseInput(),
  })

  const { mutateAsync, isLoading } = useSaveExerciseMutation()

  const onSubmit = async (data: ExerciseInput) => {
    data.pump = Number(data.pump)
    data.like = Number(data.like)

    mutateAsync(data, {
      onSuccess: (saved) => {
        reset(exerciseOutputToInput(saved))
      },
    })
  }

  const { isMobile } = useMyMediaQuery()

  useEffect(() => {
    if (isOpen) {
      reset(initialValue || buildExerciseInput())

      if (!isMobile) {
        setTimeout(() => {
          setFocus("title")
        }, 200)
      }
    }
  }, [isOpen, isMobile])

  const isDisabled = useMemo(() => {
    return JSON.stringify(watch()) === JSON.stringify(initialValue)
  }, [watch(), initialValue])

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={watch("id") ? "Edit Exercise" : "Create Exercise"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexCol gap={16}>
          <TextInput label="Title" {...register("title")} />

          <ExerciseTagSelector
            selectedTagIds={watch("tagIds") || []}
            onChange={(selectedTagIds) => setValue("tagIds", selectedTagIds)}
          />
          <Row>
            <Col xs={6}>
              <MyNumberInput
                {...register("pump")}
                label="Pump"
                onChange={(value) => setValue("pump", Number(value))}
                min={0}
                max={5}
                step={1}
              />
            </Col>
            <Col xs={6}>
              <MyNumberInput
                {...register("like")}
                onChange={(value) => setValue("like", Number(value))}
                min={0}
                max={5}
                step={1}
                label="Interest"
              />
            </Col>
          </Row>

          <Textarea
            {...register("description")}
            label="Description"
            autosize
            minRows={3}
          />

          <SaveCancelButtons
            disabled={isDisabled}
            isLoading={isLoading}
            onCancel={closeModal}
            onEnabledAndCtrlEnter={() => onSubmit(watch())}
          />
        </FlexCol>
      </form>
    </Modal>
  )
}

export default ExerciseModal
