import { Divider, Modal } from "@mantine/core"
import { useRef } from "react"
import { useSaveEntryMutation } from "../../../../hooks/trpc/diary/useSaveEntryMutation"
import { useTodayPointsQueryUtils } from "../../../../hooks/trpc/diary/utils/useTodayPointsQueryUtils"
import useDiaryConfigModalStore from "../../../../hooks/zustand/modals/useDiaryConfigModalStore"
import FlexCol from "../../flexboxes/FlexCol"
import UpdateDayConfigSection from "./UpdateDayConfigSection/UpdateDayConfigSection"

const ariaLabel = "diary-config-modal"

const DiaryConfigModal = () => {
  const { closeModal, isOpen } = useDiaryConfigModalStore()
  const handleClose = () => {
    closeModal()
  }

  const { mutate: submitSave, isLoading: isSubmitting } = useSaveEntryMutation()

  const inputRef = useRef<HTMLInputElement>(null)

  const { todayGoal, todayPoints } = useTodayPointsQueryUtils()

  return (
    <Modal
      onClose={handleClose}
      opened={isOpen}
      size="sm"
      title={"Diary config"}
    >
      <FlexCol pb={1} gap={16}>
        <Divider />
        <UpdateDayConfigSection />
        {/* <Divider />
        Update global config section */}
      </FlexCol>
    </Modal>
  )
}

export default DiaryConfigModal
