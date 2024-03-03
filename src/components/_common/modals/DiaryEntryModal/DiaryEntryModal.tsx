import { Box, Modal, Text } from "@mantine/core"
import { useEffect, useRef } from "react"
import { Controller, useForm } from "react-hook-form"
import { useSaveEntryMutation } from "../../../../hooks/trpc/diary/useSaveEntryMutation"
import { useTodayPointsQueryUtils } from "../../../../hooks/trpc/diary/utils/useTodayPointsQueryUtils"
import useEntryModalStore from "../../../../hooks/zustand/modals/useEntryModalStore"
import { DiaryEntryInput } from "../../../../trpcServer/routers/diary/types/DiaryEntryInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexVCenter from "../../flexboxes/FlexVCenter"
import MyNumberInputV2 from "../../inputs/MyNumberInputV2"
import LearningDescriptionAutocomplete from "./LearningDescriptionAutocomplete/LearningDescriptionAutocomplete"

const ariaLabel = "diary-entry-modal"

const DiaryEntryModal = () => {
  const { closeModal, initialValue, isOpen, openModal } = useEntryModalStore()
  const handleClose = () => {
    closeModal()
  }

  const { reset, handleSubmit, formState, control, watch, setValue, register } =
    useForm<DiaryEntryInput>({
      defaultValues: initialValue,
    })

  useEffect(() => {
    if (isOpen) {
      reset({
        ...initialValue,
      })

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    }
  }, [isOpen])

  const { mutate: submitSave, isLoading: isSubmitting } = useSaveEntryMutation()

  const onSubmit = (values: DiaryEntryInput) => {
    const hourOffset = -(new Date().getTimezoneOffset() / 60)

    const input = {
      points: values.points,
      datetime: new Date().toISOString(),
      description: values.description,
      id: values.id,
      hourOffset,
    } satisfies DiaryEntryInput

    submitSave(input, {
      onSuccess: () => {
        handleClose()
      },
    })
  }

  const inputRef = useRef<HTMLInputElement>(null)

  const { todayGoal, todayPoints } = useTodayPointsQueryUtils()

  return (
    <Modal
      onClose={handleClose}
      opened={isOpen}
      size="sm"
      title={initialValue?.id ? "Edit entry" : "Add entry"}
    >
      <Box pb={1}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <FlexVCenter gap={16}>
              <LearningDescriptionAutocomplete
                onChangeStringValue={(value) => {
                  setValue("description", value)
                }}
                onChangePoints={(value) => {
                  setValue("points", value)
                }}
                stringValue={watch("description")}
                inputRef={inputRef}
              />

              <Controller
                control={control}
                name="points"
                render={({ field: { ref, ...field } }) => (
                  <MyNumberInputV2
                    onChange={(value) => {
                      setValue("points", value)
                    }}
                    value={watch("points")}
                    precision={2}
                    label="Points"
                    w={100}
                    min={0}
                    max={undefined}
                  />
                )}
              />
            </FlexVCenter>
          </Box>

          <Box mt={64}>
            {todayPoints >= todayGoal && (
              <Text color="red" mb={24}>
                You reached today's goal. <br />
                This entry will be pushed to tomorrow.
              </Text>
            )}
            <SaveCancelButtons
              isLoading={isSubmitting}
              disabled={formState.isSubmitting}
              onCancel={handleClose}
              onEnabledAndCtrlEnter={() => {
                onSubmit(watch())
              }}
            />
          </Box>
        </form>
      </Box>
    </Modal>
  )
}

export default DiaryEntryModal
