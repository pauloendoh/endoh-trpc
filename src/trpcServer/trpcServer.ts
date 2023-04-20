import { initTRPC } from "@trpc/server"
import { ZodError } from "zod"
import { TrpcContext } from "./TrpcContext"
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const trpcServer = initTRPC.context<TrpcContext>().create({
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "BAD_REQUEST" && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    }
  },
})
// Base router and procedure helpers
export const router = trpcServer.router
export const procedure = trpcServer.procedure

export default trpcServer
