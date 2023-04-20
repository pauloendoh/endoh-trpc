import { NextApiHandler } from "next"
import NextAuth from "next-auth"
import { nextAuthOptions } from "../../../utils/auth/nextAuthOptions"

const authHandler: NextApiHandler = (req, res) =>
  NextAuth(req, res, nextAuthOptions)
export default authHandler
