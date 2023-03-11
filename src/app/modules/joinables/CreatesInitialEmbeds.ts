import { Param } from '@exteranto/core'
import { colors } from 'assets/colors'
import { JoinablesConfiguration } from './types'
import { Message, MessageEmbed, TextChannel } from 'discord.js'
import { OnMessage, MessageListener, Needs } from 'lib/listeners/Message'

@OnMessage<CreatesInitialEmbeds>({
  triggers: ['joinables'],
  hidden: true,
  description: 'Creates initial joinables embeds.',
  examples: [],
})
export class CreatesInitialEmbeds implements MessageListener {
  /**
   * The joinables conguration.
   */
  @Param('app.modules.joinables')
  private configuration: JoinablesConfiguration

  /**
   * {@inheritdoc}
   */
  @Needs(['MANAGE_GUILD'])
  public async handle(message: Message): Promise<void> {
    // Get the joinables channel.
    const channel: TextChannel = (await message.guild.channels.cache
      .find((c) => c.id === this.configuration.channelId)
      .fetch()) as TextChannel

    // Loop through the joinable embeds and print each.
    this.configuration.rules.forEach(async (rule) => {
      const emojis: string[] = Object.keys(rule.mapping)

      const embed: MessageEmbed = new MessageEmbed().setColor(colors.primary).setTitle('React to obtain roles')

      const description: string = emojis
        .map((emoji) => {
          return `${emoji} for <@&${rule.mapping[emoji]}>`
        })
        .join('\n')

      embed.setDescription(description)

      const reactable: Message = await channel.send(embed)

      emojis.map((e) => e.replace(/[^0-9]/g, '')).forEach((id) => reactable.react(id))
    })

    return void message.delete()
  }
}
