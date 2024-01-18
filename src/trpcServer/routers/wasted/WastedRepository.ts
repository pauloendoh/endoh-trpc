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

  async getAverageDailyWaste(userId: string) {
    const data = await this.db.$queryRaw<
      {
        average: number
      }[]
    >`SELECT  cast(ceil(avg("total")) as integer)	as average
      FROM (
          SELECT to_char(w."createdAt", 'YYYY-MM-DD'),
                 sum(minutes)  AS total
            FROM "Wasted" w 
           WHERE "userId" = ${userId}
        GROUP BY to_char("createdAt", 'YYYY-MM-DD')
      )AS RESULT 
    `

    const average = data[0].average
    return average
  }
}
