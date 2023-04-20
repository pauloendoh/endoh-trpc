import myPrismaClient from "../../../utils/myPrismaClient"
import { InterestInput } from "./types/InterestInput"

export class InterestRepository {
  constructor(private readonly prisma = myPrismaClient) {}

  findInterests(requesterId: string) {
    return this.prisma.interest.findMany({
      where: {
        userId: requesterId,
      },
    })
  }

  createInterest(requesterId: string, interest: InterestInput) {
    return this.prisma.interest.create({
      data: {
        userId: requesterId,
        ...interest,
      },
    })
  }

  isOwner = async (requesterId: string, interestId: string) => {
    const interest = await this.prisma.interest.findUnique({
      where: {
        id: interestId,
      },
    })
    return interest?.userId === requesterId
  }

  updateInterest(interest: InterestInput) {
    return this.prisma.interest.update({
      where: {
        id: interest.id,
      },
      data: {
        ...interest,
      },
    })
  }
}
