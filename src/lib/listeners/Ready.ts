import { Client } from 'discord.js'
import { ClassAnnotation } from '../types'
import { Class, Container } from '@exteranto/core'

export interface ReadyListener {
  handle(discord: Client): Promise<void>
}

export function OnReady<T extends ReadyListener>(): ClassAnnotation<T> {
  return (Constructor: Class<T>) => {
    const container: Container = Container.getInstance()
    const discord: Client = container.resolve(Client)

    discord.on('ready', () => new Constructor().handle(discord))

    return Constructor
  }
}
