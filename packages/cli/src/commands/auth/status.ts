import chalk from 'chalk'

import { config } from '../../lib'

export const status = () => {
  const token = config.get('token')

  if (token) {
    console.log(chalk.green("You're signed in"))
  } else {
    console.log(chalk.green("You're not signed in"))
  }
}
