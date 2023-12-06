import { IndulgenceRepository } from "./IndulgenceRepository"
import { IndulgenceInput } from "./types/IndulgenceInput"
import { IndulgenceSettingsInput } from "./types/IndulgenceSettingsInput"

export class IndulgenceService {
  constructor(private indulgenceRepo = new IndulgenceRepository()) {}

  async findIndulgencesByUserId(userId: string) {
    return this.indulgenceRepo.findIndulgencesByUserId(userId)
  }

  async saveIndulgence(userId: string, Indulgence: IndulgenceInput) {
    if (Indulgence.id) {
      return this.indulgenceRepo.updateIndulgence(Indulgence)
    }

    return this.indulgenceRepo.createIndulgence(userId, Indulgence)
  }

  async fetchOrCreateIndulgenceSettings(userId: string) {
    const settings = await this.indulgenceRepo.fetchIndulgenceSettings(userId)
    if (!settings) {
      return this.indulgenceRepo.createIndulgenceSettings(userId)
    }

    return settings
  }

  async updateIndulgenceSettings(
    userId: string,
    input: IndulgenceSettingsInput
  ) {
    return this.indulgenceRepo.updateIndulgenceSettings(userId, input)
  }
}
