import { ParameterMissingException } from 'lib/services/exceptions'

export const isHelpableException = (e: unknown): e is ParameterMissingException => {
  return !!(e as any).matchedTrigger
}
