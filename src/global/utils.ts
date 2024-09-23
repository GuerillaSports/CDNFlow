
// NOTE: might add glob support for dynamic pages?
const SCOPED_FUNCTION_PAGES: { [key: string]: boolean } = {
  "articles": true
}
export function requiresScopedScript(url: string): boolean {
  const split = url.split("/")
  const terminus = split[split.length - 1]
  if (SCOPED_FUNCTION_PAGES[terminus]) {
    console.log("page requires scoped functions!", terminus)
  }

  return SCOPED_FUNCTION_PAGES[terminus]

}

