/**
 *
 * Register environment variables.
 *
 */

import { config as loadEnvironment } from 'dotenv'

loadEnvironment()

/**
 *
 * Register database.
 *
 */

import * as sqlite3 from 'sqlite3'
import { openDatabase } from './database'

if (process.env.APPLICATION_ENVIRONMENT === 'dev') {
  sqlite3.verbose()
}

openDatabase().then((db) => {
  if (process.env.APPLICATION_ENVIRONMENT === 'dev') {
    db.on('trace', console.log)
  }

  db.migrate()
})

/**
 *
 * Register container.
 *
 */

import { bootContainer } from './container'

bootContainer()

/**
 *
 * Boot Paddy.
 *
 */

import { Paddy } from './lib/Paddy'
import { Container } from '@exteranto/core'

new Paddy().rise({
  token: Container.getInstance().resolveParam('app.auth.discordToken'),
})

/**
 *
 * Register modules.
 *
 */

import './app/modules/help'
import './app/modules/startup'
import './app/modules/birthdays'

// import './app/modules/joinables'
// import './app/modules/rivens'

// Logger
// Analyzer?
// Response templates in annotation?
// Tokens for API.
