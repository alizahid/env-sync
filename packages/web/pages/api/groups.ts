import { NextApiRequest, NextApiResponse } from 'next'
import connect from 'next-connect'

import { apiOptions } from '../../lib/api'
import { getGroup } from '../../lib/db'
import { verifyJwt } from '../../lib/jwt'
import { prisma } from '../../lib/prisma'

const handler = connect<NextApiRequest, NextApiResponse>(apiOptions)
  .get(async (req, res) => {
    const { id } = verifyJwt(req.headers.authorization)

    const groups = await prisma.group.findMany({
      select: {
        id: true,
        data: true,
        name: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      where: {
        user: {
          id
        }
      }
    })

    res.json({
      groups: groups.map(({ data, id, name }) => ({
        id,
        name,
        count: Object.keys(data).length
      }))
    })
  })
  .post(async (req, res) => {
    const { id } = verifyJwt(req.headers.authorization)

    const group = await prisma.group.create({
      select: {
        id: true,
        name: true
      },
      data: {
        data: req.body.data ?? {},
        name: req.body.name,
        user: {
          connect: {
            id
          }
        }
      }
    })

    res.json({
      group
    })
  })
  .delete(async (req, res) => {
    const group = await getGroup(req)

    await prisma.group.delete({
      where: {
        id: group.id
      }
    })

    res.json({
      group
    })
  })

export default handler
