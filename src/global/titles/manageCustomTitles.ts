export function manage_custom_story_title_instances(parent?: HTMLElement) {
  let custom_titles = document.querySelectorAll(".story-titles__custom");
  if (parent) {
    const el = parent.querySelector(".story-titles__custom")
    if (!el) return
    format_custom_story_title(el as HTMLElement)
    return
  }

  for (let t of custom_titles) {
    if (!t) continue
    format_custom_story_title(t as HTMLElement)
  }
}

/**
 * Formatted story-types break the type into two parts: 
 *  The top is blue
 *  And the second is outlined. 
 * This creates nice formatting, but for stories which do not fit a story type, they lack the richness of this feature.
 * So, This function grabs the custom story title and formats it as best as possible to fit that style.
  */
export function format_custom_story_title(titleEl: HTMLElement) {
  console.log("[gs-cdnflow/global]: formatting custom story title")

  const has_custom_title = titleEl.dataset.customTitle
  if (!has_custom_title) return

  const blue_text = titleEl.querySelector(".title-blue") as HTMLElement | null
  const outline_text = titleEl.querySelector(".title-outline") as HTMLElement | null
  const text = has_custom_title

  if (!blue_text || !outline_text) return

  if (!text.includes(" ")) {
    // Custom Story Title is one word, or no spaces. => remove outline text.
    outline_text.textContent = ""
    blue_text.textContent = text
    return
  }

  const split = text.split(" ")

  const newTitle = {
    b: split.splice(0, split.length / 2 + 1).join(" "),
    o: split.join(" ")
  }

  if (!newTitle.o || !newTitle.b) {
    console.warn("[gs-cdnflow/global]: error formatting custom title: ", blue_text.textContent)
    return
  }

  blue_text.textContent = newTitle.b
  outline_text.textContent = newTitle.o

  return
}
