import { Box, Button, Container, useColorMode } from "@chakra-ui/react"
import { signOut } from "next-auth/react"
import { useMemo, useState } from "react"
import useExerciseModalStore from "../../../hooks/zustand/modals/useExerciseModalStore"
import { buildExerciseInput } from "../../../trpcServer/routers/exercise/types/ExerciseInput"
import { trpc } from "../../../utils/trpc/trpc"
import FlexCol from "../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"
import ExerciseTagSelector from "../../_common/modals/ExerciseModal/ExerciseTagSelector/ExerciseTagSelector"
import ExerciseCard from "./ExerciseCard/ExerciseCard"
type Props = {}

const HomePage = (props: Props) => {
  const { data: user, refetch } = trpc.user.me.useQuery()
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

  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box>
      <FlexVCenter>{user?.name}</FlexVCenter>
      <Box>
        <Button onClick={() => signOut()}>Logout</Button>
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Light" : "Dark"}
        </Button>
      </Box>

      <Container mt={4}>
        <FlexVCenter justify={"space-between"}>
          <ExerciseTagSelector
            selectedTagIds={selectedTagIds}
            onChange={setSelectedTagIds}
            hideLabel
            maxWidth={300}
          />
          <Button onClick={() => openModal(buildExerciseInput())}>
            + Add Exercise
          </Button>
        </FlexVCenter>
        <FlexCol gap={4} mt={4}>
          {sortedExercises?.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </FlexCol>
      </Container>
    </Box>
  )
}

export default HomePage
