import { Message } from 'discord.js'
import { Autowired } from '@exteranto/core'
import { SendsCommandHelpParameters } from './types'
import { CommandBag } from 'lib/services/CommandBag'
import { HelpBuilder } from 'lib/services/HelpBuilder'
import { OnMessage, MessageListener } from 'lib/listeners/Message'

@OnMessage<SendsCommandHelp>({
  triggers: ['h', 'help'],
  description: 'Send a command list or a command structure help.',
  examples: ['help', 'help dispo'],
  parameters: [
    {
      name: 'command',
      matches: '\\w+',
      description: 'The command name.',
      optional: true,
    },
  ],
})
export class SendsCommandHelp implements MessageListener {
  /**
   * The help embed builder service.
   */
  @Autowired
  private helpBuilder: HelpBuilder

  /**
   * {@inheritdoc}
   */
  public async handle(message: Message, parameters: SendsCommandHelpParameters): Promise<void> {
    // Get the command name.
    const commandName: string = parameters.command

    // Send summary if specific command not present.
    if (!commandName) {
      return void message.channel.send(this.helpBuilder.buildSummary())
    }

    // Send command help otherwise.
    return void message.channel.send(this.helpBuilder.buildForCommand(CommandBag.find(commandName)))
  }
}
