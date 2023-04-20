import { Box, Button, Text } from "@chakra-ui/react"
import { Col, Row } from "react-grid-system"
import { useFriendsQuery } from "../../hooks/trpc/friend/useFriendsQuery"
import useFriendModalStore from "../../hooks/zustand/modals/useFriendModalStore"
import { buildFriendInput } from "../../trpcServer/routers/friend/types/FriendInput"
import FlexCenter from "../_common/flexboxes/FlexCenter"
import FlexCol from "../_common/flexboxes/FlexCol"
import FlexVCenter from "../_common/flexboxes/FlexVCenter"
import InterestsColumn from "./InterestsColumn/InterestsColumn"

type Props = {}

const FriendsPage = (props: Props) => {
  const { data: friends } = useFriendsQuery()
  const { openModal: openFriendModal } = useFriendModalStore()
  return (
    <Box>
      <Row>
        <Col sm={2}></Col>
        <Col sm={4}>
          <InterestsColumn />
        </Col>
        <Col sm={4}>
          <FlexVCenter justify={"space-between"}>
            <Text>Friends</Text>
            <Button onClick={() => openFriendModal(buildFriendInput())}>
              Add Friend
            </Button>
          </FlexVCenter>
          <FlexCol>
            {friends?.map((friend) => (
              <Button key={friend.id} onClick={() => openFriendModal(friend)}>
                <FlexCenter>{friend.name}</FlexCenter>
              </Button>
            ))}
          </FlexCol>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </Box>
  )
}

export default FriendsPage
