import { PaddyException } from 'exceptions'

export class CommandNotMatchedException extends PaddyException {
  //
}

export class ParameterMissingException extends PaddyException {
  /**
   * @param matchedTrigger The matched trigger
   */
  constructor(public matchedTrigger: string) {
    super()
  }
}
