import { colors } from 'assets/colors'
import { Class, Container } from '@exteranto/core'
import { CommandTemplate } from '../services/types'
import { CommandBag } from '../services/CommandBag'
import { HelpBuilder } from '../services/HelpBuilder'
import { CommandParser } from '../services/CommandParser'
import { ClassAnnotation, MethodAnnotation } from '../types'
import { Client, Message, MessageEmbed, PermissionResolvable } from 'discord.js'
import { isHelpableException } from 'helpers/exceptions'

export interface MessageListener {
  handle(event: Message, parameters: any): Promise<void>
}

export function OnMessage<T extends MessageListener>(template: CommandTemplate): ClassAnnotation<T> {
  CommandBag.add(template)

  return (Constructor: Class<T>) => {
    const container: Container = Container.getInstance()

    const discord: Client = container.resolve(Client)
    const commandParser: CommandParser = container.resolve(CommandParser)
    const helpBuilder: HelpBuilder = container.resolve(HelpBuilder)
    const interactionChannelIds: string[] = container.resolveParam('app.bot.interactionChannelId')

    discord.on('message', (event) => {
      try {
        // Only interact in allowed channels.
        if (!interactionChannelIds.includes(event.channel.id)) {
          return
        }

        const parameters: any = commandParser.parse(template, event.content)

        new Constructor().handle(event, parameters).catch((e) => {
          const embed: MessageEmbed = new MessageEmbed()
            .setColor(colors.red)
            .setTitle('Error')
            .setDescription(e.message)

          event.channel.send(embed)
        })
      } catch (e: unknown) {
        if (isHelpableException(e)) {
          const embded: MessageEmbed = helpBuilder.buildForCommand(CommandBag.find(e.matchedTrigger))

          event.channel.send(embded)
        }
      }
    })

    return Constructor
  }
}

export function Needs(permissions: PermissionResolvable[]): MethodAnnotation {
  return (target, method, descriptor) => {
    descriptor.value = new Proxy(target[method], {
      apply: (callable, scope, args) => {
        const message: Message = args[0]

        if (!permissions.every((p) => message.member.hasPermission(p))) {
          return
        }

        Reflect.apply(callable, scope, args)
      },
    })

    return descriptor
  }
}
