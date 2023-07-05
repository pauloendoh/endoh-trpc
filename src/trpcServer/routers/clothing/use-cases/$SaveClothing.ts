import myPrismaClient from "../../../../utils/myPrismaClient"
import { ClothingInput } from "../types/ClothingInput"

export class $SaveClothing {
  constructor(private readonly prisma = myPrismaClient) {}

  async exec(params: { requesterId: string; input: ClothingInput }) {
    if (params.input.id) {
      const isOwner = await this.#userOwnsClothing({
        clothingId: params.input.id,
        userId: params.requesterId,
      })
      if (!isOwner) {
        throw new Error("You are not the owner of this clothing")
      }

      return this.#updateClothing({
        input: params.input,
      })
    }

    return this.#createClothing({
      input: params.input,
      userId: params.requesterId,
    })
  }

  #userOwnsClothing(params: { userId: string; clothingId: string }) {
    return this.prisma.clothing.findFirst({
      where: {
        id: params.clothingId,
        userId: params.userId,
      },
    })
  }

  #updateClothing(params: { input: ClothingInput }) {
    return this.prisma.clothing.update({
      where: {
        id: params.input.id,
      },
      data: {
        ...params.input,
      },
    })
  }

  #createClothing(params: { userId: string; input: ClothingInput }) {
    return this.prisma.clothing.create({
      data: {
        ...params.input,
        userId: params.userId,
      },
    })
  }
}
