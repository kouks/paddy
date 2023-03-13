export class PaddyException extends Error {
  public code: string = this.constructor.name
}

export class InvalidArgumentException extends PaddyException {
  public constructor(message: string) {
    super(message)
  }
}

export class DatabaseException extends PaddyException {
  public constructor(message: string) {
    super(message)
  }
}
