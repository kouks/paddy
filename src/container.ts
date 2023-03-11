import config from './config'
import { Container, Browser } from '@exteranto/core'

import { Client } from 'discord.js'

export const bootContainer: () => void = () => {
  const container: Container = Container.getInstance()

  // Param bindings.
  container.bindParam('browser', Browser.TESTING)
  container.bindParam('app', config)

  // Service bindings.
  container.bind(Client).to(Client).asSingleton()
}
