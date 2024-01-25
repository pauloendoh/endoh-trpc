import { Button, Container, Table } from "@mantine/core"
import React, { useMemo } from "react"
import { MdInfo } from "react-icons/md"
import { useAverageDailyWasteQuery } from "../../../hooks/trpc/wasted/useAverageDailyWasteQuery"
import { useExtraWastedLast30DaysQuery } from "../../../hooks/trpc/wasted/useExtraWastedLast30DaysQuery"
import { useWastedsQuery } from "../../../hooks/trpc/wasted/useWastedsQuery"
import useWastedModalStore from "../../../hooks/zustand/modals/useWastedModalStore"
import { buildWastedInput } from "../../../trpcServer/routers/wasted/types/WastedInput"
import CenterLoader from "../../_common/flexboxes/CenterLoader/CenterLoader"
import FlexCol from "../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"
import LoggedLayout from "../../_common/layout/LoggedLayout/LoggedLayout"
import Span from "../../_common/text/Span"

type Props = {}

const WastedPage = ({ ...props }: Props) => {
  const { openDialog } = useWastedModalStore()
  const { data, isLoading } = useWastedsQuery()

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

  const { data: averageDailyWaste } = useAverageDailyWasteQuery()

  const totalToday = useMemo(() => {
    return todayWasted.reduce((acc, wasted) => {
      return acc + wasted.minutes
    }, 0)
  }, [todayWasted])

  const isBelowAverage = useMemo(() => {
    if (!averageDailyWaste) return true

    return totalToday < averageDailyWaste
  }, [averageDailyWaste, totalToday])

  const { data: extraWastedLast30Days } = useExtraWastedLast30DaysQuery()

  return (
    <LoggedLayout>
      {isLoading && <CenterLoader height={400} />}
      {!isLoading && (
        <div className="WastedPage">
          <Container
            size="md"
            sx={{
              marginTop: 16,
            }}
          >
            <FlexCol gap={16}>
              <FlexVCenter justify={"space-between"}>
                <FlexVCenter>
                  <Span
                    sx={{
                      color: isBelowAverage ? "green" : "red",
                    }}
                  >
                    {totalToday} minutes today
                  </Span>
                  {averageDailyWaste && (
                    <Span>&nbsp;|&nbsp;{averageDailyWaste} avg</Span>
                  )}
                </FlexVCenter>

                {!!extraWastedLast30Days && (
                  <Button
                    variant="subtle"
                    color="red"
                    rightIcon={<MdInfo />}
                    onClick={() => {
                      alert(
                        `You have passed ${extraWastedLast30Days} minutes in the last 30 days.`
                      )
                    }}
                  >
                    R$ {(extraWastedLast30Days / 10).toFixed(2)}
                  </Button>
                )}
              </FlexVCenter>
              <Table
                withColumnBorders
                highlightOnHover
                sx={{
                  border: "0.0625rem solid #4D4D4D",
                  borderRadius: "0.25rem",
                  "tbody>tr:hover": {
                    cursor: "pointer",
                  },
                  tableLayout: "fixed",
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
                    <th>Minutes</th>
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
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th>
                      <Button
                        variant="subtle"
                        color={"secondary"}
                        onClick={() => {
                          openDialog(buildWastedInput())
                        }}
                        size="sm"
                      >
                        + Add Waste
                      </Button>
                    </th>
                    <th />
                  </tr>
                </tfoot>
              </Table>
            </FlexCol>
          </Container>
        </div>
      )}
    </LoggedLayout>
  )
}

export default WastedPage
