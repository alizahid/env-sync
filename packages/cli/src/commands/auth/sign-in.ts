import axios from 'axios'
import chalk from 'chalk'
import fastify from 'fastify'

import { config, WEB_URL } from '../../lib'

type AuthRequest = {
  Querystring: {
    code: string
  }
}

export const signIn = async () => {
  const server = fastify()

  server.get<AuthRequest>('/auth', async (request, reply) => {
    const { data } = await axios.post(`${WEB_URL}/api/auth`, {
      code: request.query.code
    })

    config.set('token', data.token)

    reply.send("You're now signed into EnvSync. You can close this window.")

    console.log(chalk.green("You're now signed into EnvSync"))

    process.exit()
  })

  await server.listen(8486, '0.0.0.0')

  console.log(`Follow this link to sign in: ${WEB_URL}/api/auth`)
}
