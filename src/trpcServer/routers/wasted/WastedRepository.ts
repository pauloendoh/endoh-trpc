import myPrismaClient from "../../../utils/myPrismaClient"
import { WastedInput } from "./types/WastedInput"

export class WastedRepository {
  constructor(private db = myPrismaClient) {}

  async findWastedsByUserId(userId: string) {
    return this.db.wasted.findMany({
      where: {
        userId,
      },
    })
  }

  async createWasted(userId: string, wasted: WastedInput) {
    return this.db.wasted.create({
      data: {
        ...wasted,
        userId,
      },
    })
  }

  async updateWasted(wasted: WastedInput) {
    return this.db.wasted.update({
      where: {
        id: wasted.id,
      },
      data: {
        ...wasted,
      },
    })
  }

  async userOwnsWasted(userId: string, wastedId: string) {
    const wasted = await this.db.wasted.findUnique({
      where: {
        id: wastedId,
      },
    })

    return wasted
  }
}
