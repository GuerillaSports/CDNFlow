import aggregateHomeContent from "./aggregate-content";

/**
 * Default export contains functions which should be executed in `DOMContentLoaded` listener
 */
export const pageFunctions = {
  DOMContentLoaded: {
    aggregateHomeContent,
  }
}
