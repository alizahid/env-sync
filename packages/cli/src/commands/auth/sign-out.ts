import chalk from 'chalk'

import { config } from '../../lib'

export const signOut = () => {
  config.delete('token')

  console.log(chalk.green("You're now signed out of EnvSync"))
}
