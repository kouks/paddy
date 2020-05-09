import { GradedRiven, WeaponInfo } from './types'
import { StringResolvable, MessageEmbed, GuildMember } from 'discord.js'

/**
 * Graded riven response template.
 *
 * @param gradedRiven The graded riven
 * @param imageUrl The original image URL
 * @return A string resolvable object
 */
export function gradedRivenResponse (
  member: GuildMember,
  gradedRiven: GradedRiven,
  imageUrl: string,
) : StringResolvable {

  // Build the embed.
  const embed: MessageEmbed = new MessageEmbed()
    .setColor('#e37682')
    .setImage(imageUrl)
    .setTitle(`${gradedRiven.weapon.name} (${gradedRiven.weapon.disposition})`)
    .setDescription(member)

  gradedRiven.grades.forEach((grade) => {
    embed.addField(
      grade.statValue < 0 ? `${grade.statValue}${grade.statUnit} ${grade.statName}` : `+${grade.statValue}${grade.statUnit} ${grade.statName}`,
      grade.value < 0 ? `${grade.rating} ${grade.value}%` : `${grade.rating} +${grade.value}%`,
    )
  })

  return embed
}

/**
 * Weapon disposition response template.
 *
 * @param weaponInfo The weapon info
 * @return A string resolvable object
 */
export function weaponDispositionResponse (weaponInfo: WeaponInfo) : StringResolvable {

  return new MessageEmbed()
    .setColor('#e37682')
    // .setImage(`https://semlar.com/textures/${weaponInfo.texture}`)
    .setTitle(`${weaponInfo.name} (${weaponInfo.disposition})`)
}
