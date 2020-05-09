
export class PaddyException extends Error {

  /**
   * The exception code.
   */
  public code: string = this.constructor.name

}

export class InvalidArgumentException extends PaddyException {

  /**
   * {@inheritdoc}
   */
  public constructor (message: string) {
    super(message)
  }

}
