import { Button, Paper, Table, useMantineTheme } from "@mantine/core"
import { useMemo } from "react"
import { useMeetingItemsQuery } from "../../../hooks/trpc/meeting/useMeetingItemsQuery"
import { useSaveMeetingItemMutation } from "../../../hooks/trpc/meeting/useSaveMeetingItemMutation"
import { buildMeetingItemInput } from "../../../trpcServer/routers/meeting/types/MeetingItemInput"
import MeetingTableRow from "./MeetingTableRow/MeetingTableRow"
type Props = {}

const MeetingTable = ({ ...props }: Props) => {
  const { mutate } = useSaveMeetingItemMutation()

  const { data: items } = useMeetingItemsQuery()

  const sortedItems = useMemo(() => {
    return (
      items?.sort((a, b) => {
        // position asc
        if (a.position < b.position) return -1
        if (a.position > b.position) return 1

        return 0
      }) || []
    )
  }, [])

  const theme = useMantineTheme()

  return (
    <div className="MeetingTable">
      <Paper>
        <Table
          sx={{
            background: theme.colors.dark[5],
            borderRadius: 4,
            "thead th, tfoot td": {
              background: theme.colors.dark[6],
            },
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: 400,
                }}
              >
                Question
              </th>
              <th
                style={{
                  width: 400,
                }}
              >
                Answer
              </th>
              <th
                style={{
                  width: 96,
                }}
              >
                Ok?
              </th>
              <th
                style={{
                  width: 96,
                }}
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <MeetingTableRow key={item.id} item={item} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>
                <Button
                  variant="subtle"
                  color="dark"
                  onClick={() => {
                    mutate(buildMeetingItemInput())
                  }}
                >
                  + Add
                </Button>
              </td>
            </tr>
          </tfoot>
        </Table>
      </Paper>
    </div>
  )
}

export default MeetingTable
