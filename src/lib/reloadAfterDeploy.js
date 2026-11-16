// Every deploy replaces the hashed files in /assets (the FTP sync deletes the previous build). A tab that
// was opened before the deploy still runs the old bundle, so its first lazy import (a page route) gets
// a 404 and React would leave a blank page. Vite reports that as `vite:preloadError`; the page then
// reloads once and gets the current build. A second failure within a minute is not retried, so a
// broken deploy cannot cause a reload loop.
const LAST_RELOAD_KEY = 'anka:reload-after-deploy'
const RETRY_WINDOW_MS = 60_000

function readLastReload() {
  try {
    return Number(window.sessionStorage.getItem(LAST_RELOAD_KEY)) || 0
  } catch {
    return 0
  }
}

function writeLastReload(time) {
  try {
    window.sessionStorage.setItem(LAST_RELOAD_KEY, String(time))
    return true
  } catch {
    return false
  }
}

export function installReloadAfterDeploy() {
  window.addEventListener('vite:preloadError', (event) => {
    const now = Date.now()
    if (now - readLastReload() < RETRY_WINDOW_MS) return
    // Without storage there is no loop guard, so the error is left to surface instead of reloading.
    if (!writeLastReload(now)) return
    event.preventDefault()
    window.location.reload()
  })
}
