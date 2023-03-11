export interface GradedRiven {
  /**
   * The weapon info.
   */
  weapon: {
    name: string
    disposition: number
  }

  /**
   * The array of grades.
   */
  grades: Grade[]
}

export interface Grade {
  /**
   * The stat name.
   */
  statName: string

  /**
   * The stat value.
   */
  statValue: number

  /**
   * The stat unit.
   */
  statUnit: string

  /**
   * The grade value.
   */
  value: number

  /**
   * The grade rating.
   */
  rating: string
}

export interface GradesRivenParameters {
  /**
   * The options object.
   */
  options: {
    rank?: number
    url?: string
  }
}

export interface WeaponInfo {
  /**
   * The weapon name.
   */
  name: string

  /**
   * The weapon disposition
   */
  disposition: number

  /**
   * The weapon texture URL partial.
   */
  texture: string
}

export interface FindsDispositionParameters {
  /**
   * The weapon name.
   */
  weapon: string
}
