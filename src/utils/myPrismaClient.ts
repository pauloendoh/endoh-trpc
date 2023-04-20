import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as {
  myPrismaClient: PrismaClient | undefined
}

const myPrismaClient =
  globalForPrisma.myPrismaClient ??
  new PrismaClient({
    // log: ["query"],
  })

if (process.env.NODE_ENV !== "production")
  globalForPrisma.myPrismaClient = myPrismaClient

export default myPrismaClient
