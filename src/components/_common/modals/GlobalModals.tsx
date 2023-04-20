import ExerciseModal from "./ExerciseModal/ExerciseModal"
import FriendModal from "./FriendModal/FriendModal"
import InterestModal from "./InterestModal/InterestModal"

type Props = {}

const GlobalModals = (props: Props) => {
  return (
    <>
      <ExerciseModal />
      <FriendModal />
      <InterestModal />
    </>
  )
}

export default GlobalModals
