import { PaddyException } from 'exceptions'

export class InvalidDateException extends PaddyException {
  public constructor() {
    super('Please provide a valid date.')
  }
}
