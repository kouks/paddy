import { Client } from 'discord.js'
import { BootConfiguration } from './types'
import { With } from '@exteranto/core'

export class Paddy {
  @With([{ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] }])
  private discord: Client

  public async rise(config: BootConfiguration): Promise<void> {
    this.discord.login(config.token)
  }
}
