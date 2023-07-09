import { Box, Button, Container } from "@mantine/core"

import { useMemo, useState } from "react"
import useExerciseModalStore from "../../../hooks/zustand/modals/useExerciseModalStore"
import { buildExerciseInput } from "../../../trpcServer/routers/exercise/types/ExerciseInput"
import { trpc } from "../../../utils/trpc/trpc"
import FlexCol from "../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"
import LoggedLayout from "../../_common/layout/LoggedLayout/LoggedLayout"
import ExerciseTagSelector from "../../_common/modals/ExerciseModal/ExerciseTagSelector/ExerciseTagSelector"
import ExerciseCard from "./ExerciseCard/ExerciseCard"

type Props = {}

const HomePage = (props: Props) => {
  const { openModal } = useExerciseModalStore()
  const { data: exercises } = trpc.exercise.myExercises.useQuery()

  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])

  const sortedExercises = useMemo(() => {
    return exercises
      ?.sort((a, b) => {
        const avgA = (a.like + (a.pump || a.like)) / 2
        const avgB = (b.like + (b.pump || b.like)) / 2

        return avgB - avgA
      })
      .filter((exercise) => {
        if (selectedTagIds.length === 0) return true
        return exercise.tags.some((tag) => selectedTagIds.includes(tag.id))
      })
  }, [exercises, selectedTagIds])

  return (
    <LoggedLayout>
      <Box>
        <Container mt={16} size="xs" mb={120}>
          <FlexVCenter justify={"space-between"}>
            <ExerciseTagSelector
              selectedTagIds={selectedTagIds}
              onChange={setSelectedTagIds}
              hideLabel
              width={300}
            />
            <Button
              onClick={() =>
                openModal(
                  buildExerciseInput({
                    tagIds: selectedTagIds,
                  })
                )
              }
            >
              + Add Exercise
            </Button>
          </FlexVCenter>
          <FlexCol gap={16} mt={16}>
            {sortedExercises?.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </FlexCol>
        </Container>
      </Box>
    </LoggedLayout>
  )
}

export default HomePage
