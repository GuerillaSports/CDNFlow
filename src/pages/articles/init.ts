/**
 * Should a custom event listener be required, do it in the file. Otherwise, add the function to the default exports to be executed with the global functions in "DOMContentLoaded"
 */
window.addEventListener("load", function () {
  function test_non_default_function() {
    console.log("[gs-cdnflow/articles]: confirming scoped functions. Non default functions still execute")
  }
  test_non_default_function()
})
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
  console.log("[gs-cdnflow/articles]: confirming scoped functions. All default exports execute in 'DOMContentLoaded'")
}


/**
 * Default export contains functions which should be executed in `DOMContentLoaded` listener
 */
const articles = {
  checkSubFeaturedHeader,
  dev_confirmScopedFunctions_Default
}

export default articles
