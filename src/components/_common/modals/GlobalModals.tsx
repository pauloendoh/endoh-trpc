import ClothingModal from "./ClothingModal/ClothingModal"
import DailyIndulgencesModal from "./DailyIndulgencesModal/DailyIndulgencesModal"
import DiaryEntryModal from "./DiaryEntryModal/DiaryEntryModal"
import ExerciseModal from "./ExerciseModal/ExerciseModal"
import ExerciseTagModal from "./ExerciseTagModal/ExerciseTagModal"
import FavoriteModal from "./FavoriteModal/FavoriteModal"
import FriendModal from "./FriendModal/FriendModal"
import IndulgenceModal from "./IndulgenceModal/IndulgenceModal"
import InterestModal from "./InterestModal/InterestModal"
import RecurrentEntryModal from "./RecurrentEntryModal/RecurrentEntryModal"
import WastedModal from "./WastedModal/WastedModal"

type Props = {}

const GlobalModals = (props: Props) => {
  return (
    <>
      <ExerciseModal />
      <FriendModal />
      <InterestModal />
      <ExerciseTagModal />
      <ClothingModal />
      <WastedModal />
      <FavoriteModal />
      <DailyIndulgencesModal />
      <IndulgenceModal />
      <DiaryEntryModal />
      <RecurrentEntryModal />
    </>
  )
}

export default GlobalModals
