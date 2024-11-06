export function aggregateHomeContent() {

  filterFeaturedContent()

}

/*
 * Each content type loads a single top-most featured content. This function preserves the latest content and filters out all other.
 */
function filterFeaturedContent(): ContentType | Error {
  const els = document.querySelectorAll(".home__feat");

  if (!Array.isArray(els) || els.length <= 1) {
    return new Error("Error: Home Feat is either not an array or is an array of less then 2 elements.")
  }

  // track the newest
  let newest = 0;
  // map elements
  const elsByDate = new Map()
  for (let el of els) {
    const dateEl = el.querySelector(".date-feat") as Element | null
    if (!dateEl) {
      return new Error("Error: Could not find 'date-feat' on featured element.")
    }
    if (!dateEl.textContent) {
      return new Error("Error: Could not get date string from 'date-feat' element")
    }

    const date = new Date(dateEl.textContent as string).valueOf();
    // update newest with max value
    newest = Math.max(newest, date)
    // store with date value as key
    elsByDate.set(date, el)

    // hide
    el.classList.add("hidden")
  }

  const show = elsByDate.get(newest)

  if (!show) {
    return new Error("Error: failed to retrieve newest content element from map")
  }

  // unhide newest element
  show.classList.remove("hidden")
  return parseFeatContentType(show)
}

/*
 * Look for "home--feat--<content-type>" in class list and return type
  */
type ContentType = "video" | "article" | "podcast"
function parseFeatContentType(el: Element): ContentType | Error {
  let type: ContentType | null = null

  const classList = el.classList.forEach((l: string | undefined) => {

    if (l && l.includes("home__feat--")) {
      type = l.split("--")[1] as ContentType
    }
  })

  return type || new Error("Error: failed to parse content type from class list")
}
