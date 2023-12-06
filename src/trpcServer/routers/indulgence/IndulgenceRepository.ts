import myPrismaClient from "../../../utils/myPrismaClient"
import { IndulgenceInput } from "./types/IndulgenceInput"

export class IndulgenceRepository {
  constructor(private db = myPrismaClient) {}

  async findIndulgencesByUserId(userId: string) {
    return this.db.indulgence.findMany({
      where: {
        userId,
      },
    })
  }

  async createIndulgence(userId: string, indulgence: IndulgenceInput) {
    return this.db.indulgence.create({
      data: {
        ...indulgence,
        userId,
      },
    })
  }

  async updateIndulgence(indulgence: IndulgenceInput) {
    return this.db.indulgence.update({
      where: {
        id: indulgence.id,
      },
      data: {
        ...indulgence,
      },
    })
  }

  async userOwnsIndulgence(userId: string, IndulgenceId: string) {
    const Indulgence = await this.db.indulgence.findUnique({
      where: {
        id: IndulgenceId,
      },
    })

    return Indulgence
  }

  async fetchIndulgenceSettings(userId: string) {
    const IndulgenceSettings = await this.db.indulgenceSettings.findUnique({
      where: {
        userId,
      },
    })

    return IndulgenceSettings
  }

  async createIndulgenceSettings(userId: string) {
    const IndulgenceSettings = await this.db.indulgenceSettings.create({
      data: {
        userId,
        maxPointsPerWeek: 0,
        resetsOnDay: 1,
      },
    })

    return IndulgenceSettings
  }

  async updateIndulgenceSettings(
    userId: string,
    input: { maxPointsPerWeek: number; resetsOnDay: number }
  ) {
    const IndulgenceSettings = await this.db.indulgenceSettings.update({
      where: {
        userId,
      },
      data: {
        ...input,
      },
    })

    return IndulgenceSettings
  }
}
