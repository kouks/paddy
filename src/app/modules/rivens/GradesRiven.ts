import { Client } from 'awi'
import { Param } from '@exteranto/core'
import { gradedRivenResponse } from './templates'
import { Message, MessageAttachment } from 'discord.js'
import { InvalidArgumentException } from 'exceptions'
import { RivenGradingFailedException } from './exceptions'
import { GradedRiven, GradesRivenParameters, Grade } from './types'
import { OnMessage, MessageListener } from 'lib/listeners/Message'

@OnMessage<GradesRiven>({
  triggers: ['g', 'grade'],
  description: 'Grade a riven based on the provided image.',
  examples: ['grade', 'grade -r 8', 'grade -u <image_url>'],
  options: [
    {
      key: 'r',
      name: 'rank',
      matches: '[0-8]',
      description: 'The riven mod rank.',
    },
    {
      key: 'u',
      name: 'url',
      matches: '\\S+',
      description: 'The riven image URL.',
    },
  ],
})
export class GradesRiven implements MessageListener {
  /**
   * The riven grading API url.
   */
  @Param('app.modules.rivens.rivenGradingApiClient')
  private readonly rivenGradingApiClient: (imageUrl: string, rank: number) => Client

  /**
   * {@inheritdoc}
   */
  public async handle(message: Message, parameters: GradesRivenParameters): Promise<void> {
    const imageUrl: string = this.getImageUrl(message, parameters)

    // Uses the riven grader api client to grade a riven from image.
    const gradedRiven: GradedRiven = await this.rivenGradingApiClient(imageUrl, parameters.options.rank)
      .optional<GradedRiven>()
      .then((bag) => bag.expect(new RivenGradingFailedException()))

    // Send the embed and delete the message that was sent.
    await message.channel.send(gradedRivenResponse(message.member, gradedRiven, imageUrl))

    return void message.delete()
  }

  /**
   * Retrieve the image URL from the request.
   *
   * @param message The message sent
   * @param parameters The message parameters
   * @return The image URl
   */
  private getImageUrl(message: Message, parameters: GradesRivenParameters): string {
    if (parameters.options.url) {
      return parameters.options.url
    }

    const attachment: MessageAttachment = message.attachments.first()

    // Reject if no attachment, multiple attachments or if attachment is not an
    // image.
    if (attachment === undefined || !/(\.jpg|\.png$)/.test(attachment.name)) {
      throw new InvalidArgumentException('Please attach an image to the message.')
    }

    return attachment.url
  }
}
