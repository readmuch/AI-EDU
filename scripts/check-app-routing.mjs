import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const appSource = readFileSync("src/App.jsx", "utf8")

assert.ok(appSource.includes("window.history.pushState"), "App navigation should create browser history entries")
assert.ok(appSource.includes("popstate"), "App should synchronize state when browser back/forward is used")
assert.ok(appSource.includes("readNavigationState()"), "App should reuse navigation hash parsing for browser history sync")

console.log("App routing verification passed")
