import { Client } from 'discord.js'
import { BootConfiguration } from './types'
import { With } from '@exteranto/core'

export class Paddy {
  /**
   * The discord client.
   */
  @With([{ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }])
  private discord: Client

  /**
   * Boots Paddy.
   *
   * @param config The boot configuration
   */
  public async rise(config: BootConfiguration): Promise<void> {
    this.discord.login(config.token)
  }
}
