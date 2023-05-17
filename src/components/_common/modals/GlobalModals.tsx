import ExerciseModal from "./ExerciseModal/ExerciseModal"
import ExerciseTagModal from "./ExerciseTagModal/ExerciseTagModal"
import FriendModal from "./FriendModal/FriendModal"
import InterestModal from "./InterestModal/InterestModal"

type Props = {}

const GlobalModals = (props: Props) => {
  return (
    <>
      <ExerciseModal />
      <FriendModal />
      <InterestModal />
      <ExerciseTagModal />
    </>
  )
}

export default GlobalModals
