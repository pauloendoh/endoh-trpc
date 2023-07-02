import { Table } from "@mantine/core"
import { useMemo } from "react"
import { useFriendInterestsQuery } from "../../../../../hooks/trpc/friend-interest/useFriendInterestsQuery"
import { useInterestsQuery } from "../../../../../hooks/trpc/interest/useInterestsQuery"
import FlexVCenter from "../../../flexboxes/FlexVCenter"
import FriendInterestRow from "./FriendInterestRow/FriendInterestRow"

type Props = {
  friendId: string
}

const FriendInterestsTable = (props: Props) => {
  const { data: interests } = useInterestsQuery()
  const sortedInterests = useMemo(() => {
    return interests?.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1
      }
      if (a.createdAt < b.createdAt) {
        return 1
      }
      return 0
    })
  }, [interests])

  const { data: friendInterests } = useFriendInterestsQuery({
    friendId: props.friendId,
  })
  const groupedFriendInterests = useMemo(() => {
    if (!friendInterests) return null
    const sum = friendInterests.reduce((acc, curr) => {
      return curr.friendInterestLevel + acc
    }, 0)

    return { avg: sum / friendInterests.length, count: friendInterests.length }
  }, [friendInterests])

  return (
    <Table variant="simple">
      <thead>
        <tr>
          <th>Interest</th>
          <th
            style={{
              width: 96,
            }}
          >
            You
          </th>
          <th
            style={{
              width: 96,
            }}
          >
            Them
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedInterests?.map((interest) => (
          <FriendInterestRow
            key={interest.id}
            interest={interest}
            friendId={props.friendId}
          />
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th>
            {" "}
            {groupedFriendInterests && (
              <FlexVCenter>
                {groupedFriendInterests.count} interests, average level{" "}
                {groupedFriendInterests.avg.toFixed(2)}
              </FlexVCenter>
            )}
          </th>
        </tr>
      </tfoot>
    </Table>
  )
}

export default FriendInterestsTable
