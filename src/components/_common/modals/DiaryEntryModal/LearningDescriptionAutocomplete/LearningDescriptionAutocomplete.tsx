import { Autocomplete } from "@mantine/core"
import { useMemo } from "react"
import { useRecurrentEntriesQuery } from "../../../../../hooks/trpc/diary/useRecurrentEntriesQuery"
import useRecurrentEntryModalStore from "../../../../../hooks/zustand/modals/useRecurrentEntryModalStore"
import { buildRecurrentEntryInput } from "../../../../../trpcServer/routers/diary/types/RecurrentEntryInput"

type Props = {
  stringValue: string
  onChangeStringValue: (value: string) => void
  onChangePoints: (value: number) => void
  inputRef: React.Ref<HTMLInputElement>
}

const LearningDescriptionAutocomplete = ({ ...props }: Props) => {
  const { openModal } = useRecurrentEntryModalStore()

  const { data: recurrentEntries } = useRecurrentEntriesQuery()

  const handleChange = (value: string) => {
    if (value === "Add recurrent entry") {
      openModal(buildRecurrentEntryInput(), {
        onSuccess: (saved) => {
          props.onChangeStringValue(saved.description)
          props.onChangePoints(saved.points)
        },
      })

      return
    }

    const found = recurrentEntries?.find((entry) => entry.id === value)

    if (found) {
      props.onChangeStringValue(found.description)
      props.onChangePoints(found.points)
    } else {
      props.onChangeStringValue(value)
    }
  }

  const mappedData = useMemo(() => {
    let options =
      recurrentEntries
        ?.sort((a, b) => {
          return a.points - b.points
        })
        .map((option) => ({
          value: option.id,
          label: `${option.description} (${option.points} pts)`,
        })) || []

    if (props.stringValue === "") {
      options = []
    }

    if (props.stringValue.length > 0) {
      options = [
        ...options,
        { value: "Add recurrent entry", label: "+ Add recurrent entry" },
      ]
    }

    return options
  }, [recurrentEntries, props.stringValue])

  return (
    <Autocomplete
      w="100%"
      withinPortal
      label="Description"
      value={props.stringValue}
      data={mappedData}
      filter={(value, item) => {
        if (item.label === "+ Add recurrent entry") {
          return true
        }

        if (value.trim() === "") {
          return false
        }

        return item.label.toLowerCase().includes(value.trim().toLowerCase())
      }}
      // clearOnBlur={false}
      // value={props.stringValue}

      // isOptionEqualToValue={(option, value) => {
      //   if (typeof value === "string") {
      //     return option === value
      //   }

      //   return option?.id === value?.id
      // }}
      // sx={{ width: 300 }}
      // getOptionLabel={(option) => {
      //   if (typeof option === "string") {
      //     return option
      //   }
      //   return option.description
      // }}
      // size="small"
      onChange={(stringValue) => {
        handleChange(stringValue)
      }}
      ref={props.inputRef}

      // renderInput={(params) => (
      //   <MyTextField
      //     label="Description"
      //     sx={{ mt: 1 }}
      //     inputRef={props.inputRef}
      //     {...params}
      //     value={props.stringValue}
      //     onChange={(e) => {
      //       props.onChangeStringValue(e.target.value)
      //     }}
      //   />
      // )}
      // renderOption={(liProps, option) => {
      //   if (option.id === 0) {
      //     return (
      //       <li
      //         {...liProps}
      //         style={{
      //           display: "flex",
      //           alignItems: "center",
      //           justifyContent: "center",
      //           fontStyle: "italic",
      //         }}
      //         key={option.id}
      //       >
      //         + Add recurrent learning
      //       </li>
      //     )
      //   }

      //   return (
      //     <li
      //       {...liProps}
      //       style={{ display: "flex", alignItems: "center" }}
      //       key={option.id}
      //     >
      //       <FlexVCenter>
      //         <FlexCol>
      //           <Span>{option.description}</Span>
      //           <Span fontSize={10}>{upToNDecimals(option.points)} pts</Span>
      //         </FlexCol>
      //       </FlexVCenter>
      //     </li>
      //   )
      // }}
    />
  )
}

export default LearningDescriptionAutocomplete
