import { zodResolver } from "@hookform/resolvers/zod"

import { Modal } from "@mantine/core"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { useSaveFavoriteMutation } from "../../../../hooks/trpc/favorite/useSaveFavoriteMutation"
import { useMyMediaQuery } from "../../../../hooks/useMyMediaQuery"
import useFavoriteModalStore from "../../../../hooks/zustand/modals/useFavoriteModalStore"
import {
  buildFavoriteInput,
  FavoriteInput,
  favoriteInputSchema,
} from "../../../../trpcServer/routers/favorite/types/FavoriteInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"
import MyTextField from "../../inputs/MyTextField"

type Props = {}

const FavoriteModal = (props: Props) => {
  const { isOpen, closeDialog, initialValue } = useFavoriteModalStore()
  const form = useForm<FavoriteInput>({
    defaultValues: initialValue || buildFavoriteInput(),
    resolver: zodResolver(favoriteInputSchema),
  })

  const errorsArr = Object.values(form.formState.errors)

  const { mutateAsync, isLoading } = useSaveFavoriteMutation()

  const onSubmit = async (data: FavoriteInput) => {
    mutateAsync(data, {
      onSuccess: (saved) => {
        closeDialog()
      },
    })
  }

  const { isMobile } = useMyMediaQuery()

  useEffect(() => {
    if (isOpen) {
      form.reset(initialValue || buildFavoriteInput())

      if (!isMobile) {
        setTimeout(() => {
          form.setFocus("url")
        }, 200)
      }
    }
  }, [isOpen, isMobile])

  const isDisabled = useMemo(() => {
    return JSON.stringify(form.watch()) === JSON.stringify(initialValue)
  }, [form.watch(), initialValue])

  return (
    <Modal
      opened={isOpen}
      onClose={closeDialog}
      title={form.watch("id") ? "Edit Favorite" : "Add Favorite"}
    >
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FlexCol gap={16}>
          <MyTextField
            {...form.register("url", { required: true })}
            label="Url"
            error={form.formState.errors.url?.message}
          />

          <SaveCancelButtons
            disabled={isDisabled}
            isLoading={isLoading}
            onCancel={closeDialog}
          />
        </FlexCol>
      </form>
    </Modal>
  )
}

export default FavoriteModal
