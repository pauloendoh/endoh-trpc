import { Button, Select } from "@mantine/core"
import { useEffect, useMemo, useState } from "react"
import { useIndulgenceSettingsQuery } from "../../../hooks/trpc/indulgence/useIndulgenceSettingsQuery"
import { useUpdateIndulgenceSettingsMutation } from "../../../hooks/trpc/indulgence/useUpdateIndulgenceSettingsMutation"
import CenterLoader from "../../_common/flexboxes/CenterLoader/CenterLoader"
import FlexVCenter from "../../_common/flexboxes/FlexVCenter"
import MyNumberInputV2 from "../../_common/inputs/MyNumberInputV2"

type Props = {}

const IndulgenceSettingsInputs = ({ ...props }: Props) => {
  const { data: settings, isLoading } = useIndulgenceSettingsQuery()
  const [hasFirstLoaded, setHasFirstLoaded] = useState(false)

  const [resetDay, setResetDay] = useState("0")
  const [maxPoints, setMaxPoints] = useState(0)

  useEffect(() => {
    if (!hasFirstLoaded && settings) {
      setHasFirstLoaded(true)
      setMaxPoints(settings.maxPointsPerWeek)
    }
  }, [settings])

  const days = useMemo(
    () => [
      {
        value: "0",
        label: "Sunday",
      },
      {
        value: "1",
        label: "Monday",
      },
      {
        value: "2",
        label: "Tuesday",
      },
      {
        value: "3",
        label: "Wednesday",
      },
      {
        value: "4",
        label: "Thursday",
      },
      {
        value: "5",
        label: "Friday",
      },
      {
        value: "6",
        label: "Saturday",
      },
    ],
    []
  )

  const saveIsDisabled = useMemo(() => {
    return (
      maxPoints === settings?.maxPointsPerWeek &&
      Number(resetDay) === settings?.resetsOnDay
    )
  }, [maxPoints, resetDay, settings])

  const { mutate, isLoading: isSaving } = useUpdateIndulgenceSettingsMutation()

  if (isLoading) return <CenterLoader />

  return (
    <FlexVCenter className="IndulgenceSettingsInputs" gap={4} align="flex-end">
      <MyNumberInputV2
        styles={{
          wrapper: {
            width: 100,
          },
        }}
        label="Max points"
        value={maxPoints}
        onChange={(e) => {
          setMaxPoints(e)
        }}
        precision={1}
      />

      <Select
        w={130}
        data={days}
        label="Reset day"
        value={resetDay}
        onChange={(e) => {
          if (e === null) return
          setResetDay(e)
        }}
      />

      <Button
        disabled={saveIsDisabled}
        loading={isSaving}
        onClick={() => {
          mutate({
            maxPointsPerWeek: maxPoints,
            resetsOnDay: Number(resetDay),
          })
        }}
      >
        Save
      </Button>
    </FlexVCenter>
  )
}

export default IndulgenceSettingsInputs
