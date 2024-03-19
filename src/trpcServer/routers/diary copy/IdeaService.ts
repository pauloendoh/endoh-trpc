import { IdeaRepository } from "./IdeaRepository"
import { IdeaInput } from "./types/IdeaInput"

export class IdeaService {
  constructor(private ideaRepo = new IdeaRepository()) {}

  async findUserIdeas(userId: string) {
    return this.ideaRepo.findIdeasByUserId(userId)
  }

  async saveIdea(userId: string, input: IdeaInput) {
    if (input.id) {
      const userOwns = await this.ideaRepo.userOwnsIdea(userId, input.id)
      if (!userOwns) {
        throw new Error("User does not own this ")
      }
      return this.ideaRepo.updateIdea(input)
    }

    return this.ideaRepo.createIdea(userId, input)
  }
}
