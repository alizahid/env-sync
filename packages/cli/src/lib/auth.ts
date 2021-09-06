import chalk from 'chalk'
import { config } from './config'

export const checkAuth = () => {
  const token = config.get('token')

  if (!token) {
    console.log(chalk.red('You need to be logged in'))

    process.exit()
  }
}
