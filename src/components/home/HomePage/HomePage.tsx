import { Box, Button, Container, Text } from "@chakra-ui/react"
import { signOut } from "next-auth/react"
import { useMemo } from "react"
import useExerciseModalStore from "../../../hooks/zustand/modals/useExerciseModalStore"
import { trpc } from "../../../utils/trpc/trpc"
import FlexCol from "../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"
type Props = {}

const HomePage = (props: Props) => {
  const { data: user, refetch } = trpc.user.me.useQuery()
  const { openModal } = useExerciseModalStore()
  const { data: exercises } = trpc.exercise.myExercises.useQuery()

  const sortedExercises = useMemo(() => {
    return exercises?.sort((a, b) => {
      return a.createdAt > b.createdAt ? -1 : 1
    })
  }, [exercises])

  return (
    <Box>
      <FlexVCenter>{user?.name}</FlexVCenter>
      <Box>
        <Button onClick={() => signOut()}>Logout</Button>
      </Box>

      <Container mt={4}>
        <FlexVCenter justify={"space-between"}>
          <Text>Exercises</Text>
          <Button onClick={openModal}>+ Add Exercise</Button>
        </FlexVCenter>
        <FlexCol gap={4}>
          {sortedExercises?.map((exercise) => (
            <Text key={exercise.id}>{exercise.title}</Text>
          ))}
        </FlexCol>
      </Container>
    </Box>
  )
}

export default HomePage
