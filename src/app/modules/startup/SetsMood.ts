import { Client } from 'discord.js'
import { Param } from '@exteranto/core'
import { OnReady, ReadyListener } from 'lib/listeners/Ready'

@OnReady<SetsMood>()
export class SetsMood implements ReadyListener {
  @Param('app.bot.version')
  private version: string

  public async handle(discord: Client): Promise<void> {
    await discord.user.setActivity(`.help [v${this.version}]`, { type: 'STREAMING' })
    await discord.user.setStatus('online')
  }
}
