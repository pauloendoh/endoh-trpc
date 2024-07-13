import { RecurrentRepository } from "./RecurrentRepository"
import { RecurrentItemInput } from "./types/RecurrentItemInput"

export class RecurrentService {
  constructor(private recurrentRepo = new RecurrentRepository()) {}

  async findRecurrentItemsByUserId(userId: string) {
    return this.recurrentRepo.findRecurrentItemsByUserId(userId)
  }

  async saveRecurrentItem(userId: string, input: RecurrentItemInput) {
    if (input.id) {
      return this.recurrentRepo.updateRecurrentItem(userId, input)
    }

    return this.recurrentRepo.createRecurrentItem(userId, input)
  }

  async deleteRecurrentItem(userId: string, recurrentItemId: string) {
    return this.recurrentRepo.deleteRecurrentItem(userId, recurrentItemId)
  }
}
