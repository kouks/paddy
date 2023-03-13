import { CommandTemplate } from './types'

export class CommandBag {
  private static commands: CommandTemplate[] = []

  public static add(command: CommandTemplate): void {
    this.commands.push(command)
  }

  public static find(trigger: string): CommandTemplate {
    return this.commands.find((c) => c.triggers.includes(trigger))
  }

  public static all(): CommandTemplate[] {
    return this.commands
  }
}
