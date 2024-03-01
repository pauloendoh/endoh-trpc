import myPrismaClient from "../../../utils/myPrismaClient"
import { DayConfigInput } from "./types/DayConfigInput"
import { DiaryEntryInput } from "./types/DiaryEntryInput"
import { RecurrentEntryInput } from "./types/RecurrentEntryInput"

export class DiaryRepository {
  constructor(private db = myPrismaClient) {}

  async findDiaryEntriesByUserId(userId: string) {
    return this.db.diaryEntry.findMany({
      where: {
        userId,
      },
    })
  }

  async userOwnsEntry(userId: string, entryId?: string) {
    const entry = await this.db.diaryEntry.findFirst({
      where: {
        id: entryId,
        userId,
      },
    })

    return Boolean(entry)
  }

  async createDiaryEntry(userId: string, input: DiaryEntryInput) {
    return this.db.diaryEntry.create({
      data: {
        datetime: input.datetime,
        description: input.description,
        points: input.points,
        userId: userId,
        isFromYesterday: input.isFromYesterday,
      },
    })
  }

  async updateDiaryEntry(input: DiaryEntryInput) {
    return this.db.diaryEntry.update({
      where: {
        id: input.id,
      },
      data: {
        datetime: input.datetime,
        description: input.description,
        points: input.points,
      },
    })
  }

  async findRecurrentEntriesByUserId(userId: string) {
    return this.db.recurrentDiaryEntry.findMany({
      where: {
        userId,
      },
    })
  }

  async userOwnsRecurrentEntry(userId: string, recurrentEntryId?: string) {
    const entry = await this.db.recurrentDiaryEntry.findFirst({
      where: {
        id: recurrentEntryId,
        userId,
      },
    })

    return Boolean(entry)
  }

  async createRecurrentEntry(userId: string, input: RecurrentEntryInput) {
    return this.db.recurrentDiaryEntry.create({
      data: {
        description: input.description,
        points: input.points,
        userId: userId,
      },
    })
  }

  async updateRecurrentEntry(input: RecurrentEntryInput) {
    return this.db.recurrentDiaryEntry.update({
      where: {
        id: input.id,
      },
      data: {
        description: input.description,
        points: input.points,
      },
    })
  }

  async getDayConfig(userId: string, date: Date) {
    return this.db.diaryDayConfig.findFirst({
      where: {
        userId,
        date,
      },
    })
  }

  async createDayConfig(
    userId: string,
    input: {
      date: Date
      availableHours: number
      pointsPerHour: number
      goalHour: number
    }
  ) {
    return this.db.diaryDayConfig.create({
      data: {
        userId,
        date: input.date,
        availableHours: input.availableHours,
        pointsPerHour: input.pointsPerHour,
        goalHour: input.goalHour,
      },
    })
  }

  async updateDayConfig(id: string, input: DayConfigInput) {
    return this.db.diaryDayConfig.update({
      where: {
        id,
      },
      data: {
        availableHours: input.availableHours,
        pointsPerHour: input.pointsPerHour,
        goalHour: input.goalHour,
      },
    })
  }

  async getGlobalConfig(userId: string) {
    return this.db.diaryGlobalConfig.findFirst({
      where: {
        userId,
      },
    })
  }

  async createGlobalConfig(userId: string) {
    return this.db.diaryGlobalConfig.create({
      data: {
        userId,
        availableHours: 16,
        pointsPerHour: 2.5,
      },
    })
  }

  async updateGlobalConfig(id: string, input: DayConfigInput) {
    return this.db.diaryGlobalConfig.update({
      where: {
        id,
      },
      data: {
        availableHours: input.availableHours,
        pointsPerHour: input.pointsPerHour,
      },
    })
  }
}
