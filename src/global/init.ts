import scopedFunctions from "../pages";
import { manageTitleColorContrast } from "./color/color-contrast";

/**
 * Manage color contrast on initial load.
 */
document.addEventListener("DOMContentLoaded", function () {
  console.log("[gs-cdnflow]: managing title color contrast...")
  const cards = document.querySelectorAll(".card-label") as NodeListOf<HTMLElement>;
  for (let card of cards) {
    manageTitleColorContrast(card)
  }

  /**
   * If scoped functions exist for the current page, execute all default exports. 
   * NOTE: this should, theoretically, also execute any other functions in this page?
   */
  const path = window.location.pathname.split("/")[1];
  if (scopedFunctions[path]) {
    const fns = scopedFunctions[path]
    for (let fn in fns) {
      fns[fn]()
    }
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
