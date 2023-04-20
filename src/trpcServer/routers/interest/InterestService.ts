import { TRPCError } from "@trpc/server"
import { InterestRepository } from "./InterestRepository"
import { InterestInput } from "./types/InterestInput"

export class InterestService {
  constructor(private readonly interestRepository = new InterestRepository()) {}

  async findInterests(requesterId: string) {
    return this.interestRepository.findInterests(requesterId)
  }

  async saveInterest(requesterId: string, interest: InterestInput) {
    if (interest.id) {
      return this.updateInterest(requesterId, interest)
    }
    return this.createInterest(requesterId, interest)
  }

  async createInterest(requesterId: string, interest: InterestInput) {
    return this.interestRepository.createInterest(requesterId, interest)
  }

  async updateInterest(requesterId: string, interest: InterestInput) {
    const isOwner = await this.interestRepository.isOwner(
      requesterId,
      interest.id!
    )
    if (!isOwner) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not the owner of this interest",
      })
    }
    return this.interestRepository.updateInterest(interest)
  }
}
