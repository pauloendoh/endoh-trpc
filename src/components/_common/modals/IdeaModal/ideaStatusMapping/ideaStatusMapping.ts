import { IdeaStatus } from "@prisma/client"

export const ideaStatusRecord: Record<
  IdeaStatus,
  {
    label: string
  }
> = {
  WOULD_NOW: {
    label: "Would now",
  },
  WOULD_LATER: {
    label: "Would later",
  },
  COMPLETED: {
    label: "Completed",
  },
  ARCHIVED: {
    label: "Archived",
  },
}

export const ideaStatusList = Object.entries(ideaStatusRecord).map(
  ([value, data]) => ({
    value,
    label: data.label,
  })
)
