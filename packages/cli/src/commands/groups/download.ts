import chalk from 'chalk'
import fs from 'fs'
import { promisify } from 'util'

import { api, checkAuth } from '../../lib'
import { Group } from '../../types'

const writeFile = promisify(fs.writeFile)

export const download = async (id: string, path: string) => {
  checkAuth()

  const { group } = await api<{
    group: Group
  }>('/env', 'get', {
    params: {
      id
    }
  })

  await writeFile(path, group.data, 'utf-8')

  console.log(chalk.green(`Env group ${group.name} downloaded to ${path}`))
}
