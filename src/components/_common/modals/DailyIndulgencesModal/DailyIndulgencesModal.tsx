import { Button, Modal } from "@mantine/core"
import { useMemo } from "react"
import { useIndulgencesQuery } from "../../../../hooks/trpc/indulgence/useIndulgencesQuery"
import useDailyIndulgencesModalStore from "../../../../hooks/zustand/modals/useDailyIndulgencesModalStore"
import useIndulgenceModalStore from "../../../../hooks/zustand/modals/useIndulgenceModalStore"
import {
  buildIndulgenceInput,
  indulgenceOutputToInput,
} from "../../../../trpcServer/routers/indulgence/types/IndulgenceInput"
import FlexCol from "../../flexboxes/FlexCol"

type Props = {}

const DailyIndulgencesModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useDailyIndulgencesModalStore()
  const { openModal: openIndulgenceModal } = useIndulgenceModalStore()

  const { data: myIndulgences, isLoading } = useIndulgencesQuery()

  const dailyIndulgences = useMemo(() => {
    if (!myIndulgences) return []

    const selectedDate = initialValue?.toLocaleDateString()
    if (!selectedDate) return []

    return myIndulgences.filter(
      (indulgence) =>
        new Date(indulgence.date).toLocaleDateString() === selectedDate
    )
  }, [initialValue, myIndulgences])

  return (
    <Modal
      opened={isOpen}
      size="xs"
      onClose={closeModal}
      title={initialValue?.toLocaleDateString()}
    >
      <FlexCol gap={4}>
        {dailyIndulgences.map((indulgence, index) => (
          <Button
            onClick={() => {
              openIndulgenceModal(indulgenceOutputToInput(indulgence))
            }}
            color="dark"
            sx={{
              justifyContent: "space-between",
            }}
            display="flex"
            key={indulgence.id}
            styles={{
              inner: {
                width: "100%",
              },
              label: {
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 14,
                fontWeight: 500,
              },
            }}
          >
            <span>{indulgence.title}</span>
            <span>{indulgence.points}pts</span>
          </Button>
        ))}

        <Button
          mt={16}
          onClick={() => {
            openIndulgenceModal(
              buildIndulgenceInput({
                date: initialValue?.toISOString(),
              })
            )
          }}
        >
          Add Indulgence
        </Button>
      </FlexCol>
    </Modal>
  )
}

export default DailyIndulgencesModal
