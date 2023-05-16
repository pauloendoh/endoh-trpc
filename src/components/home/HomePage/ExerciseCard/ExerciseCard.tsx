import { Flex, Text } from "@chakra-ui/react"
import { Exercise } from "@prisma/client"
import { SerializeObject } from "@trpc/server/shared"
import FlexCol from "../../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../../_common/flexboxes/FlexVCenter"

type Props = {
  exercise: SerializeObject<Exercise>
}

const ExerciseCard = (props: Props) => {
  return (
    <Flex p={4} bg="gray.700" borderRadius={4}>
      <FlexCol>
        <b>{props.exercise.title}</b>
        <FlexVCenter>
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
