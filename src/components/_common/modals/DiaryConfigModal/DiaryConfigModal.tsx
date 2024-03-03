import { Divider, Modal } from "@mantine/core"
import useDiaryConfigModalStore from "../../../../hooks/zustand/modals/useDiaryConfigModalStore"
import FlexCol from "../../flexboxes/FlexCol"
import UpdateDayConfigSection from "./UpdateDayConfigSection/UpdateDayConfigSection"

const DiaryConfigModal = () => {
  const { closeModal, isOpen } = useDiaryConfigModalStore()

  return (
    <Modal
      onClose={closeModal}
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
