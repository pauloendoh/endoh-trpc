import { DiaryRepository } from "./DiaryRepository"
import { DayConfigInput } from "./types/DayConfigInput"
import { DiaryEntryInput } from "./types/DiaryEntryInput"
import { RecurrentEntryInput } from "./types/RecurrentEntryInput"

export class DiaryService {
  constructor(private diaryRepo = new DiaryRepository()) {}

  async findDiaryEntries(userId: string) {
    return this.diaryRepo.findDiaryEntriesByUserId(userId)
  }

  async saveDiaryEntry(userId: string, input: DiaryEntryInput) {
    if (input.id) {
      const userOwns = await this.diaryRepo.userOwnsEntry(userId, input.id)
      if (!userOwns) {
        throw new Error("User does not own this entry")
      }
      return this.diaryRepo.updateDiaryEntry(input)
    }

    const myEntries = await this.diaryRepo.findDiaryEntriesByUserId(userId)

    const today = new Date(input.datetime)
    today.setHours(today.getHours() + (input.hourOffset || 0)) // reduce input.hourOffset

    const todayString = today.toISOString().split("T")[0]
    const todayEntries = myEntries.filter((entry) => {
      return (
        new Date(entry.datetime).toISOString().split("T")[0] === todayString
      )
    })

    const todaySum = todayEntries.reduce((acc, entry) => acc + entry.points, 0)

    const todayConfig = await this.getOrCreateDayConfig(userId, todayString)
    const goalPoints = todayConfig.pointsPerHour * todayConfig.availableHours
    if (todaySum >= goalPoints) {
      // push to tomorrow
      const tomorrow = new Date(today)
      tomorrow.setDate(tomorrow.getDate() + 1)
      input.datetime = tomorrow.toISOString()
      input.isFromYesterday = true
    }

    return this.diaryRepo.createDiaryEntry(userId, input)
  }

  async findRecurrentEntries(userId: string) {
    return this.diaryRepo.findRecurrentEntriesByUserId(userId)
  }

  async saveRecurrentEntry(userId: string, input: RecurrentEntryInput) {
    if (input.id) {
      const userOwns = await this.diaryRepo.userOwnsRecurrentEntry(
        userId,
        input.id
      )

      if (!userOwns) {
        throw new Error("User does not own this entry")
      }

      return this.diaryRepo.updateRecurrentEntry(input)
    }

    return this.diaryRepo.createRecurrentEntry(userId, input)
  }

  async deleteRecurrentEntry(userId: string, id: string) {
    const userOwns = await this.diaryRepo.userOwnsRecurrentEntry(userId, id)
    if (!userOwns) {
      throw new Error("User does not own this entry")
    }

    return this.diaryRepo.deleteRecurrentEntry(id)
  }

  async getOrCreateDayConfig(userId: string, date: string) {
    date = date.split("T")[0]

    const dayConfig = await this.diaryRepo.getDayConfig(userId, new Date(date))
    if (dayConfig) {
      return dayConfig
    }

    const globalConfig = await this.getOrCreateGlobalConfig(userId)

    return this.diaryRepo.createDayConfig(userId, {
      availableHours: globalConfig.availableHours,
      date: new Date(date),
      pointsPerHour: globalConfig.pointsPerHour,
      goalHour: globalConfig.goalHour,
    })
  }

  async updateDayConfig(userId: string, input: DayConfigInput) {
    const found = await this.getOrCreateDayConfig(userId, input.date)
    if (!found) {
      throw new Error("Day config not found")
    }

    return this.diaryRepo.updateDayConfig(found.id, input)
  }

  async getOrCreateGlobalConfig(userId: string) {
    const globalConfig = await this.diaryRepo.getGlobalConfig(userId)
    if (globalConfig) {
      return globalConfig
    }

    return this.diaryRepo.createGlobalConfig(userId)
  }

  async updateGlobalConfig(userId: string, input: DayConfigInput) {
    const found = await this.getOrCreateGlobalConfig(userId)
    if (!found) {
      throw new Error("Global config not found")
    }

    return this.diaryRepo.updateGlobalConfig(found.id, input)
  }
}
