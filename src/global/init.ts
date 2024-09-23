import { manageTitleColorContrast } from "./color/color-contrast";
import { requiresScopedScript } from "./utils";

/**
 * Manage color contrast on initial load.
 */
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card-label") as NodeListOf<HTMLElement>;
  for (let card of cards) {
    manageTitleColorContrast(card)
  }

  const url = document.URL
  if (requiresScopedScript(url)) {
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
        manageTitleColorContrast(card as HTMLElement)

      }
    }
  }
})

story_title_observer.observe(dynamic_list, config)
