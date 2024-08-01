import { Box, Button, Container } from "@mantine/core"
import { useMemo } from "react"
import { MdStar } from "react-icons/md"
import { useClothingsQuery } from "../../../hooks/trpc/clothing/useClothingsQuery"
import useClothingModalStore from "../../../hooks/zustand/modals/useClothingModalStore"
import { buildClothingInput } from "../../../trpcServer/routers/clothing/types/ClothingInput"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"
import LoggedLayout from "../../_common/layout/LoggedLayout/LoggedLayout"
import Span from "../../_common/text/Span"

type Props = {}

const ClothesPage = ({ ...props }: Props) => {
  const { data } = useClothingsQuery()
  const sortedClothings = useMemo(() => {
    if (!data) return []
    return data.sort((a, b) => {
      return a.rating > b.rating ? -1 : 1
    })
  }, [data])

  const { openModal } = useClothingModalStore()
  return (
    <LoggedLayout>
      <Container size="xs">
        <h1>Clothes</h1>
        <Button
          onClick={() => {
            openModal(buildClothingInput())
          }}
        >
          Add clothing
        </Button>

        {/* 3 columns grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",

            marginTop: 16,
          }}
        >
          {sortedClothings.map((clothing, i) => (
            <Box
              key={clothing.id}
              sx={{
                position: "relative",
              }}
            >
              <img
                alt={`clothing-${i}`}
                style={{
                  objectFit: "cover",
                  borderRadius: 4,

                  width: "100%",
                  aspectRatio: "1/1",
                }}
                key={clothing.id}
                src={clothing.imageUrl}
                onClick={() => {
                  openModal(clothing)
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                }}
              >
                <FlexVCenter
                  sx={{
                    color: "orange",
                    padding: "2px 4px",
                    borderRadius: 4,
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Span size="sm">{clothing.rating}</Span>
                  <MdStar fontSize={12} />
                </FlexVCenter>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </LoggedLayout>
  )
}

export default ClothesPage
