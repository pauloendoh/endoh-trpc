import { Button, Text } from "@mantine/core"
import { useInterestsQuery } from "../../../hooks/trpc/interest/useInterestsQuery"
import useInterestModalStore from "../../../hooks/zustand/modals/useInterestModalStore"
import { buildInterestInput } from "../../../trpcServer/routers/interest/types/InterestInput"
import FlexCol from "../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"

type Props = {}

const InterestsColumn = (props: Props) => {
  const { openModal } = useInterestModalStore()
  const { data: interests } = useInterestsQuery()
  return (
    <FlexCol gap={2}>
      <FlexVCenter justify={"space-between"}>
        <Text>Interests</Text>
        <Button onClick={() => openModal(buildInterestInput())}>
          Add Interest
        </Button>
      </FlexVCenter>
      <FlexCol>
        {interests?.map((interest) => (
          <Button key={interest.id} onClick={() => openModal(interest)}>
            {interest.name} ({interest.userInterestLevel})
          </Button>
        ))}
      </FlexCol>
    </FlexCol>
  )
}

export default InterestsColumn
