export interface CommandTemplate {
  /**
   * The command trigger.
   */
  triggers: string[]

  /**
   * Whether to hide the command in help.
   */
  hidden?: boolean

  /**
   * The command descrption.
   */
  description: string

  /**
   * The command examples.
   */
  examples: string[]

  /**
   * The parameters for the command.
   */
  parameters?: Parameter[]

  /**
   * The command options.
   */
  options?: Option[]
}

export interface Parameter {
  /**
   * The parameter name.
   */
  name: string

  /**
   * The pattern for the parameter value.
   */
  matches: string

  /**
   * The parameter descrption.
   */
  description: string

  /**
   * Whether the parameter is optional.
   */
  optional?: boolean
}

export interface Option {
  /**
   * The option name.
   */
  key: string

  /**
   * The option name.
   */
  name: string

  /**
   * The pattern for the option value.
   */
  matches: string

  /**
   * The option descrption.
   */
  description: string
}
