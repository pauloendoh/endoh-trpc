import { TRPCError } from "@trpc/server"
import { ExerciseRepository } from "./ExerciseRepository"
import { ExerciseInput } from "./types/ExerciseInput"
import { TagInput } from "./types/TagInput"

export class ExerciseService {
  constructor(private readonly exerciseRepository = new ExerciseRepository()) {}

  async findExercises(requesterId: string) {
    return this.exerciseRepository.findExercises(requesterId)
  }

  async saveExercise(requesterId: string, exercise: ExerciseInput) {
    if (exercise.id) {
      return this.updateExercise(requesterId, exercise)
    }
    return this.createExercise(requesterId, exercise)
  }

  async createExercise(requesterId: string, exercise: ExerciseInput) {
    return this.exerciseRepository.createExercise(requesterId, exercise)
  }

  async updateExercise(requesterId: string, exercise: ExerciseInput) {
    const isOwner = await this.exerciseRepository.isOwner(
      requesterId,
      exercise.id!
    )
    if (!isOwner) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You are not the owner of this exercise",
      })
    }
    return this.exerciseRepository.updateExercise(exercise)
  }

  async saveTag(requesterId: string, dto: TagInput) {
    if (dto.id) {
      const ownsTag = await this.exerciseRepository.ownsTag(requesterId, dto.id)
      if (!ownsTag) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not the owner of this tag",
        })
      }

      return this.exerciseRepository.updateTag(dto)
    }
    return this.exerciseRepository.createTag(requesterId, dto)
  }

  async findTags(requesterId: string) {
    return this.exerciseRepository.findTags(requesterId)
  }
}
