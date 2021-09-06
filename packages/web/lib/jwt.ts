import { User } from '@prisma/client'
import { sign, verify } from 'jsonwebtoken'

export const signJwt = (user: User): string =>
  sign(
    {
      id: user.id
    },
    process.env.TOKEN_SECRET
  )

type AuthToken = {
  id: number
}

export const verifyJwt = (token: string): AuthToken =>
  verify(token, process.env.TOKEN_SECRET) as AuthToken
