import { setupGlobalEvents } from "./global";
import articlePageFunctions from "./pages/articles/init"

const path = window.location.pathname.split("/")[1]
let currentPageFunctions = {}

// only articles currently has scoped functions
if (path === "articles") {
  currentPageFunctions = articlePageFunctions
}

setupGlobalEvents(currentPageFunctions)
