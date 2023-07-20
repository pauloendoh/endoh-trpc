import { IndulgenceRepository } from "./IndulgenceRepository"
import { IndulgenceInput } from "./types/IndulgenceInput"

export class IndulgenceService {
  constructor(private IndulgenceRepo = new IndulgenceRepository()) {}

  async findIndulgencesByUserId(userId: string) {
    return this.IndulgenceRepo.findIndulgencesByUserId(userId)
  }

  async saveIndulgence(userId: string, Indulgence: IndulgenceInput) {
    if (Indulgence.id) {
      return this.IndulgenceRepo.updateIndulgence(Indulgence)
    }

    return this.IndulgenceRepo.createIndulgence(userId, Indulgence)
  }
}
