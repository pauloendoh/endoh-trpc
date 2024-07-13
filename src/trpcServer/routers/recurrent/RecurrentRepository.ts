import myPrismaClient from "../../../utils/myPrismaClient"
import { RecurrentItemInput } from "./types/RecurrentItemInput"

export class RecurrentRepository {
  constructor(private db = myPrismaClient) {}

  async findRecurrentItemsByUserId(userId: string) {
    return this.db.recurrentItem.findMany({
      where: {
        userId,
      },
      orderBy: {
        everyNDays: "asc",
      },
    })
  }

  async createRecurrentItem(userId: string, recurrentItem: RecurrentItemInput) {
    return this.db.recurrentItem.create({
      data: {
        ...recurrentItem,
        userId,
      },
    })
  }

  async updateRecurrentItem(userId: string, recurrentItem: RecurrentItemInput) {
    return this.db.recurrentItem.update({
      where: {
        id: recurrentItem.id,
        userId,
      },
      data: {
        ...recurrentItem,
      },
    })
  }

  async deleteRecurrentItem(userId: string, recurrentItemId: string) {
    return this.db.recurrentItem.delete({
      where: {
        id: recurrentItemId,
        userId,
      },
    })
  }
}
