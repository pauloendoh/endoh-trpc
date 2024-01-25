import { WastedInput } from "./types/WastedInput"
import { WastedRepository } from "./WastedRepository"

export class WastedService {
  constructor(private wastedRepo = new WastedRepository()) {}

  async findWastedsByUserId(userId: string) {
    return this.wastedRepo.findWastedsByUserId(userId)
  }

  async saveWasted(userId: string, wasted: WastedInput) {
    if (wasted.id) {
      return this.wastedRepo.updateWasted(wasted)
    }

    return this.wastedRepo.createWasted(userId, wasted)
  }

  async getAverageDailyWaste(userId: string) {
    return this.wastedRepo.getAverageDailyWaste(userId)
  }

  async getExtraWastedLast30Days(userId: string) {
    const [wasteds, averageWastePerDay] = await Promise.all([
      this.findWastedsByUserId(userId),
      this.wastedRepo.getAverageDailyWaste(userId),
    ])

    const dateAt30DaysAgo = new Date()
    dateAt30DaysAgo.setDate(new Date().getDate() - 30)

    const last30DaysWasted = wasteds.filter((wasted) => {
      const wastedDate = new Date(wasted.createdAt)
      return wastedDate >= dateAt30DaysAgo
    })

    const groupedByDay = last30DaysWasted.reduce((acc, wasted) => {
      const wastedDate = new Date(wasted.createdAt)
      const day = wastedDate.getDate()

      const dayWasted = acc[day] || 0
      acc[day] = dayWasted + wasted.minutes

      return acc
    }, {} as Record<number, number>)

    let extraWastedLast30Days = 0

    Object.entries(groupedByDay).forEach(([day, totalWastedAtDay]) => {
      const extraWasted = totalWastedAtDay - averageWastePerDay

      if (extraWasted > 0) {
        extraWastedLast30Days += extraWasted
      }
    })

    return extraWastedLast30Days
  }
}
