import myPrismaClient from "../../../utils/myPrismaClient"
import { ExerciseInput } from "./types/ExerciseInput"

export class ExerciseRepository {
  constructor(private readonly prisma = myPrismaClient) {}

  findExercises(requesterId: string) {
    return this.prisma.exercise.findMany({
      where: {
        userId: requesterId,
      },
    })
  }

  createExercise(requesterId: string, exercise: ExerciseInput) {
    return this.prisma.exercise.create({
      data: {
        userId: requesterId,
        ...exercise,
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
    return this.prisma.exercise.update({
      where: {
        id: exercise.id,
      },
      data: {
        ...exercise,
      },
    })
  }
}
