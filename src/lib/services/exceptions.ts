import { PaddyException } from 'exceptions'

export class CommandNotMatchedException extends PaddyException {
  //
}

export class ParameterMissingException extends PaddyException {
  constructor(public matchedTrigger: string) {
    super()
  }
}
