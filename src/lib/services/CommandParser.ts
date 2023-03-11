import { CommandTemplate } from './types'
import { Singleton, Param } from '@exteranto/core'
import { CommandNotMatchedException, ParameterMissingException } from './exceptions'

@Singleton
export class CommandParser {
  /**
   * The primary command trigger.
   */
  @Param('app.events.message.trigger')
  private primaryTrigger: string

  /**
   * Parse a command based on the provided template and message.
   *
   * @param template The command template
   * @param message The message to be parsed
   * @return The parsed object
   */
  public parse(template: CommandTemplate, message: string): any {
    const matchedTrigger: string = template.triggers.find((t) =>
      new RegExp(`^\\${this.primaryTrigger}${t}(\\s|$)`).test(message)
    )

    if (matchedTrigger === undefined) {
      throw new CommandNotMatchedException()
    }

    const parseable: string = message
      .replace(new RegExp(`^${this.primaryTrigger}${matchedTrigger}(\\s|$)`), '')
      .replace(/\s+/g, ' ')

    const parametersRegex: string = (template.parameters || [])
      .map((p) => {
        return `(?<${p.name}>${p.matches})${p.optional ? '?' : ''}`
      })
      .join(' ?')

    const parametersMatch: RegExpMatchArray = parseable.match(new RegExp(`^${parametersRegex}`))

    if (parametersMatch === null) {
      throw new ParameterMissingException(matchedTrigger)
    }

    const parameters: { [key: string]: any } = parametersMatch.groups

    const options: { [key: string]: any } = (template.options || []).reduce((c, i) => {
      const optionRegex: string = `-${i.key}\\s(${i.matches})(\\s|$)`
      const optionsMatch: RegExpMatchArray = parseable.match(new RegExp(optionRegex))

      return { ...c, [i.name]: optionsMatch === null ? undefined : optionsMatch[1] }
    }, {})

    return { ...parameters, options }
  }
}
