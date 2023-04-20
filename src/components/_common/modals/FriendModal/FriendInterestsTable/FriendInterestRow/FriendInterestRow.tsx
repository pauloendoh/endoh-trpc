import { Td, Tr } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { useFriendInterestsQuery } from "../../../../../../hooks/trpc/friend-interest/useFriendInterestsQuery"
import { useSaveFriendInterestMutation } from "../../../../../../hooks/trpc/friend-interest/useSaveFriendInterestMutation"
import { useSaveInterestMutation } from "../../../../../../hooks/trpc/interest/useSaveInterestMutation"
import { InterestOutput } from "../../../../../../trpcServer/routers/interest/types/InterestOutput"
import MyNumberInput from "../../../../inputs/MyNumberInput"

type Props = {
  interest: InterestOutput
  friendId: string
}

const FriendInterestRow = (props: Props) => {
  const { mutateAsync: submitMyInterest } = useSaveInterestMutation()
  const { mutateAsync: submitFriendInterest } = useSaveFriendInterestMutation()
  const { data: friendInterests } = useFriendInterestsQuery({
    friendId: props.friendId,
  })

  const [localMyInterestLevel, setLocalMyInterestLevel] = useState(0)
  const [localFriendInterestLevel, setLocalFriendInterestLevel] = useState(0)

  const friendInterest = useMemo(() => {
    return friendInterests?.find(
      (fi) =>
        fi.interestId === props.interest.id && fi.friendId === props.friendId
    )
  }, [friendInterests])

  useEffect(() => {
    setLocalMyInterestLevel(props.interest.userInterestLevel || 0)
    setLocalFriendInterestLevel(friendInterest?.friendInterestLevel || 0)
  }, [friendInterest])

  return (
    <Tr>
      <Td>{props.interest.name}</Td>
      <Td isNumeric>
        <MyNumberInput
          w={20}
          min={0}
          max={3}
          value={localMyInterestLevel}
          onChange={(valueString) => {
            const value = parseInt(valueString)
            setLocalMyInterestLevel(value)
            submitMyInterest({
              id: props.interest.id,
              userInterestLevel: value,
              name: props.interest.name,
            })
          }}
        />
      </Td>

      <Td isNumeric>
        <MyNumberInput
          w={20}
          min={0}
          max={3}
          value={localFriendInterestLevel}
          onChange={(valueString) => {
            const value = parseInt(valueString)
            setLocalFriendInterestLevel(value)

            submitFriendInterest({
              friendId: props.friendId,
              interestId: props.interest.id,
              friendInterestLevel: value,
            })
          }}
        />
      </Td>
    </Tr>
  )
}

export default FriendInterestRow
