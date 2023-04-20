import { initTRPC } from "@trpc/server"
import { TrpcContext } from "./TrpcContext"
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const trpcServer = initTRPC.context<TrpcContext>().create()
// Base router and procedure helpers
export const router = trpcServer.router
export const procedure = trpcServer.procedure

export default trpcServer
