import { Message } from 'discord.js'
import { Param } from '@exteranto/core'
import { birthdaySavedResponse } from './templates'
import { InvalidDateException } from './exceptions'
import { SavesBirthdayParameters } from './types'
import { OnMessage, MessageListener } from 'lib/listeners/Message'
import * as dayjs from 'dayjs'
import { saveBirthdayToDatabase } from './queries'
import { DatabaseException } from 'exceptions'

@OnMessage<SavesBirthday>({
  triggers: ['bday', 'birthday'],
  description: "Saves a user's birthday to assign a role.",
  examples: ['bday 1 jan'],
  parameters: [
    {
      name: 'date',
      matches: '.+',
      description: "The user's birthday date.",
    },
  ],
})
export class SavesBirthday implements MessageListener {
  @Param('app.modules.birthdays.dateFormat')
  private dateFormat: string

  public async handle(message: Message, parameters: SavesBirthdayParameters): Promise<void> {
    // Get the weapon name.
    const date = dayjs(parameters.date)

    // Check for paramerter presence.
    if (!date.isValid()) {
      throw new InvalidDateException()
    }

    // Save to database.
    await saveBirthdayToDatabase(message.member.id, date.date(), date.month()).catch(() => {
      throw new DatabaseException('Something went wrong when saving your data.')
    })

    // Send the embed and delete the message that was sent.
    return void message.channel.send(birthdaySavedResponse(message.member, date.format(this.dateFormat)))
  }
}
