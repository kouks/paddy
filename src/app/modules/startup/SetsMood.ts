import { Client } from 'discord.js'
import { Param } from '@exteranto/core'
import { OnReady, ReadyListener } from 'lib/listeners/Ready'

@OnReady<SetsMood>()
export class SetsMood implements ReadyListener {
  /**
   * The bot version.
   */
  @Param('app.bot.version')
  private version: string

  /**
   * {@inheritdoc}
   */
  public async handle(discord: Client): Promise<void> {
    discord.user.setActivity(`.help [v${this.version}]`, { type: 'STREAMING' })
    discord.user.setStatus('online')
  }
}
