import { Button, Container } from "@mantine/core"
import { useMemo } from "react"
import { useIdeasQuery } from "../../hooks/trpc/ideas/useIdeasQuery"
import useIdeaModalStore from "../../hooks/zustand/modals/useIdeaModalStore"
import { buildIdeaInput } from "../../trpcServer/routers/diary copy/types/IdeaInput"
import CenterLoader from "../_common/flexboxes/CenterLoader/CenterLoader"
import FlexCol from "../_common/flexboxes/FlexCol"
import LoggedLayout from "../_common/layout/LoggedLayout/LoggedLayout"

type Props = {}

const IdeasPage = ({ ...props }: Props) => {
  const { openModal } = useIdeaModalStore()

  const { data, isLoading } = useIdeasQuery()

  const sortedIdeas = useMemo(() => {
    return data?.sort((a, b) => {
      // desc
      return a.createdAt > b.createdAt ? -1 : 1
    })
  }, [data])

  return (
    <LoggedLayout>
      <Container mt={20}>
        <Button onClick={() => openModal(buildIdeaInput())}>+ Add Idea</Button>
        <FlexCol gap={16} mt={24}>
          {isLoading && <CenterLoader />}
          {sortedIdeas?.map((idea) => (
            <div key={idea.id}>{idea.title}</div>
          ))}
        </FlexCol>
      </Container>
    </LoggedLayout>
  )
}

export default IdeasPage
