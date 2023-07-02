import { ActionIcon, Menu } from "@mantine/core"
import { MdMoreHoriz } from "react-icons/md"
import { ExerciseOutput } from "../../../../../hooks/trpc/exercise/types/ExerciseOutput"
import useExerciseModalStore from "../../../../../hooks/zustand/modals/useExerciseModalStore"
import { buildExerciseInput } from "../../../../../trpcServer/routers/exercise/types/ExerciseInput"

type Props = {
  exercise: ExerciseOutput
}

const ExerciseCardMoreMenu = (props: Props) => {
  const { openModal } = useExerciseModalStore()
  return (
    <Menu shadow="md" position="bottom-end">
      <Menu.Target>
        <ActionIcon>
          <MdMoreHoriz />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() =>
            openModal(
              buildExerciseInput({
                ...props.exercise,
                imageUrl: props.exercise.imageUrl ?? undefined,
                tagIds: props.exercise.tags.map((tag) => tag.id),
              })
            )
          }
        >
          Edit exercise
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default ExerciseCardMoreMenu
