import { colors } from 'assets/colors'
import { StringResolvable, MessageEmbed, GuildMember } from 'discord.js'

/**
 * Graded riven response template.
 *
 * @param member The requesting member
 * @param gradedRiven The graded riven
 * @param imageUrl The original image URL
 * @return A string resolvable object
 */
export function birthdaySavedResponse(member: GuildMember, date: string): StringResolvable {
  const embed: MessageEmbed = new MessageEmbed()
    .setColor(colors.green)
    .setTitle(`Saved!`)
    .setDescription(
      `${member} your birthday date is set to ${date}. You will receive a special role for everyone to see as a gift!`
    )

  return embed
}

/**
 * Weapon disposition response template.
 *
 * @param member The requesting member
 * @param weaponInfo The weapon info
 * @return A string resolvable object
 */
// export function weaponDispositionResponse(member: GuildMember, weaponInfo: WeaponInfo): StringResolvable {
//   return new MessageEmbed()
//     .setColor(colors.green)
//     .setTitle(`${weaponInfo.name} (${weaponInfo.disposition})`)
//     .setDescription(member)
// }
