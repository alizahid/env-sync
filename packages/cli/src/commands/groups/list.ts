import chalk from 'chalk'
import Table from 'cli-table'

import { api, checkAuth } from '../../lib'
import { Group } from '../../types'

export const list = async () => {
  checkAuth()

  const { groups } = await api<{
    groups: Array<Group>
  }>('/groups')

  if (groups.length === 0) {
    return console.log(chalk.yellow("You haven't created any env groups yet"))
  }

  const table = new Table({
    head: ['Id', 'Name', 'Variables']
  })

  groups.forEach(({ id, name, count }) => table.push([id, name, count]))

  console.log(table.toString())
}
