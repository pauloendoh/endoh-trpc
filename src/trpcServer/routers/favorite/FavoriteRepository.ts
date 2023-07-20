import myPrismaClient from "../../../utils/myPrismaClient"
import { FavoriteInput } from "./types/FavoriteInput"

export class FavoriteRepository {
  constructor(private db = myPrismaClient) {}

  async findFavoritesByUserId(userId: string) {
    return this.db.favorite.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
  }

  async createFavorite(userId: string, favorite: FavoriteInput) {
    return this.db.favorite.create({
      data: {
        ...favorite,
        userId,
      },
    })
  }

  async updateFavorite(favorite: FavoriteInput) {
    return this.db.favorite.update({
      where: {
        id: favorite.id,
      },
      data: {
        ...favorite,
      },
    })
  }

  async userOwnsFavorite(userId: string, favoriteId: string) {
    const favorite = await this.db.favorite.findUnique({
      where: {
        id: favoriteId,
      },
    })

    return favorite
  }
}
