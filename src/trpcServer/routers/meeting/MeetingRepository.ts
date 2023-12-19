import myPrismaClient from "../../../utils/myPrismaClient"
import { MeetingItemInput } from "./types/MeetingItemInput"

export class MeetingRepository {
  constructor(private db = myPrismaClient) {}

  async findMeetingItemsByUserId(userId: string) {
    return this.db.meetingItem.findMany({
      where: {
        userId,
      },
      orderBy: {
        position: "asc",
      },
    })
  }

  async findCountOfMeetingItemsByUserId(userId: string) {
    return this.db.meetingItem.count({
      where: {
        userId,
      },
    })
  }

  async createMeetingItem(userId: string, meetingItem: MeetingItemInput) {
    return this.db.meetingItem.create({
      data: {
        ...meetingItem,
        userId,
      },
    })
  }

  async updateMeetingItem(userId: string, meetingItem: MeetingItemInput) {
    return this.db.meetingItem.update({
      where: {
        id: meetingItem.id,
        userId,
      },
      data: {
        ...meetingItem,
      },
    })
  }

  async deleteMeetingItem(userId: string, meetingItemId: string) {
    return this.db.meetingItem.delete({
      where: {
        id: meetingItemId,
        userId,
      },
    })
  }
}
