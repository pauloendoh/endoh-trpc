import { TRPCError } from "@trpc/server"
import { FriendRepository } from "./FriendRepository"
import { FriendInput } from "./types/FriendInput"

export class FriendService {
  constructor(private readonly friendRepository = new FriendRepository()) {}

  async findFriends(requesterId: string) {
    return this.friendRepository.findFriends(requesterId)
  }

  async saveFriend(requesterId: string, friend: FriendInput) {
    if (friend.id) {
      return this.updateFriend(requesterId, friend)
    }
    return this.createFriend(requesterId, friend)
  }

  async createFriend(requesterId: string, friend: FriendInput) {
    return this.friendRepository.createFriend(requesterId, friend)
  }

  async updateFriend(requesterId: string, friend: FriendInput) {
    const isOwner = await this.friendRepository.userCanAccess(
      requesterId,
      friend.id!
    )
    if (!isOwner) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not the owner of this friend",
      })
    }
    return this.friendRepository.updateFriend(friend)
  }
}
