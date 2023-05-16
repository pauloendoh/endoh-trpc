import { TRPCError } from "@trpc/server"
import { UserRepository } from "./UserRepository"
import { UserInput } from "./types/UserInput"

export class UserService {
  constructor(private readonly userRepository = new UserRepository()) {}

  async findUsers(requesterId: string) {
    return this.userRepository.findUsers(requesterId)
  }

  async saveUser(requesterId: string, user: UserInput) {
    if (user.id) {
      return this.updateUser(requesterId, user)
    }
    return this.createUser(requesterId, user)
  }

  async createUser(requesterId: string, user: UserInput) {
    return this.userRepository.createUser(requesterId, user)
  }

  async updateUser(requesterId: string, user: UserInput) {
    const isOwner = await this.userRepository.isOwner(
      requesterId,
      user.id!
    )
    if (!isOwner) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not the owner of this user",
      })
    }
    return this.userRepository.updateUser(user)
  }
}
