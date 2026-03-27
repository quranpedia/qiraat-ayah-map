export function app_href(path) {
  return window.navgo?.href(path) || path
}
