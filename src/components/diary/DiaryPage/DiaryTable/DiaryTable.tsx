import { ActionIcon, Button, Paper, Table, Title } from "@mantine/core"
import { useMemo } from "react"
import { MdSettings } from "react-icons/md"
import { useDayConfigQuery } from "../../../../hooks/trpc/diary/useDayConfigQuery"
import { useTodayPointsQueryUtils } from "../../../../hooks/trpc/diary/utils/useTodayPointsQueryUtils"
import { useMyMediaQuery } from "../../../../hooks/useMyMediaQuery"
import useDiaryStore from "../../../../hooks/zustand/domains/diary/useDiaryStore"
import useDiaryConfigModalStore from "../../../../hooks/zustand/modals/useDiaryConfigModalStore"
import useEntryModalStore from "../../../../hooks/zustand/modals/useEntryModalStore"
import { buildDiaryEntryInput } from "../../../../trpcServer/routers/diary/types/DiaryEntryInput"
import FlexVCenter from "../../../_common/flexboxes/FlexVCenter"
import useFilteredEntries from "./useFilteredEntries/useFilteredEntries"

type Props = {}

const DiaryTable = ({ ...props }: Props) => {
  const { selectedDate } = useDiaryStore()

  const filteredEntries = useFilteredEntries(selectedDate)

  const { openModal } = useEntryModalStore()

  const { isMobile } = useMyMediaQuery()

  const { todayPoints, todayGoal } = useTodayPointsQueryUtils()

  const { data: dayConfig } = useDayConfigQuery()

  const averagePerHourGoal = useMemo(() => {
    if (!dayConfig) {
      return 0
    }

    const remainingPoints = todayGoal - todayPoints

    const currentHour = new Date().getHours()
    const remainingHours = dayConfig.goalHour - currentHour

    if (remainingHours <= 0) {
      return 0
    }

    return remainingPoints / remainingHours
  }, [dayConfig, todayPoints])

  const { openModal: openDiaryConfigModal } = useDiaryConfigModalStore()

  return (
    <Paper>
      <FlexVCenter justify={"space-between"}>
        <Title
          order={4}
          sx={{
            color: "greenyellow",
          }}
        >
          Today: {todayPoints}
        </Title>

        <Title size="lg">
          Average for goal: {averagePerHourGoal.toFixed(1)}/h{" "}
        </Title>

        <FlexVCenter gap={2}>
          <Title size="lg">
            Goal: {todayGoal} | {dayConfig?.goalHour}h
          </Title>
          <ActionIcon onClick={openDiaryConfigModal} size="lg">
            <MdSettings />
          </ActionIcon>
        </FlexVCenter>
      </FlexVCenter>
      <Table
        mt={24}
        highlightOnHover
        sx={{
          minWidth: isMobile ? 360 : 500,
          "& .MuiTableCell-root": {
            padding: 2,
            borderBottom: "1px solid rgb(255 255 255 / 0.1)",
          },
          th: {
            background: "#232323",
          },
          td: {
            cursor: "pointer",
          },
        }}
      >
        <thead>
          <tr>
            {!isMobile && (
              <th
                align="center"
                style={{
                  width: "64px",
                }}
              >
                Time
              </th>
            )}

            <th>Learning</th>

            <th
              style={{
                width: 100,
                textAlign: "center",
              }}
            >
              Points
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredEntries.map((learning, index) => (
            <tr onClick={() => openModal(learning)} key={learning.id}>
              {!isMobile && (
                <td align="center">
                  {new Date(learning.datetime).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </td>
              )}

              <td>{learning.description}</td>
              <td align="center">{learning.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button onClick={() => openModal(buildDiaryEntryInput())} mt={24}>
        + Add Learning
      </Button>
    </Paper>
  )
}

export default DiaryTable
