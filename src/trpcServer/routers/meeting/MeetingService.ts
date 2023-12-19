import { MeetingRepository } from "./MeetingRepository"
import { MeetingItemInput } from "./types/MeetingItemInput"

export class MeetingService {
  constructor(private meetingRepo = new MeetingRepository()) {}

  async findMeetingItemsByUserId(userId: string) {
    return this.meetingRepo.findMeetingItemsByUserId(userId)
  }

  async saveMeetingItem(userId: string, input: MeetingItemInput) {
    const count = await this.meetingRepo.findCountOfMeetingItemsByUserId(userId)

    if (input.id) {
      return this.meetingRepo.updateMeetingItem(userId, input)
    }

    input.position = count
    return this.meetingRepo.createMeetingItem(userId, input)
  }

  async deleteMeetingItem(userId: string, meetingItemId: string) {
    return this.meetingRepo.deleteMeetingItem(userId, meetingItemId)
  }
}
