import { MultiSelect } from "@mantine/core"
import { useMemo, useRef } from "react"
import { useTagsQuery } from "../../../../../hooks/trpc/exercise/tag/useTagsQuery"
import useExerciseTagModalStore from "../../../../../hooks/zustand/modals/useExerciseTagModalStore"
import { buildTagInput } from "../../../../../trpcServer/routers/exercise/types/TagInput"

type Props = {
  selectedTagIds: string[]
  onChange: (selectedTagIds: string[]) => void
  hideLabel?: boolean
  maxWidth?: number
}

const ExerciseTagSelector = (props: Props) => {
  const { openModal } = useExerciseTagModalStore()

  const { data: tags } = useTagsQuery()

  const handleChange = (values: string[]) => {
    if (values?.includes("addNewTag")) {
      openModal(buildTagInput())
      return
    }

    props.onChange(values || [])
  }

  const options = useMemo(() => {
    const newTagOption = {
      label: "+ Add new tag",
      value: "addNewTag",
    }

    if (!tags) return [newTagOption]

    return [
      newTagOption,
      ...tags.map((tag) => ({
        label: tag.name,
        value: tag.id,
      })),
    ]
  }, [tags])

  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <MultiSelect
        label={props.hideLabel ? undefined : "Tags"}
        value={props.selectedTagIds}
        placeholder="Select tags"
        onChange={(values) => {
          handleChange(values)
          inputRef.current?.blur()
        }}
        data={options}
        multiple
        w={props.maxWidth || 400}
        ref={inputRef}
      />
    </>
  )
}

export default ExerciseTagSelector
