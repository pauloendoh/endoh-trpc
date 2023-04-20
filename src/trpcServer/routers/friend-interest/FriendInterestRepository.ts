import myPrismaClient from "../../../utils/myPrismaClient"
import { FriendInterestInput } from "./types/FriendInterestInput"

export class FriendInterestRepository {
  constructor(private readonly prisma = myPrismaClient) {}

  findFriendInterests(friendId: string) {
    return this.prisma.friendInterest.findMany({
      where: {
        friendId: friendId,
      },
    })
  }

  async findUniqueFriendInterest(friendId: string, interestId: string) {
    return this.prisma.friendInterest.findUnique({
      where: {
        friendId_interestId: {
          friendId: friendId,
          interestId: interestId,
        },
      },
    })
  }

  createFriendInterest(friendInterest: FriendInterestInput) {
    return this.prisma.friendInterest.create({
      data: {
        ...friendInterest,
      },
    })
  }

  updateFriendInterest(friendInterest: FriendInterestInput) {
    return this.prisma.friendInterest.update({
      where: {
        friendId_interestId: {
          friendId: friendInterest.friendId,
          interestId: friendInterest.interestId,
        },
      },
      data: {
        ...friendInterest,
      },
    })
  }

  async groupedFriendInterests(friendId: string) {
    return this.prisma.friendInterest.groupBy({
      where: {
        friendId,
      },
      by: ["friendId"],
      _avg: {
        friendInterestLevel: true,
      },
      _count: {
        friendInterestLevel: true,
      },
    })
  }
}
