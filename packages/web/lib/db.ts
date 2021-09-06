import { Group } from '@prisma/client'
import { NextApiRequest } from 'next'

import { verifyJwt } from './jwt'
import { prisma } from './prisma'

export const getGroup = async (req: NextApiRequest): Promise<Group> => {
  const { id } = verifyJwt(req.headers.authorization)

  const groupId = Number(req.query.id)

  const group = await prisma.group.findUnique({
    where: {
      id: groupId
    }
  })

  if (!group) {
    throw {
      code: 404,
      message: 'Not found'
    }
  }

  if (group.userId !== id) {
    throw {
      code: 401,
      message: 'Not found'
    }
  }

  return group
}
