type ContentType = "video" | "article" | "podcast"
function aggregateHomeContent() {
  console.log("[gs-cdnflow/home]: Aggregating homepage content...")
  const featContentType = filterFeaturedContent()
  if (featContentType instanceof Error) {
    console.warn("[gs-cdnflow/home]: Error filtering featured content: ", featContentType.message)
    return
  }
  console.log("[gs-cdnflow/home]: filtered featured content")
  let err = removeFeatContentFromBody(featContentType)
  if (err instanceof Error) {
    console.warn("[gs-cdnflow/home]: Error removing featured content from body: ", err.message)
    return
  }
  console.log("[gs-cdnflow/home]: removed extra featured content from body")
  err = groupBodyContent()
  if (err instanceof Error) {
    console.warn("[gs-cdnflow/home]: Error error grouping body content: ", err.message)
    return
  }
  console.log("[gs-cdnflow/home]: organized body content by date. Success.")

}

/*
 * Parses the content type of a parent element from the class list
 * 
 */
function parseFeatContentType(el: Element): ContentType | Error {
  let type = null

  el.classList.forEach((l: string) => {
    if (l && l.includes("home__feat--")) {
      type = l.split("--")[1]
    }
  })

  return type || new Error("Error: failed to parse content type from class list")
}

/*
 * Removes the top featred content from the content-type's body list
 */
function removeFeatContentFromBody(targetContent: ContentType): Error | undefined {
  const targetList = document.querySelector(`.home__content--${targetContent}`)
  if (!targetList || targetList.children.length <= 1) {
    return new Error("Error cleaning up featured content from body: list could not be found.")
  }

  const children = targetList.children
  targetList.removeChild(children[0])
}
function filterFeaturedContent(): ContentType | Error {
  const els = document.querySelectorAll(".home__feat");

  if (els.length <= 1) {
    return new Error("Error: Home Feat is either not an array or is an array of less then 2 elements.");
  }

  let newest = 0;
  const elsByDate = new Map();

  for (let el of els) {
    const dateEl = el.querySelector(".date-feat");
    if (!dateEl || !dateEl.textContent) {
      return new Error("Error: no date element found in parent: either null or empty");
    }
    const date = new Date(dateEl.textContent).valueOf()
    newest = Math.max(date, newest)
    elsByDate.set(date, el)

    el.classList.add("hidden")
  }


  const target = elsByDate.get(newest)
  if (!target) {
    return new Error("Error: failed to select newest element from map")
  }
  target.classList.remove("hidden")
  return parseFeatContentType(target)
}

/*
 * Aggregate all body content into single list sorted by release date
 * 
 */
function groupBodyContent() {
  const videos = document.querySelector((".home__content--videos"))
  const articles = document.querySelector((".home__content--articles"))
  const podcasts = document.querySelector((".home__content--podcasts"))
  if (!videos || !articles || !podcasts) {
    return new Error("Error: failed to find videos, articles, or podcasts list")
  }

  const content = [
    ...videos.children, ...articles.children, ...podcasts.children
  ]

  const targetList = document.querySelector(".home__content")

  content.sort((a, b) => {
    const aDateEl = a.querySelector(".date")
    const bDateEl = b.querySelector(".date")
    if (!aDateEl || !bDateEl || !aDateEl.textContent || !bDateEl.textContent) {
      return 0;
    }
    const aDate = new Date(aDateEl.textContent).valueOf()
    const bDate = new Date(bDateEl.textContent).valueOf()

    return bDate - aDate
  })

  for (let c of content) {
    targetList?.appendChild(c)
  }
}
/**
 * Default export contains functions which should be executed in `DOMContentLoaded` listener
 */
export const pageFunctions = {
  DOMContentLoaded: {
    aggregateHomeContent,
  }
}
