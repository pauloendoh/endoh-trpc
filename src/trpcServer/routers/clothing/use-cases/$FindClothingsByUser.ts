import myPrismaClient from "../../../../utils/myPrismaClient"

export class $FindClothingsByUser {
  constructor(private readonly prisma = myPrismaClient) {}

  async exec(userId: string) {
    return this.prisma.clothing.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }
}
