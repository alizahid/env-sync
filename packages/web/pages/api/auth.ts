import { NextApiRequest, NextApiResponse } from 'next'
import connect from 'next-connect'

import { apiOptions } from '../../lib/api'
import { getEmail, getToken, getUser } from '../../lib/github'
import { signJwt } from '../../lib/jwt'
import { prisma } from '../../lib/prisma'

const handler = connect<NextApiRequest, NextApiResponse>(apiOptions)
  .get((req, res) =>
    res.redirect(
      `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.GITHUB_ID}`
    )
  )
  .post(async (req, res) => {
    const token = await getToken(req.body.code)

    const email = await getEmail(token)

    const exists = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (exists) {
      return res.json({
        token: signJwt(exists)
      })
    }

    const user = await getUser(token)

    const next = await prisma.user.create({
      data: {
        email,
        id: user.id,
        username: user.login
      }
    })

    res.json({
      token: signJwt(next)
    })
  })

export default handler
