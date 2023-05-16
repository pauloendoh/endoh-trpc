import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { Exercise } from "@prisma/client"
import { SerializeObject } from "@trpc/server/shared"
import { MdArrowDropDown, MdMoreHoriz } from "react-icons/md"
import useExerciseModalStore from "../../../../../hooks/zustand/modals/useExerciseModalStore"
import { buildExerciseInput } from "../../../../../trpcServer/routers/exercise/types/ExerciseInput"

type Props = {
  exercise: SerializeObject<Exercise>
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
