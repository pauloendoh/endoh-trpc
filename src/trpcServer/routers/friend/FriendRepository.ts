import myPrismaClient from "../../../utils/myPrismaClient"
import { FriendInput } from "./types/FriendInput"

export class FriendRepository {
  constructor(private readonly prisma = myPrismaClient) {}

  findFriends(requesterId: string) {
    return this.prisma.friend.findMany({
      where: {
        userId: requesterId,
      },
    })
  }

  createFriend(requesterId: string, friend: FriendInput) {
    return this.prisma.friend.create({
      data: {
        userId: requesterId,
        ...friend,
      },
    })
  }

  userCanAccess = async (requesterId: string, friendId: string) => {
    const friend = await this.prisma.friend.findUnique({
      where: {
        id: friendId,
      },
    })
    return friend?.userId === requesterId
  }

  updateFriend(friend: FriendInput) {
    return this.prisma.friend.update({
      where: {
        id: friend.id,
      },
      data: {
        ...friend,
      },
    })
  }
}
