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
import { useSaveFriendMutation } from "../../../../hooks/trpc/friend/useSaveFriendMutation"
import useFriendModalStore from "../../../../hooks/zustand/modals/useFriendModalStore"
import {
  buildFriendInput,
  FriendInput,
} from "../../../../trpcServer/routers/friend/types/FriendInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"

type Props = {}

const FriendModal = (props: Props) => {
  const { isOpen, closeModal } = useFriendModalStore()
  const {
    reset,
    watch,
    handleSubmit,
    register,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<FriendInput>({})

  const { mutateAsync } = useSaveFriendMutation()

  const onSubmit = async (data: FriendInput) => {
    mutateAsync(data, {
      onSuccess: () => {
        closeModal()
      },
    })
  }

  useEffect(() => {
    if (isOpen) {
      reset(buildFriendInput())

      setTimeout(() => {
        setFocus("name")
      }, 200)
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {watch("id") ? "Edit Friend" : "Create Friend"}
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input {...register("name")} />
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

export default FriendModal
