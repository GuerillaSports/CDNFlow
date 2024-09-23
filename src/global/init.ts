import { manageTitleColorContrast } from "./color/color-contrast";
import { requiresScopedScript } from "./utils";

/**
 * Manage color contrast on initial load.
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("[gs-cdnflow]: managing title color contrast...")
  const cards = document.querySelectorAll(".card-label") as NodeListOf<HTMLElement>;
  for (let card of cards) {
    manageTitleColorContrast(card)
  }

  const url = document.URL
  if (requiresScopedScript(url)) {
    console.log("[gs-cdnflow]: page requires scoped functions")
    // do something!
  }

})

/**
 * Webflow cms list content can be lazy loaded.
 * This requires us to use a mutation observer to watch for lazy-loaded content.
 * When the content changes, the contrast function is re-run.
 */
const dynamic_list = document.querySelector(".dynam-list") as HTMLElement
const config = { childList: true, subtree: true }
const story_title_observer = new MutationObserver((mutList) => {
  for (let mut of mutList) {
    // check if element has been added
    if (mut.addedNodes.length) {
      for (let card of mut.addedNodes) {
        console.log("[gs-cdnflow]: MutationObeserver detected new content. Managing title color contrast...")
        manageTitleColorContrast(card as HTMLElement)

      }
    }
  }
})

story_title_observer.observe(dynamic_list, config)
