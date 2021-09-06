import chalk from 'chalk'

import { api, checkAuth } from '../../lib'
import { Group } from '../../types'

export const remove = async (id: string) => {
  checkAuth()

  const { group } = await api<{
    group: Group
  }>('/groups', 'delete', {
    params: {
      id
    }
  })

  console.log(chalk.yellow(`Env group ${group.name} has been deleted`))
}
