import { TRPCError } from "@trpc/server"
import { FriendRepository } from "../friend/FriendRepository"
import { FriendInterestRepository } from "./FriendInterestRepository"
import { FriendInterestInput } from "./types/FriendInterestInput"

export class FriendInterestService {
  constructor(
    private readonly friendRepo = new FriendRepository(),
    private readonly friendInterestRepository = new FriendInterestRepository()
  ) {}

  async findFriendInterests(requesterId: string, friendId: string) {
    const isFriend = await this.friendRepo.userCanAccess(requesterId, friendId)
    if (!isFriend) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You cannot access this item.",
      })
    }

    return this.friendInterestRepository.findFriendInterests(friendId)
  }

  async saveFriendInterest(
    requesterId: string,
    friendInterest: FriendInterestInput
  ) {
    const userCanAccess = await this.friendRepo.userCanAccess(
      requesterId,
      friendInterest.friendId
    )
    if (!userCanAccess) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You cannot access this item.",
      })
    }

    const exists = await this.friendInterestRepository.findUniqueFriendInterest(
      friendInterest.friendId,
      friendInterest.interestId
    )
    if (exists) {
      return this.updateFriendInterest(friendInterest)
    }
    return this.createFriendInterest(friendInterest)
  }

  async createFriendInterest(friendInterest: FriendInterestInput) {
    return this.friendInterestRepository.createFriendInterest(friendInterest)
  }

  async updateFriendInterest(friendInterest: FriendInterestInput) {
    return this.friendInterestRepository.updateFriendInterest(friendInterest)
  }

  async findGroupedFriendInterest(requesterId: string, friendId: string) {
    const isFriend = await this.friendRepo.userCanAccess(requesterId, friendId)
    if (!isFriend) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You cannot access this item.",
      })
    }

    return this.friendInterestRepository.groupedFriendInterests(friendId)
  }
}
