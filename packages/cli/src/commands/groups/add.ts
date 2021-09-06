import chalk from 'chalk'

import { api, checkAuth } from '../../lib'
import { Group } from '../../types'

export const add = async (name: string) => {
  checkAuth()

  const { group } = await api<{
    group: Group
  }>('/groups', 'post', {
    data: {
      name
    }
  })

  console.log(chalk.green(`Env group ${group.name} has been created`))
}
