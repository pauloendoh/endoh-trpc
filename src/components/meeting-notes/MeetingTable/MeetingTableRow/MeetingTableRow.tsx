import { ActionIcon, Checkbox } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect, useRef, useState } from "react"
import { MdDelete } from "react-icons/md"
import { useDeleteMeetingItemMutation } from "../../../../hooks/trpc/meeting/useDeleteMeetingItemMutation"
import { useSaveMeetingItemMutation } from "../../../../hooks/trpc/meeting/useSaveMeetingItemMutation"
import { meetingItemOutputToInput } from "../../../../trpcServer/routers/meeting/types/MeetingItemInput"
import { MeetingItemOutput } from "../../../../trpcServer/routers/meeting/types/MeetingOutput"

type Props = {
  item: MeetingItemOutput
}

const MeetingTableRow = ({ ...props }: Props) => {
  const [local, setLocal] = useState<MeetingItemOutput>(props.item)

  const initialQuestion = useRef(local.question)
  const questionRef = useRef<HTMLTableCellElement>(null)

  const initialAnswer = useRef(local.answer)
  const answerRef = useRef<HTMLTableCellElement>(null)

  const isOkRef = useRef<HTMLInputElement>(null)

  const [debouncedLocal] = useDebouncedValue(local, 1000)

  const { mutate } = useSaveMeetingItemMutation()

  useEffect(() => {
    if (JSON.stringify(debouncedLocal) === JSON.stringify(props.item)) return

    mutate(meetingItemOutputToInput(debouncedLocal))
  }, [debouncedLocal])

  const { mutate: submitDelete } = useDeleteMeetingItemMutation()

  return (
    <tr>
      <td
        ref={questionRef}
        contentEditable="true"
        suppressContentEditableWarning
        style={{
          cursor: "pointer",
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          textDecoration: local.isOk ? "line-through" : undefined,
          color: local.isOk ? "gray" : undefined,
        }}
        onInput={() => {
          setLocal((curr) => ({
            ...curr,
            question: questionRef.current?.textContent ?? "",
          }))
        }}
      >
        {initialQuestion.current}
      </td>
      <td
        ref={answerRef}
        contentEditable="true"
        suppressContentEditableWarning
        style={{
          cursor: "pointer",
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          textDecoration: local.isOk ? "line-through" : undefined,
          color: local.isOk ? "gray" : undefined,
        }}
        onInput={(e) => {
          setLocal((curr) => ({
            ...curr,
            answer: answerRef.current?.textContent ?? "",
          }))
        }}
      >
        {initialAnswer.current}
      </td>
      <td>
        <Checkbox
          ref={isOkRef}
          checked={local.isOk}
          styles={{
            label: {
              cursor: "pointer",
            },
            input: {
              cursor: "pointer !important",
            },
          }}
          onChange={(e) => {
            setLocal((curr) => ({
              ...curr,
              isOk: isOkRef.current?.checked ?? false,
            }))
          }}
        />
      </td>
      <td>
        <ActionIcon
          size="sm"
          onClick={() => {
            submitDelete({
              id: props.item.id,
            })
          }}
        >
          <MdDelete />
        </ActionIcon>
      </td>
    </tr>
  )
}

export default MeetingTableRow
