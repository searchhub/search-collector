export enum ListenerType {
  Static = "static",           // StaticSentinel - one-time DOM querySelector
  Mutation = "mutation",       // MutationSentinel - MutationObserver based
  Animation = "animation",     // Sentinel - CSS animation based

  // Legacy values (deprecated but kept for backwards compatibility)
  /** @deprecated Use ListenerType.Static instead */
  Dom = "dom",                 // Maps to Static
  /** @deprecated Use ListenerType.Animation instead */
  Sentinel = "sentinel"        // Maps to Animation
}