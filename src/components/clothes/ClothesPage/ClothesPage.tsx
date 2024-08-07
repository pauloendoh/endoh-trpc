import { Box, Button, Container, SegmentedControl } from "@mantine/core"
import { useLocalStorage } from "@mantine/hooks"
import { ClothingType } from "@prisma/client"
import { useMemo, useState } from "react"
import { MdHome, MdStar } from "react-icons/md"
import { useClothingsQuery } from "../../../hooks/trpc/clothing/useClothingsQuery"
import useClothingModalStore from "../../../hooks/zustand/modals/useClothingModalStore"
import { buildClothingInput } from "../../../trpcServer/routers/clothing/types/ClothingInput"
import { localStorageKeys } from "../../../utils/localStorageKeys"
import FlexCol from "../../_common/flexboxes/FlexCol"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"
import LoggedLayout from "../../_common/layout/LoggedLayout/LoggedLayout"
import Span from "../../_common/text/Span"

// PE 2/3
const ClothesPage = () => {
  const { data } = useClothingsQuery()

  const [currentTemp, setCurrentTemp] = useLocalStorage<number>({
    key: localStorageKeys.clothingTemp,
    defaultValue: 20,
  })

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
              {
                label: (
                  <FlexVCenter gap={2}>
                    <MdHome />
                    <Span>Home</Span>
                  </FlexVCenter>
                ),
                value: "home",
              },
              { value: "outside", label: "Outside" },
            ]}
            value={clothingType}
            onChange={(val) => setClothingType(val as ClothingType)}
          />

          <Button
            variant="subtle"
            onClick={() => {
              const temp = prompt(
                "Enter current temperature",
                currentTemp?.toString()
              )

              if (!temp) return

              const tempNum = Number(temp)
              if (isNaN(tempNum)) return

              setCurrentTemp(tempNum)
            }}
          >
            {currentTemp}°C
          </Button>

          <Button
            onClick={() => {
              openModal(buildClothingInput())
            }}
          >
            + Add
          </Button>
        </FlexVCenter>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",

            marginTop: 16,
          }}
        >
          {/* PE 2/3 - move to different component  */}
          {sortedClothings.map((clothing, i) => {
            const isWithinTemp =
              currentTemp &&
              clothing.minDegree <= currentTemp &&
              clothing.maxDegree >= currentTemp
            return (
              <Box
                key={clothing.id}
                sx={{
                  position: "relative",
                  opacity: isWithinTemp ? 1 : 0.25,
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
            )
          })}
        </Box>
      </Container>
    </LoggedLayout>
  )
}

export default ClothesPage
