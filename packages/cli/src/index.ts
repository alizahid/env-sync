#! /usr/bin/env node

import { Command } from 'commander'

import { auth, groups } from './commands'

const program = new Command()

// auth

const authCommand = program.command('auth').description('Authentication')

authCommand
  .command('sign-in')
  .description('Sign into EnvSync')
  .action(auth.signIn)
authCommand
  .command('sign-out')
  .description('Sign out of EnvSync')
  .action(auth.signOut)
authCommand
  .command('status')
  .description('Check auth status')
  .action(auth.status)

// groups

const groupsCommand = program.command('groups').description('Env groups')

groupsCommand
  .command('list')
  .description('List all the env groups')
  .action(groups.list)
groupsCommand
  .command('add')
  .argument('<name>', 'Name of the group')
  .description('Create a new env group')
  .action(groups.add)
groupsCommand
  .command('remove')
  .alias('rm')
  .argument('<id>', 'Id of the group')
  .description('Delete an env group')
  .action(groups.remove)
groupsCommand
  .command('upload')
  .alias('import')
  .argument('<name>', 'Name of the group')
  .argument('[path]', 'Path of the env file', '.env')
  .description('Upload env and create env group')
  .action(groups.upload)
groupsCommand
  .command('download')
  .alias('get')
  .argument('<id>', 'Id of the group')
  .argument('[path]', 'Path of the env file', '.env')
  .description('Download env group to path')
  .action(groups.download)

// parse

program.parse()
