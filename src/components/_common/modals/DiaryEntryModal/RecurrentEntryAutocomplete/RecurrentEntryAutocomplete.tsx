import { Autocomplete } from "@mantine/core"
import { useMemo } from "react"
import { useRecurrentEntriesQuery } from "../../../../../hooks/trpc/diary/useRecurrentEntriesQuery"
import useRecurrentEntryModalStore from "../../../../../hooks/zustand/modals/useRecurrentEntryModalStore"
import { buildRecurrentEntryInput } from "../../../../../trpcServer/routers/diary/types/RecurrentEntryInput"
import textContainsWords from "../../../../../utils/text/textContainsWords"
import FlexVCenter from "../../../flexboxes/FlexVCenter"

type Props = {
  stringValue: string
  onChangeStringValue: (value: string) => void
  onChangePoints: (value: number) => void
  inputRef: React.Ref<HTMLInputElement>
}

const RecurrentEntryAutocomplete = ({ ...props }: Props) => {
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

  const selectedRecurrentEntry = useMemo(() => {
    return recurrentEntries?.find(
      (entry) => entry.description === props.stringValue
    )
  }, [recurrentEntries, props.stringValue])

  return (
    <Autocomplete
      w="100%"
      withinPortal
      label={
        <FlexVCenter>
          <span>Description</span>
          {selectedRecurrentEntry && (
            <button
              type="button"
              style={{
                cursor: "pointer",
                textDecoration: "underline",
                background: "none",
                border: "none",
              }}
              onClick={() => {
                openModal(selectedRecurrentEntry, {
                  onSuccess: (saved) => {
                    props.onChangeStringValue(saved.description)
                    props.onChangePoints(saved.points)
                  },
                })
              }}
            >
              (edit recurrent entry)
            </button>
          )}
        </FlexVCenter>
      }
      value={props.stringValue}
      data={mappedData}
      filter={(value, item) => {
        if (item.label === "+ Add recurrent entry") {
          return true
        }

        if (value.trim() === "") {
          return false
        }

        return textContainsWords(item.label, value)
      }}
      onChange={(stringValue) => {
        handleChange(stringValue)
      }}
      ref={props.inputRef}
      zIndex={9999}
      onItemSubmit={(item) => {}}
    />
  )
}

export default RecurrentEntryAutocomplete
