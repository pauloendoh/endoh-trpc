import myPrismaClient from "../../../utils/myPrismaClient"
import { IdeaInput } from "./types/IdeaInput"

export class IdeaRepository {
  constructor(private db = myPrismaClient) {}

  async findIdeasByUserId(userId: string) {
    return this.db.idea.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  async userOwnsIdea(userId: string, ideaId?: string) {
    const idea = await this.db.idea.findFirst({
      where: {
        id: ideaId,
        userId,
      },
    })

    return Boolean(idea)
  }

  async createIdea(userId: string, input: IdeaInput) {
    return this.db.idea.create({
      data: {
        description: input.description,
        userId: userId,
        title: input.title,
        complexity: input.complexity,
        status: input.status,
      },
    })
  }

  async updateIdea(input: IdeaInput) {
    return this.db.idea.update({
      where: {
        id: input.id,
      },
      data: {
        description: input.description,
        title: input.title,
        complexity: input.complexity,
        status: input.status,
      },
    })
  }
}
