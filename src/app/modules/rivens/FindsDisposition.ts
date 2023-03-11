import { Client } from 'awi'
import { Message } from 'discord.js'
import { Param } from '@exteranto/core'
import { weaponDispositionResponse } from './templates'
import { InvalidArgumentException } from 'exceptions'
import { WeaponInfoLookupFailedException } from './exceptions'
import { FindsDispositionParameters, WeaponInfo } from './types'
import { OnMessage, MessageListener } from 'lib/listeners/Message'

@OnMessage<FindsDisposition>({
  triggers: ['d', 'dispo'],
  description: 'Find the riven disposition for a provided weapon.',
  examples: ['dispo Vectis Prime'],
  parameters: [
    {
      name: 'weapon',
      matches: '[\\w\\s]+',
      description: 'The weapon name.',
    },
  ],
})
export class FindsDisposition implements MessageListener {
  /**
   *
   * @param message
   * @param parameters
   */
  @Param('app.modules.rivens.weaponInfoApiClient')
  private weaponInfoApiClient: (weaponName: string) => Client

  /**
   * {@inheritdoc}
   */
  public async handle(message: Message, parameters: FindsDispositionParameters): Promise<void> {
    // Get the weapon name.
    const weaponName: string = parameters.weapon

    // Check for paramerter presence.
    if (!weaponName) {
      throw new InvalidArgumentException('Please specify a weapon name.')
    }

    // Use the weapon info API client to find weapon disposition.
    const weaponInfo: WeaponInfo = await this.weaponInfoApiClient(weaponName)
      .optional<WeaponInfo>()
      .then((box) => box.expect(new WeaponInfoLookupFailedException()))

    // Send the embed and delete the message that was sent.
    await message.channel.send(weaponDispositionResponse(message.member, weaponInfo))

    return void message.delete()
  }
}
