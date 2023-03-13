import { colors } from 'assets/colors'
import { MessageEmbed } from 'discord.js'
import { CommandTemplate } from './types'
import { CommandBag } from './CommandBag'
import { Binding, Param } from '@exteranto/core'

@Binding
export class HelpBuilder {
  @Param('app.events.message.trigger')
  private primaryTrigger: string

  @Param('app.bot.name')
  private botName: string

  public buildSummary(): MessageEmbed {
    const embed: MessageEmbed = new MessageEmbed()
      .setColor(colors.primary)
      .setTitle(`${this.botName} Help`)
      .setDescription(`Type \`${this.primaryTrigger}help [command]\` to get a detailed command summary.`)

    const commands: string[] = CommandBag.all()
      .filter((command) => !command.hidden)
      .map((command) => {
        const triggers: string = command.triggers.map((t) => `\`${this.primaryTrigger}${t}\``).join(' ')

        return `${triggers} ${command.description}`
      }, '')

    embed.addField('Commands', commands.join('\n'))

    return embed
  }

  public buildForCommand(command: CommandTemplate): MessageEmbed {
    if (command === undefined || command.hidden) {
      return new MessageEmbed().setColor(colors.red).setTitle('Error').setDescription('Command not found.')
    }

    const embed: MessageEmbed = new MessageEmbed()
      .setColor(colors.primary)
      .setTitle('Command Structure')
      .setDescription(command.description)

    embed.addField('Triggers', command.triggers.map((t) => `\`${this.primaryTrigger}${t}\``).join('\n'))

    embed.addField('Examples', command.examples.map((e) => `\`${this.primaryTrigger}${e}\``).join('\n'))

    if (command.parameters) {
      embed.addField(
        'Parameters',
        command.parameters
          .map((p) => `\`${p.name}\` ${p.description} _${p.optional ? 'Optional' : 'Required'}_`)
          .join('\n')
      )
    }

    if (command.options) {
      embed.addField('Options', command.options.map((o) => `\`-${o.key}\` ${o.description}`).join('\n'))
    }

    return embed
  }
}
