import { Modal, TextInput } from "@mantine/core"
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
    <Modal
      opened={isOpen}
      onClose={closeModal}
      size="xl"
      title={watch("id") ? "Edit Friend" : "Create Friend"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput label="Name" {...register("name")} autoComplete="off" />

        <SaveCancelButtons onCancel={closeModal} />
      </form>

      {watch("id") && <FriendInterestsTable friendId={watch("id")!} />}
    </Modal>
  )
}

export default FriendModal
