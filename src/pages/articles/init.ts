/**
 * Should a custom event listener be required, do it in the file. Otherwise, add the function to the default exports to be executed with the global functions in "DOMContentLoaded"
 */

function test_non_default_function() {
  console.log("[gs-cdnflow/articles]: confirming scoped functions on load event")
}

/**
* If no sub-featured articles exist, hide the "Top Stories" header from the page
*/
function checkSubFeaturedHeader() {
  console.log("[gs-cdnflow/articles]: check sub featured header")
  const hasItems = !!document.querySelector(".cl-top-articles-list");
  const header = document.querySelector(".articles__top-stories--header") as HTMLElement
  if (!hasItems) {
    header.style.display = "none";
  };
};


function dev_confirmScopedFunctions_Default() {
  console.log("[gs-cdnflow/articles]: confirming scoped functions on 'DOMContentLoaded' event ")
}


/**
 * Default export contains functions which should be executed in `DOMContentLoaded` listener
 */
const articles = {
  DOMContentLoaded: {
    checkSubFeaturedHeader,
    dev_confirmScopedFunctions_Default
  },
  load: {
    test_non_default_function
  }
}

export default articles
