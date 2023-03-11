import { ClassAnnotation } from '../types'
import { Class, Container } from '@exteranto/core'
import { Client, MessageReaction, User, PartialUser } from 'discord.js'

export interface MessageReactionListener {
  /**
   * Message reaction event handler.
   *
   * @param event The event to be handled
   */
  handle(event: MessageReaction, user: User | PartialUser): Promise<void>
}

/**
 * The @OnMessageReaction annotation serves to mark a class as a listener to the
 * message reaction discord event.
 *
 * @return The annotation
 */
export function OnMessageReaction<T extends MessageReactionListener>(): ClassAnnotation<T> {
  return (Constructor: Class<T>) => {
    const container: Container = Container.getInstance()
    const discord: Client = container.resolve(Client)

    discord.on('messageReactionAdd', (event, user) => new Constructor().handle(event, user as User | PartialUser))
    discord.on('messageReactionRemove', (event, user) => new Constructor().handle(event, user as User | PartialUser))

    return Constructor
  }
}
