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
import { FriendInput } from "../../../../trpcServer/routers/friend/types/FriendInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FriendInterestsTable from "./FriendInterestsTable/FriendInterestsTable"

type Props = {}

const FriendModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useFriendModalStore()
  const {
    reset,
    watch,
    handleSubmit,
    register,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<FriendInput>({
    defaultValues: initialValue,
  })

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
      reset(initialValue)

      setTimeout(() => {
        setFocus("name")
      }, 200)
    }
  }, [isOpen])

  return (
    <Modal isOpen={isOpen} onClose={closeModal} size="xl">
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
              <Input {...register("name")} autoComplete="off" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <SaveCancelButtons onCancel={closeModal} />
          </ModalFooter>
        </form>

        {watch("id") && <FriendInterestsTable friendId={watch("id")!} />}
      </ModalContent>
    </Modal>
  )
}

export default FriendModal
