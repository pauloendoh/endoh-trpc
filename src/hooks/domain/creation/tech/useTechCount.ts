import useCreationsQuery from "@/hooks/react-query/creation/useCreationsQuery"
import { useMemo } from "react"

interface ITechCount {
  techName: string
  count: number
}

const useTechCount = () => {
  const { data: creations } = useCreationsQuery()

  const techCount: ITechCount[] = useMemo(() => {
    if (creations && creations.length > 0) {
      let techCount: ITechCount[] = []

      for (const creation of creations) {
        for (const tech of creation.technologies) {
          const index = techCount.findIndex((t) => t.techName === tech)
          if (~index) {
            techCount[index].count++
          } else techCount.push({ techName: tech, count: 1 })
        }
      }

      // return in descending order
      return techCount.sort((a, b) => (a.count > b.count ? -1 : 1))
    }
    return []
  }, [creations])

  return techCount
}

export default useTechCount
