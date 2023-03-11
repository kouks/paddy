/**
 *
 * Register environment variables.
 *
 */

import { config as loadEnvironment } from 'dotenv'

loadEnvironment()

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
