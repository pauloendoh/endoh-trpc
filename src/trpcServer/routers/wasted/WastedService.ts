import { WastedRepository } from "./WastedRepository";
import { WastedInput } from "./types/WastedInput";

export class WastedService {
  constructor(private wastedRepo = new WastedRepository()) {}

  async findWastedsByUserId(userId: string) {
    return this.wastedRepo.findWastedsByUserId(userId);
  }

  async saveWasted(userId: string, wasted: WastedInput) {
    if (wasted.id) {
      return this.wastedRepo.updateWasted(wasted);
    }

    return this.wastedRepo.createWasted(userId, wasted);
  }
}
