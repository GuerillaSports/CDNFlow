/**
* If no sub-featured articles exist, hide the "Top Stories" header from the page
*/
function checkSubFeaturedHeader() {
  console.log("[gs-cdnflow/articles]: check sub featured header")
  const hasItems = !!document.querySelector(".cl-top-articles-list");
  const header = document.querySelector(".articles__top-stories--header") as HTMLElement | null
  if (!header) return
  if (!hasItems) {
    header.style.display = "none";
  };
};


/**
 * Default export contains functions which should be executed in `DOMContentLoaded` listener
 */
export const pageFunctions = {
  DOMContentLoaded: {
    checkSubFeaturedHeader,
  }
}
