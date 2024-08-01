import { Modal, Rating, SegmentedControl } from "@mantine/core"
import { ClothingType } from "@prisma/client"

import { useEffect, useMemo } from "react"
import { Col, Row } from "react-grid-system"
import { Controller, useForm } from "react-hook-form"
import { MdHome } from "react-icons/md"
import { useSaveClothingMutation } from "../../../../hooks/trpc/clothing/useSaveClothingMutation"
import { useMyMediaQuery } from "../../../../hooks/useMyMediaQuery"
import useClothingModalStore from "../../../../hooks/zustand/modals/useClothingModalStore"
import {
  buildClothingInput,
  ClothingInput,
} from "../../../../trpcServer/routers/clothing/types/ClothingInput"
import SaveCancelButtons from "../../buttons/SaveCancelButtons"
import FlexCol from "../../flexboxes/FlexCol"
import FlexVCenter from "../../flexboxes/FlexVCenter"
import MyNumberInput from "../../inputs/MyNumberInput"
import Span from "../../text/Span"
import ClothingImageSubmission from "./ClothingImageSubmission/ClothingImageSubmission"

type Props = {}

const ClothingModal = (props: Props) => {
  const { isOpen, closeModal, initialValue } = useClothingModalStore()
  const {
    reset,
    watch,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ClothingInput>({
    defaultValues: initialValue || buildClothingInput(),
  })

  const { mutateAsync } = useSaveClothingMutation()

  const onSubmit = async (data: ClothingInput) => {
    mutateAsync(data, {
      onSuccess: () => {
        closeModal()
      },
    })
  }

  const { isMobile } = useMyMediaQuery()

  useEffect(() => {
    if (isOpen) {
      reset(initialValue || buildClothingInput())

      if (!isMobile) {
        // setTimeout(() => {
        //   setFocus("title")
        // }, 200)
      }
    }
  }, [isOpen, isMobile])

  const isDisabled = useMemo(() => {
    return JSON.stringify(watch()) === JSON.stringify(initialValue)
  }, [watch(), initialValue])

  return (
    <Modal
      opened={isOpen}
      onClose={closeModal}
      title={watch("id") ? "Edit Clothing" : "Create Clothing"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <ClothingImageSubmission
          onSetImageUrl={(imageUrl) => setValue("imageUrl", imageUrl)}
          imageUrl={watch("imageUrl")}
        />

        <FlexCol gap={16} mt={16}>
          {/* <ClothingTagSelector
            selectedTagIds={watch("tagIds") || []}
            onChange={(selectedTagIds) => setValue("tagIds", selectedTagIds)}
          /> */}
          <Row>
            <Col xs={6}>
              <Controller
                control={control}
                name="minDegree"
                render={({ field }) => (
                  <MyNumberInput
                    {...field}
                    label="Min Degree"
                    value={watch("minDegree")}
                    onChange={(value) => setValue("minDegree", Number(value))}
                    step={1}
                  />
                )}
              />
            </Col>
            <Col xs={6}>
              <Controller
                control={control}
                name="maxDegree"
                render={({ field }) => (
                  <MyNumberInput
                    {...field}
                    label="Max Degree"
                    value={watch("maxDegree")}
                    onChange={(value) => setValue("maxDegree", Number(value))}
                    step={1}
                  />
                )}
              />
            </Col>
          </Row>

          <Row align="center">
            <Col xs={6}>
              <FlexCol>
                <Span size="sm">Rating</Span>
                <Rating
                  id="rating-input"
                  value={watch("rating")}
                  onChange={(value) =>
                    setValue("rating", value, { shouldDirty: true })
                  }
                />
              </FlexCol>
            </Col>
            <Col xs={6}>
              <SegmentedControl
                data={[
                  {
                    label: (
                      <FlexVCenter gap={2}>
                        <MdHome />
                        <span>Home</span>
                      </FlexVCenter>
                    ),
                    value: "home",
                  },
                  {
                    label: "Outside",
                    value: "outside",
                  },
                ]}
                value={watch("type")}
                onChange={(val) =>
                  setValue("type", val as ClothingType, { shouldDirty: true })
                }
              />
            </Col>
          </Row>

          <SaveCancelButtons
            disabled={isDisabled}
            onCancel={closeModal}
            onEnabledAndCtrlEnter={() => onSubmit(watch())}
          />
        </FlexCol>
      </form>
    </Modal>
  )
}

export default ClothingModal
