import { WastedInput } from "./types/WastedInput"
import { WastedRepository } from "./WastedRepository"

export class WastedService {
  constructor(private wastedRepo = new WastedRepository()) {}

  async findWastedsByUserId(userId: string) {
    return this.wastedRepo.findWastedsByUserId(userId)
  }

  async saveWasted(userId: string, wasted: WastedInput) {
    if (wasted.id) {
      return this.wastedRepo.updateWasted(wasted)
    }

    return this.wastedRepo.createWasted(userId, wasted)
  }

  async getAverageDailyWaste(userId: string) {
    return this.wastedRepo.getAverageDailyWaste(userId)
  }
}
