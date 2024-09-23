import { manageTitleColorContrast } from "./color/color-contrast";

function manageColorContrast() {
  console.log("[gs-cdnflow/global]: managing title color contrast...")
  const cards = document.querySelectorAll(".card-label") as NodeListOf<HTMLElement>;
  for (let card of cards) {
    manageTitleColorContrast(card)
  }
}


function observeStoryTitleChanges() {
  const dynamic_list = document.querySelector(".dynam-list")
  if (!dynamic_list) return

  const config = { childList: true, subtree: true }
  const story_title_observer = new MutationObserver((mutList) => {
    for (let mut of mutList) {
      // check if element has been added
      if (mut.addedNodes.length) {
        for (let card of mut.addedNodes) {
          console.log("[gs-cdnflow/global]: MutationObeserver detected new content. Managing title color contrast...")
          manageTitleColorContrast(card as HTMLElement)
        }
      }
    }
  })

  story_title_observer.observe(dynamic_list, config)
}

const globalFunctions: Record<string, any> = {
  DOMContentLoaded: {
    manageColorContrast,
  },
  load: {
    observeStoryTitleChanges
  }
}

export default globalFunctions
