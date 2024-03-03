import { Button, Flex, Text } from "@mantine/core"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { useDayConfigQuery } from "../../../../../hooks/trpc/diary/useDayConfigQuery"
import { useUpdateDayConfigMutation } from "../../../../../hooks/trpc/diary/useUpdateDayConfigMutation"
import { DayConfigInput } from "../../../../../trpcServer/routers/diary/types/DayConfigInput"
import MyNumberInputV2 from "../../../inputs/MyNumberInputV2"

type Props = {}

const UpdateDayConfigSection = ({ ...props }: Props) => {
  const today = new Date().toISOString().split("T")[0]

  const { data: todayConfig } = useDayConfigQuery()

  const form = useForm<DayConfigInput>({
    defaultValues: todayConfig,
  })

  useEffect(() => {
    form.reset(todayConfig)
  }, [todayConfig])

  const multiplicationResult = useMemo(() => {
    return form.watch("pointsPerHour") * form.watch("availableHours")
  }, [form.watch("pointsPerHour"), form.watch("availableHours")])

  const { mutate: submitUpdate, isLoading } = useUpdateDayConfigMutation()

  return (
    <div className="UpdateDayConfigSection">
      <div>Today {today}</div>
      <form
        onSubmit={form.handleSubmit((values) => {
          submitUpdate(values)
        })}
      >
        <Flex gap={8} mt={16}>
          <MyNumberInputV2
            label="Available hours"
            w={100}
            onChange={(value) =>
              form.setValue("availableHours", value, {
                shouldDirty: true,
              })
            }
            precision={0}
            value={form.watch("availableHours")}
          />

          <MyNumberInputV2
            label="Points per hour"
            w={100}
            onChange={(value) =>
              form.setValue("pointsPerHour", value, {
                shouldDirty: true,
              })
            }
            precision={2}
            value={form.watch("pointsPerHour")}
          />
          <Text mt={28}>Total: {multiplicationResult}</Text>
        </Flex>
        <Button
          mt={16}
          disabled={form.formState.isDirty === false}
          loading={isLoading}
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  )
}

export default UpdateDayConfigSection
