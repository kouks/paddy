export interface JoinablesConfiguration {
  /**
   * The joinables channel ID.
   */
  channelId: string

  /**
   * The joinables ruleset.
   */
  rules: RuleSet[]
}

export interface RuleSet {
  /**
   * The message ID.
   */
  messageId: string

  /**
   * The role to reaction mapping.
   */
  mapping: { [key: string]: string }
}
