import { Box, Button, Container, SegmentedControl } from "@mantine/core"
import { ClothingType } from "@prisma/client"
import { useMemo, useState } from "react"
import { MdStar } from "react-icons/md"
import { useClothingsQuery } from "../../../hooks/trpc/clothing/useClothingsQuery"
import useClothingModalStore from "../../../hooks/zustand/modals/useClothingModalStore"
import { buildClothingInput } from "../../../trpcServer/routers/clothing/types/ClothingInput"
import FlexCol from "../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"
import LoggedLayout from "../../_common/layout/LoggedLayout/LoggedLayout"
import Span from "../../_common/text/Span"

type Props = {}

const ClothesPage = ({ ...props }: Props) => {
  const { data } = useClothingsQuery()

  const [clothingType, setClothingType] = useState<ClothingType>("home")

  const sortedClothings = useMemo(() => {
    if (!data) return []

    return [...data]
      .sort((a, b) => {
        return a.rating > b.rating ? -1 : 1
      })
      .filter((clothing) => {
        return clothing.type === clothingType
      })
  }, [data, clothingType])

  const { openModal } = useClothingModalStore()

  return (
    <LoggedLayout>
      <Container size="xs" mt={24}>
        <FlexVCenter justify={"space-between"}>
          <SegmentedControl
            data={[
              { value: "home", label: "Home" },
              { value: "outside", label: "Outside" },
            ]}
            value={clothingType}
            onChange={(val) => setClothingType(val as ClothingType)}
          />
          <Button
            onClick={() => {
              openModal(buildClothingInput())
            }}
          >
            Add clothing
          </Button>
        </FlexVCenter>

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

              <FlexCol
                gap={2}
                sx={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  alignItems: "flex-end",
                }}
              >
                <FlexVCenter
                  sx={{
                    color: "orange",
                    padding: "2px 4px",
                    borderRadius: 4,
                    backgroundColor: "rgba(0, 0, 0)",

                    width: "fit-content",
                  }}
                >
                  <Span size="sm">{clothing.rating}</Span>
                  <MdStar fontSize={12} />
                </FlexVCenter>
                <FlexVCenter
                  sx={{
                    color: "white",
                    padding: "2px 4px",
                    borderRadius: 4,
                    backgroundColor: "rgba(0, 0, 0)",
                  }}
                >
                  <Span size="xs">
                    {clothing.minDegree}~{clothing.maxDegree}°C
                  </Span>
                </FlexVCenter>
              </FlexCol>
            </Box>
          ))}
        </Box>
      </Container>
    </LoggedLayout>
  )
}

export default ClothesPage
