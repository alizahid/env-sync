import { NextApiRequest, NextApiResponse } from 'next'
import connect from 'next-connect'

import { apiOptions } from '../../lib/api'
import { getGroup } from '../../lib/db'

const handler = connect<NextApiRequest, NextApiResponse>(apiOptions).get(
  async (req, res) => {
    const group = await getGroup(req)

    res.json({
      group
    })
  }
)

export default handler
