import { Flex, Text } from "@chakra-ui/react"
import { ExerciseOutput } from "../../../../hooks/trpc/exercise/types/ExerciseOutput"
import FlexCol from "../../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../../_common/flexboxes/FlexVCenter"
import ExerciseCardMoreMenu from "./ExerciseCardMoreMenu/ExerciseCardMoreMenu"

type Props = {
  exercise: ExerciseOutput
}

const ExerciseCard = (props: Props) => {
  return (
    <Flex p={4} bg="gray.700" borderRadius={4}>
      <FlexCol flexGrow={1}>
        <FlexVCenter justify={"space-between"} flexGrow={1}>
          <b>{props.exercise.title}</b>
          <ExerciseCardMoreMenu exercise={props.exercise} />
        </FlexVCenter>

        {!!props.exercise.tags.length && (
          <Flex>
            {props.exercise.tags.map((tag) => (
              <Text
                key={tag.id}
                mr={2}
                color="gray.400"
                bg="gray.600"
                borderRadius={4}
                p={1}
              >
                #{tag.name}
              </Text>
            ))}
          </Flex>
        )}

        <FlexVCenter mt={2}>
          <Text w={100}>Pump: {props.exercise.pump}</Text>
          <Text>Int: {props.exercise.like}</Text>
        </FlexVCenter>

        {!!props.exercise.description && (
          <Text
            mt={4}
            sx={{
              fontStyle: "italic",
            }}
          >
            {props.exercise.description}
          </Text>
        )}
      </FlexCol>
    </Flex>
  )
}

export default ExerciseCard
