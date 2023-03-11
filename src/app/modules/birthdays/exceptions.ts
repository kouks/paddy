import { PaddyException } from 'exceptions'

export class InvalidDateException extends PaddyException {
  /**
   * {@inheritdoc}
   */
  public constructor() {
    super('Please provide a valid date.')
  }
}
