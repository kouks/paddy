import { Param } from '@exteranto/core'
import { JoinablesConfiguration, RuleSet } from './types'
import { MessageReaction, PartialUser, User, GuildMember } from 'discord.js'
import { OnMessageReaction, MessageReactionListener } from 'lib/listeners/MessageReaction'

@OnMessageReaction<AddsRoleOnReaction>()
export class AddsRoleOnReaction implements MessageReactionListener {
  /**
   * The joinables conguration.
   */
  @Param('app.modules.joinables')
  private configuration: JoinablesConfiguration

  /**
   * {@inheritdoc}
   */
  public async handle(reaction: MessageReaction, partialUser: User | PartialUser): Promise<void> {
    // Abort if another channel.
    if (reaction.message.channel.id !== this.configuration.channelId) {
      return
    }

    // Find matching rule if any.
    const rule: RuleSet = this.configuration.rules.find((r) => reaction.message.id === r.messageId)

    if (rule === undefined) {
      return
    }

    // Get the role if it exists.
    const roleId: string = rule.mapping[reaction.emoji.toString()]

    if (roleId === undefined) {
      return
    }

    // Fetch the user that send the reaction.
    const user: User = await partialUser.fetch()
    const member: GuildMember = await reaction.message.guild.members.fetch(user)

    // Figure out whether role added or removed.
    const reactionAdded: boolean = await reaction.users
      .fetch()
      .then((users) => users.find((u) => u.id === user.id))
      .then(Boolean)

    return reactionAdded ? void member.roles.add(roleId) : void member.roles.remove(roleId)
  }
}
