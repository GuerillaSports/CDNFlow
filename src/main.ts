import { setupGlobalEvents } from "./global";
import { pageFunctions as articlePageFunctions } from "./pages/articles/init"
import { pageFunctions as homePageFunctions } from "./pages/home/aggregate-content";

const path = window.location.pathname.split("/")[1]
let currentPageFunctions = {}

// only articles currently has scoped functions

switch (path) {
  case "articles":
    currentPageFunctions = articlePageFunctions
    break
  case "dev-everything":
    currentPageFunctions = homePageFunctions
    break
}

setupGlobalEvents(currentPageFunctions)
