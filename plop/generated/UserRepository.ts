import myPrismaClient from "../../../utils/myPrismaClient"
import { UserInput } from "./types/UserInput"

export class UserRepository {
  constructor(private readonly prisma = myPrismaClient) {}

  findUsers(requesterId: string) {
    return this.prisma.User.findMany({
      where: {
        userId: requesterId,
      },
    })
  }

  createUser(requesterId: string, User: UserInput) {
    return this.prisma.User.create({
      data: {
        userId: requesterId,
        ...User,
      },
    })
  }

  isOwner = async (requesterId: string, UserId: string) => {
    const User = await this.prisma.User.findUnique({
      where: {
        id: UserId,
      },
    })
    return User?.userId === requesterId
  }

  updateUser(User: UserInput) {
    return this.prisma.User.update({
      where: {
        id: User.id,
      },
      data: {
        ...User,
      },
    })
  }
}
