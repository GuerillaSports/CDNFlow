import { setupGlobalEvents } from "./global";
import { pageFunctions as articlePageFunctions } from "./pages/articles/init"
import { pageFunctions as homePageFunctions } from "./pages/home/init"

const path = window.location.pathname.split("/")[1]
let currentPageFunctions = {}

// only articles currently has scoped functions

switch (path) {
  case "articles":
    currentPageFunctions = articlePageFunctions
    break;
  case "":
    currentPageFunctions = homePageFunctions
    break;
  default:
    console.log(`[gs-cdnflow]: no local functions to execute on page ${path}...`)
}

setupGlobalEvents(currentPageFunctions)
