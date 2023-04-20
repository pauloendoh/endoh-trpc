import CreationDto from "@/types/domain/creation/CreationDto"
import myPrismaClient from "@/utils/myPrismaClient"
import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

const prisma = myPrismaClient

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (session) {
    if (req.method === "POST" || req.method === "PUT") {
      const body: CreationDto = req.body

      const creation = await prisma.creation.upsert({
        where: {
          id_userId: {
            id: body.id || 0,
            userId: session.user.id,
          },
        },
        create: {
          userId: session.user.id,
          ...body,
          date: body.date,
        },
        update: {
          ...body,
          date: body.date,
        },
      })

      res.status(200).json(creation)
    }

    if (req.method === "GET") {
      const userCreations = await prisma.creation.findMany({
        where: {
          userId: session.user.id,
        },
      })
      res.status(200).json(userCreations)
    }
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
