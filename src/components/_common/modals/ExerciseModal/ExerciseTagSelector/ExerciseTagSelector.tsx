import { FormControl, FormLabel } from "@chakra-ui/react"
import { MultiValue, Select } from "chakra-react-select"
import { useMemo } from "react"
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

  const handleChange = (
    selected: MultiValue<{
      label: string
      value: string
    }>
  ) => {
    console.log(selected)

    const selectedValues = selected?.map((s) => s.value)
    if (selectedValues?.includes("addNewTag")) {
      openModal(buildTagInput())
      return
    }

    props.onChange(selectedValues || [])
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

  return (
    <FormControl maxW={props.maxWidth || undefined}>
      {props.hideLabel ? null : <FormLabel>Tag</FormLabel>}

      <Select
        value={
          props.selectedTagIds.map((id) => ({
            label: tags?.find((t) => t.id === id)?.name || "",
            value: id,
          })) as any
        }
        placeholder="Select tags"
        onChange={handleChange}
        options={options}
        isMulti
      />
    </FormControl>
  )
}

export default ExerciseTagSelector
