import chalk from 'chalk'
import fs from 'fs'
import { promisify } from 'util'

import { api, checkAuth } from '../../lib'
import { Group } from '../../types'

const readFile = promisify(fs.readFile)

export const upload = async (name: string, path: string) => {
  checkAuth()

  const data = await readFile(path, 'utf-8')

  const { group } = await api<{
    group: Group
  }>('/groups', 'post', {
    data: {
      data,
      name
    }
  })

  console.log(chalk.green(`Env group ${group.name} has been created`))
}
