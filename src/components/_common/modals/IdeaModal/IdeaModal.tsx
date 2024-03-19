import { ActionIcon, Modal, Select, Textarea } from "@mantine/core"
import { IdeaStatus } from "@prisma/client"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { MdClose } from "react-icons/md"
import { useSaveIdeaMutation } from "../../../../hooks/trpc/ideas/useSaveIdeaMutation"
import useIdeaModalStore from "../../../../hooks/zustand/modals/useIdeaModalStore"
import { IdeaInput } from "../../../../trpcServer/routers/diary copy/types/IdeaInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"
import FlexVCenter from "../../flexboxes/FlexVCenter"
import MyTextField from "../../inputs/MyTextField"
import { ideaStatusList } from "./ideaStatusMapping/ideaStatusMapping"

type Props = {}

const IdeaModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useIdeaModalStore()

  const form = useForm<IdeaInput>({
    defaultValues: initialValue,
  })

  useEffect(() => {
    if (isOpen) {
      form.reset(initialValue)
      form.setFocus("title")
    }
  }, [isOpen])

  const { mutate } = useSaveIdeaMutation()

  const handleSubmit = (data: IdeaInput) => {
    console.log(data)
    mutate(data, {
      onSuccess: () => {
        closeModal()
      },
    })
  }

  return (
    <Modal
      withCloseButton={false}
      opened={isOpen}
      onClose={closeModal}
      size="md"
    >
      <form
        onSubmit={form.handleSubmit((data) => {
          handleSubmit(data)
        })}
      >
        <FlexCol gap={24}>
          <FlexVCenter>
            <MyTextField
              variant="filled"
              placeholder="Idea title"
              {...form.register("title")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  form.handleSubmit(handleSubmit)()
                }
              }}
              w="100%"
              required
            />

            <ActionIcon onClick={closeModal} ml={8}>
              <MdClose />
            </ActionIcon>
          </FlexVCenter>

          <FlexCol gap={16}>
            <Textarea
              label="Description"
              minRows={3}
              {...form.register("description")}
            />

            <FlexVCenter gap={16}>
              <Select
                data={[
                  {
                    value: "1",
                    label: "1 - XS",
                  },
                  {
                    value: "2",
                    label: "2 - S",
                  },
                  {
                    value: "3",
                    label: "3 - M",
                  },
                  {
                    value: "5",
                    label: "5 - L",
                  },
                  {
                    value: "8",
                    label: "8 - XL",
                  },
                ]}
                label="Complexity"
                placeholder="Select complexity"
                {...form.register("complexity")}
                onChange={(value) => {
                  form.setValue("complexity", Number(value))
                }}
                withinPortal
                w={160}
                value={String(form.watch("complexity"))}
              />

              <Select
                data={ideaStatusList.map((status) => ({
                  value: status.value,
                  label: status.label,
                }))}
                label="Status"
                placeholder="Select status"
                {...form.register("status")}
                withinPortal
                w={160}
                onChange={(value: IdeaStatus) => {
                  form.setValue("status", value)
                }}
                value={form.watch("status")}
              />
            </FlexVCenter>
          </FlexCol>

          <SaveCancelButtons onCancel={closeModal} />
        </FlexCol>
      </form>
    </Modal>
  )
}

export default IdeaModal
