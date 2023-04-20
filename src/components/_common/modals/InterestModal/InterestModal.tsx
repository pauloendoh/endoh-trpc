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
import { useSaveInterestMutation } from "../../../../hooks/trpc/interest/useSaveInterestMutation"
import useInterestModalStore from "../../../../hooks/zustand/modals/useInterestModalStore"
import { InterestInput } from "../../../../trpcServer/routers/interest/types/InterestInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import MyNumberInput from "../../inputs/MyNumberInput"

type Props = {}

const InterestModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useInterestModalStore()
  const {
    reset,
    watch,
    handleSubmit,
    register,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm<InterestInput>({
    defaultValues: initialValue,
  })

  const { mutateAsync } = useSaveInterestMutation()

  const onSubmit = async (data: InterestInput) => {
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
    <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {watch("id") ? "Edit Interest" : "Create Interest"}
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody display="flex" flexDir={"column"} gap={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input {...register("name")} autoComplete="off" />
            </FormControl>

            <FormControl>
              <FormLabel>My interest</FormLabel>
              <MyNumberInput
                w={"96px"}
                min={0}
                max={3}
                value={watch("userInterestLevel")}
                onChange={(value) => {
                  const num = Number(value)
                  if (num >= 0 && num <= 3) {
                    setValue("userInterestLevel", Number(value))
                  }
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <SaveCancelButtons
              onSave={handleSubmit(onSubmit)}
              onCancel={closeModal}
            />
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default InterestModal
