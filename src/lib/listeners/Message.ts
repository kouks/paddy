import { colors } from 'assets/colors'
import { Class, Container } from '@exteranto/core'
import { CommandTemplate } from '../services/types'
import { CommandBag } from '../services/CommandBag'
import { HelpBuilder } from '../services/HelpBuilder'
import { CommandParser } from '../services/CommandParser'
import { ClassAnnotation, MethodAnnotation } from '../types'
import { ParameterMissingException } from 'lib/services/exceptions'
import { Client, Message, MessageEmbed, PermissionResolvable } from 'discord.js'

export interface MessageListener {
  /**
   * Message event handler.
   *
   * @param event The event to be handled
   * @param parameters The parameters provided to the message
   */
  handle(event: Message, parameters: any): Promise<void>
}

/**
 * The @OnMessage annotation serves to mark a class as a listener to the message
 * discord event.
 *
 * @param template The message command template
 * @return The annotation
 */
export function OnMessage<T extends MessageListener>(template: CommandTemplate): ClassAnnotation<T> {
  CommandBag.add(template)

  return (Constructor: Class<T>) => {
    const container: Container = Container.getInstance()

    const discord: Client = container.resolve(Client)
    const commandParser: CommandParser = container.resolve(CommandParser)
    const helpBuilder: HelpBuilder = container.resolve(HelpBuilder)

    discord.on('message', (event) => {
      try {
        const parameters: any = commandParser.parse(template, event.content)

        new Constructor().handle(event, parameters).catch((e) => {
          const embed: MessageEmbed = new MessageEmbed()
            .setColor(colors.red)
            .setTitle('Error')
            .setDescription(e.message)

          event.channel.send(embed)
        })
      } catch (e) {
        if (e instanceof ParameterMissingException) {
          const embded: MessageEmbed = helpBuilder.buildForCommand(CommandBag.find(e.matchedTrigger))

          event.channel.send(embded)
        }
      }
    })

    return Constructor
  }
}

/**
 * The @Needs annotation checks user permissions to access a given function.
 *
 * @param permissions The array of permissions needed.
 * @return The annotation
 */
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
