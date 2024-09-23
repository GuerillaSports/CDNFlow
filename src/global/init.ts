import scopedFunctions from "../pages";
import globalFunctions from "./functions";

/**
 * Manage color contrast on initial load.
 */
document.addEventListener("DOMContentLoaded", function () {
  // Global Functions
  executeFunctionsByEventType(globalFunctions, "DOMContentLoaded")

  // Scoped Functions
  const path = window.location.pathname.split("/")[1];
  executeFunctionsByEventType(scopedFunctions[path], "DOMContentLoaded")
})

window.addEventListener("load", function () {
  // Global Functions
  executeFunctionsByEventType(globalFunctions, "load")

  // Scoped Functions
  const path = window.location.pathname.split("/")[1];
  executeFunctionsByEventType(scopedFunctions[path], "load")
})

function executeFunctionsByEventType(fns: Record<string, any>, eventType: string) {
  if (fns && fns[eventType]) {
    for (let fnKey in fns[eventType]) {
      fns[eventType][fnKey]()
    }
  }
}
