import { manageColorContrast, manageTitleColorContrast } from "./color/color-contrast";
import { format_custom_story_title, manage_custom_story_title_instances } from "./titles/manageCustomTitles";

function mange_dynamic_list_content() {
  const dynamic_list = document.querySelector(".dynam-list")
  if (!dynamic_list) return
  const config = { childList: true, subtree: true }
  const dynamic_list_content_observer = new MutationObserver((mutList) => {
    for (let mut of mutList) {
      // check if element has been added
      if (mut.addedNodes.length) {
        for (let card of mut.addedNodes) {
          console.log("[gs-cdnflow/global]: MutationObeserver detected new content. Managing...")
          if (!card) continue
          format_custom_story_title(card as HTMLElement) // FIRST
          manageTitleColorContrast(card as HTMLElement)
        }
      }
    }
  })
  dynamic_list_content_observer.observe(dynamic_list, config)
}

const globalFunctions: Record<string, any> = {
  DOMContentLoaded: {
    manage_custom_story_title_instances, // FIRST (injexts content into what will be managed below)
    manageColorContrast,

  },
  load: {
    mange_dynamic_list_content,
  }
}

export default globalFunctions
