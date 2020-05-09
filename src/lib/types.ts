import { Class } from '@exteranto/core'

export interface BootConfiguration {

  /**
   * The Discord auth token.
   */
  token: string

}

/**
 * The class annotation type.
 */
export type ClassAnnotation<T> = (Constructor: Class<T>) => Class<T>

/**
 * The method annotation type.
 */
export type MethodAnnotation = (target: any, method: string, descriptor: any) => void
