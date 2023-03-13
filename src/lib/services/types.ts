export interface CommandTemplate {
  triggers: string[]
  hidden?: boolean
  description: string
  examples: string[]
  parameters?: Parameter[]
  options?: Option[]
}

export interface Parameter {
  name: string
  matches: string
  description: string
  optional?: boolean
}

export interface Option {
  key: string
  name: string
  matches: string
  description: string
}
