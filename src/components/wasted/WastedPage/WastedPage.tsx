import { Button, Container, Table } from "@mantine/core"
import React from "react"
import { useWastedsQuery } from "../../../hooks/trpc/wasted/useWastedsQuery"
import useWastedModalStore from "../../../hooks/zustand/modals/useWastedModalStore"
import { buildWastedInput } from "../../../trpcServer/routers/wasted/types/WastedInput"
import LoggedLayout from "../../_common/layout/LoggedLayout/LoggedLayout"

type Props = {}

const WastedPage = ({ ...props }: Props) => {
  const { openDialog } = useWastedModalStore()
  const { data } = useWastedsQuery()

  const todayWasted = React.useMemo(() => {
    if (!data) return []

    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
    const today = new Date(new Date().getTime() - timezoneOffset)
      .toLocaleDateString()
      .slice(0, 10)

    return data
      .filter((wasted) => {
        const wastedDate = new Date(wasted.createdAt)
        // with offset
        const wastedDateWithOffset = new Date(
          wastedDate.getTime() - timezoneOffset
        )

        return wastedDateWithOffset.toLocaleDateString().slice(0, 10) === today
      })
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
  }, [data])

  return (
    <LoggedLayout>
      <div className="WastedPage">
        <Container
          size="md"
          sx={{
            marginTop: 40,
          }}
        >
          <Table
            highlightOnHover
            sx={{
              width: 200,
              "tbody>tr:hover": {
                cursor: "pointer",
              },
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    width: 100,
                  }}
                >
                  Created
                </th>
                <th
                  style={{
                    width: 100,
                  }}
                >
                  Minutes
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {todayWasted.map((wasted) => (
                <tr
                  key={wasted.id}
                  onClick={() => {
                    openDialog(wasted)
                  }}
                >
                  <td>
                    {new Date(wasted.createdAt)
                      .toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })
                      .slice(0, 5)}
                  </td>
                  <td>{wasted.minutes}</td>
                  <td />
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td>
                  {todayWasted.reduce((acc, wasted) => {
                    return acc + wasted.minutes
                  }, 0)}{" "}
                  minutes
                </td>
              </tr>
            </tfoot>
          </Table>

          <Button
            onClick={() => {
              openDialog(buildWastedInput())
            }}
          >
            + New Wasted
          </Button>
        </Container>
      </div>
    </LoggedLayout>
  )
}

export default WastedPage
