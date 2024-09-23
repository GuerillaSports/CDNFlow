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
    executeFunctionsByEventType({ ...pageFunctions, ...globalFunctions }, "DOMContentLoaded")
  })

  window.addEventListener("load", function () {
    executeFunctionsByEventType({ ...pageFunctions, ...globalFunctions }, "load")
  })

}
