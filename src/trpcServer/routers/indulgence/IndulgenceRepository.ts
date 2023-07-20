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
}
