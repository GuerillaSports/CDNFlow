import globalFunctions from "./functions";

export function setupGlobalEvents(pageFunctions: Record<string, any>) {

  function executeFunctionsByEventType(fns: Record<string, any>, eventType: string) {
    if (fns && fns[eventType]) {
      for (let fnKey in fns[eventType]) {
        fns[eventType][fnKey]()
      }
    }
  }


  document.addEventListener("DOMContentLoaded", function () {
    executeFunctionsByEventType(globalFunctions, "DOMContentLoaded")
    executeFunctionsByEventType(pageFunctions, "DOMContentLoaded")
  })

  window.addEventListener("load", function () {
    executeFunctionsByEventType(globalFunctions, "load")
    executeFunctionsByEventType(pageFunctions, "load")
  })

}
