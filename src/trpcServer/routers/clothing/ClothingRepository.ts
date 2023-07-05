import myPrismaClient from "../../../utils/myPrismaClient"

export class ClothingRepository {
  constructor(private readonly prisma = myPrismaClient) {}

  // findManyByUserId(userId: string) {
  //   return this.prisma.clothing.findMany({
  //     where: {
  //       userId,
  //     },
  //     orderBy: {
  //       createdAt: "desc",
  //     },
  //   })
  // }

  // #createClothing(params: { userId: string; input: ClothingInput }) {
  //   return this.prisma.clothing.create({
  //     data: {
  //       ...params.input,
  //       userId: params.userId,
  //     },
  //   })
  // }

  // updateClothing(params: { input: ClothingInput }) {
  //   return this.prisma.clothing.update({
  //     where: {
  //       id: params.input.id,
  //     },
  //     data: {
  //       ...params.input,
  //     },
  //   })
  // }

  // isOwner(params: { userId: string; clothingId: string }) {
  //   return this.prisma.clothing.findFirst({
  //     where: {
  //       id: params.clothingId,
  //       userId: params.userId,
  //     },
  //   })
  // }
}
