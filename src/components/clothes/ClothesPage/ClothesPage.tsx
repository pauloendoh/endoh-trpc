import { Button, Flex } from "@mantine/core"
import { useMemo } from "react"
import { Container } from "react-grid-system"
import { useClothingsQuery } from "../../../hooks/trpc/clothing/useClothingsQuery"
import useClothingModalStore from "../../../hooks/zustand/modals/useClothingModalStore"
import { buildClothingInput } from "../../../trpcServer/routers/clothing/types/ClothingInput"
import LoggedLayout from "../../_common/layout/LoggedLayout/LoggedLayout"

type Props = {}

const ClothesPage = ({ ...props }: Props) => {
  const { data } = useClothingsQuery()
  const sortedClothings = useMemo(() => {
    if (!data) return []
    return data.sort((a, b) => {
      return a.createdAt > b.createdAt ? -1 : 1
    })
  }, [data])

  const { openModal } = useClothingModalStore()
  return (
    <LoggedLayout>
      <Container>
        <h1>Clothes</h1>
        <Button
          onClick={() => {
            openModal(buildClothingInput())
          }}
        >
          Add clothing
        </Button>

        <Flex>
          {sortedClothings.map((clothing) => (
            <img
              style={{
                cursor: "pointer",
              }}
              key={clothing.id}
              src={clothing.imageUrl}
              onClick={() => {
                openModal(clothing)
              }}
            />
          ))}
        </Flex>
      </Container>
    </LoggedLayout>
  )
}

export default ClothesPage
