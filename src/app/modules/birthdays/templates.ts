import { colors } from 'assets/colors'
import { StringResolvable, MessageEmbed, GuildMember } from 'discord.js'

export function birthdaySavedResponse(member: GuildMember): StringResolvable {
  const embed: MessageEmbed = new MessageEmbed()
    .setColor(colors.green)
    .setTitle(`Saved!`)
    .setDescription(
      `${member} your birthday date is set. You will receive a special role for everyone to see as a gift!`
    )

  return embed
}
