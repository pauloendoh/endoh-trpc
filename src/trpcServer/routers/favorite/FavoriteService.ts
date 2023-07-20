import { FavoriteRepository } from "./FavoriteRepository";
import { FavoriteInput } from "./types/FavoriteInput";

export class FavoriteService {
  constructor(private favoriteRepo = new FavoriteRepository()) {}

  async findFavoritesByUserId(userId: string) {
    return this.favoriteRepo.findFavoritesByUserId(userId);
  }

  async saveFavorite(userId: string, favorite: FavoriteInput) {
    if (favorite.id) {
      return this.favoriteRepo.updateFavorite(favorite);
    }

    return this.favoriteRepo.createFavorite(userId, favorite);
  }
}
