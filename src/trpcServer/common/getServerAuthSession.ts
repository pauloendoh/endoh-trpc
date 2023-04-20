import { GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth"
import { nextAuthOptions } from "../../utils/auth/nextAuthOptions"

export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"]
  res: GetServerSidePropsContext["res"]
}) => {
  return await getServerSession(ctx.req, ctx.res, nextAuthOptions)
}
