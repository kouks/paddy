import { CommandTemplate } from './types'

export class CommandBag {

  /**
   * All command templates stored.
   */
  private static commands: CommandTemplate[] = []

  /**
   * Add a command to the bag.
   *
   * @param command The command to be added
   */
  public static add (command: CommandTemplate) : void {
    this.commands.push(command)
  }

  /**
   * Find a command template based on a trigger.
   *
   * @param trigger The trigger to look for
   * @return The command template
   */
  public static find (trigger: string) : CommandTemplate {
    return this.commands.find(c => c.triggers.includes(trigger))
  }

  /**
   * Return all konwn command templates.
   *
   * @return The command templates
   */
  public static all () : CommandTemplate[] {
    return this.commands
  }

}
