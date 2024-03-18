import { Modal } from "@mantine/core"
import useIdeaModalStore from "../../../../hooks/zustand/modals/useIdeaModalStore"

type Props = {}

const IdeaModal = (props: Props) => {
  const { isOpen, closeModal } = useIdeaModalStore()

  return (
    <Modal title="Idea" opened={isOpen} onClose={closeModal} size="xl">
      hey
    </Modal>
  )
}

export default IdeaModal
