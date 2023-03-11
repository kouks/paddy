import { PaddyException } from 'exceptions'

export class RivenGradingFailedException extends PaddyException {
  /**
   * {@inheritdoc}
   */
  public constructor() {
    super('Riven grading failed. Please try a different screenshot.')
  }
}

export class WeaponInfoLookupFailedException extends PaddyException {
  /**
   * {@inheritdoc}
   */
  public constructor() {
    super('Weapon info lookup failed. Please try again.')
  }
}
