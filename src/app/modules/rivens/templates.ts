import { colors } from 'assets/colors'
import { GradedRiven, WeaponInfo } from './types'
import { StringResolvable, MessageEmbed, GuildMember } from 'discord.js'

/**
 * Graded riven response template.
 *
 * @param member The requesting member
 * @param gradedRiven The graded riven
 * @param imageUrl The original image URL
 * @return A string resolvable object
 */
export function gradedRivenResponse(member: GuildMember, gradedRiven: GradedRiven, imageUrl: string): StringResolvable {
  const embed: MessageEmbed = new MessageEmbed()
    .setColor(colors.green)
    .setImage(imageUrl)
    .setTitle(`${gradedRiven.weapon.name} (${gradedRiven.weapon.disposition})`)
    .setDescription(member)

  gradedRiven.grades.forEach((grade) => {
    embed.addField(
      grade.statValue < 0
        ? `${grade.statValue}${grade.statUnit} ${grade.statName}`
        : `+${grade.statValue}${grade.statUnit} ${grade.statName}`,
      grade.value < 0 ? `${grade.rating} ${grade.value}%` : `${grade.rating} +${grade.value}%`
    )
  })

  return embed
}

/**
 * Weapon disposition response template.
 *
 * @param member The requesting member
 * @param weaponInfo The weapon info
 * @return A string resolvable object
 */
export function weaponDispositionResponse(member: GuildMember, weaponInfo: WeaponInfo): StringResolvable {
  return new MessageEmbed()
    .setColor(colors.green)
    .setTitle(`${weaponInfo.name} (${weaponInfo.disposition})`)
    .setDescription(member)
}
