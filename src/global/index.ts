import globalFunctions from "./functions";

export function setupGlobalEvents(pageFunctions: Record<string, any>) {

  // Get all event types from local and global functions
  const eventTypes = [...Object.keys(pageFunctions), ...Object.keys(globalFunctions)]

  function executeFunctionsByEventType(fns: Record<string, any>, eventType: string) {
    if (fns && fns[eventType]) {
      for (let fnKey in fns[eventType]) {
        fns[eventType][fnKey]() // => articlesFuncs[DOMContentLoaded][firstFunc]()
      }
    }
  }
  // loop over event types and register event listener with functions
  for (let eventType of eventTypes) {
    window.addEventListener(eventType, function () {
      executeFunctionsByEventType(pageFunctions, eventType)
      executeFunctionsByEventType(globalFunctions, eventType)
    })
  }
}
