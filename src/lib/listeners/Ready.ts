import { Client } from 'discord.js'
import { ClassAnnotation } from '../types'
import { Class, Container } from '@exteranto/core'

export interface ReadyListener {

  /**
   * Ready event handler.
   */
  handle (discord: Client) : Promise<void>

}

/**
 * The @Message annotation serves to mark a class as a listener to the
 * message discord event.
 *
 * @return The annotation
 */
export function OnReady<T extends ReadyListener> () : ClassAnnotation<T> {

  return (Constructor: Class<T>) => {
    const container: Container = Container.getInstance()
    const discord: Client = container.resolve(Client)

    discord.on('ready', () => new Constructor().handle(discord))

    return Constructor
  }
}
