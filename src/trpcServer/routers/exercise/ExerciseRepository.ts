import myPrismaClient from "../../../utils/myPrismaClient"
import { ExerciseInput } from "./types/ExerciseInput"
import { TagInput } from "./types/TagInput"

export class ExerciseRepository {
  constructor(private readonly prisma = myPrismaClient) {}

  findExercises(requesterId: string) {
    return this.prisma.exercise.findMany({
      where: {
        userId: requesterId,
      },
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  }

  createExercise(requesterId: string, exercise: ExerciseInput) {
    const { tagIds, ...rest } = exercise
    return this.prisma.exercise.create({
      data: {
        user: {
          connect: {
            id: requesterId,
          },
        },
        ...rest,
        tags: {
          connect: tagIds.map((id) => ({ id })),
        },
      },
      include: {
        tags: true,
      },
    })
  }

  isOwner = async (requesterId: string, exerciseId: string) => {
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id: exerciseId,
      },
    })
    return exercise?.userId === requesterId
  }

  updateExercise(exercise: ExerciseInput) {
    const { tagIds, ...rest } = exercise
    return this.prisma.exercise.update({
      where: {
        id: exercise.id,
      },
      data: {
        ...rest,

        tags: {
          set: tagIds.map((id) => ({ id })),
        },
      },
      include: {
        tags: true,
      },
    })
  }

  createTag(requesterId: string, dto: TagInput) {
    return this.prisma.exerciseTag.create({
      data: {
        userId: requesterId,
        name: dto.name,
      },
    })
  }

  ownsTag(requesterId: string, tagId: string) {
    return this.prisma.exerciseTag.findFirst({
      where: {
        id: tagId,
        userId: requesterId,
      },
    })
  }

  updateTag(dto: TagInput) {
    return this.prisma.exerciseTag.update({
      where: {
        id: dto.id,
      },
      data: {
        name: dto.name,
      },
    })
  }

  findTags(requesterId: string) {
    return this.prisma.exerciseTag.findMany({
      where: {
        userId: requesterId,
      },
    })
  }

  updateLastCompletedAt(params: {
    exerciseId: string
    lastCompletedAt: string | null
  }) {
    return this.prisma.exercise.update({
      where: {
        id: params.exerciseId,
      },
      data: {
        lastCompletedAt: params.lastCompletedAt,
      },
      include: {
        tags: true,
      },
    })
  }
}
