import { Class } from '@exteranto/core'

export interface BootConfiguration {
  token: string
}

export type ClassAnnotation<T> = (Constructor: Class<T>) => Class<T>

export type MethodAnnotation = (target: any, method: string, descriptor: any) => void
