import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { MdArrowDropDown, MdMoreHoriz } from "react-icons/md"
import { ExerciseOutput } from "../../../../../hooks/trpc/exercise/types/ExerciseOutput"
import useExerciseModalStore from "../../../../../hooks/zustand/modals/useExerciseModalStore"
import { buildExerciseInput } from "../../../../../trpcServer/routers/exercise/types/ExerciseInput"

type Props = {
  exercise: ExerciseOutput
}

const ExerciseCardMoreMenu = (props: Props) => {
  const { openModal } = useExerciseModalStore()
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            variant="ghost"
            isActive={isOpen}
            as={Button}
            rightIcon={<MdArrowDropDown />}
          >
            <MdMoreHoriz />
          </MenuButton>
          <MenuList>
            <MenuItem
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
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default ExerciseCardMoreMenu
