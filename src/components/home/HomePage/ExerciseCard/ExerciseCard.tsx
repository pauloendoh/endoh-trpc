import { Flex, Text } from "@mantine/core"
import { ExerciseOutput } from "../../../../hooks/trpc/exercise/types/ExerciseOutput"
import FlexCol from "../../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../../_common/flexboxes/FlexVCenter"
import MyPaper from "../../../_common/flexboxes/MyPaper"
import Span from "../../../_common/text/Span"
import ExerciseCardMoreMenu from "./ExerciseCardMoreMenu/ExerciseCardMoreMenu"

type Props = {
  exercise: ExerciseOutput
}

const ExerciseCard = (props: Props) => {
  return (
    <MyPaper
      sx={{
        borderRadius: 4,
      }}
    >
      <FlexCol>
        <FlexVCenter
          justify={"space-between"}
          sx={{
            flexGrow: 1,
          }}
        >
          <b>{props.exercise.title}</b>
          <ExerciseCardMoreMenu exercise={props.exercise} />
        </FlexVCenter>

        {!!props.exercise.tags.length && (
          <Flex>
            {props.exercise.tags.map((tag) => (
              <Span
                key={tag.id}
                sx={(theme) => ({
                  borderRadius: 4,
                  background: theme.colors.dark[4],
                })}
                px={8}
                py={4}
                size="xs"
              >
                #{tag.name}
              </Span>
            ))}
          </Flex>
        )}

        <FlexVCenter mt={8}>
          <Text w={100}>Pump: {props.exercise.pump}</Text>
          <Text>Int: {props.exercise.like}</Text>
        </FlexVCenter>

        {!!props.exercise.description && (
          <Text
            mt={4}
            sx={{
              fontStyle: "italic",
              whiteSpace: "pre-wrap",
            }}
          >
            {props.exercise.description}
          </Text>
        )}
      </FlexCol>
    </MyPaper>
  )
}

export default ExerciseCard
