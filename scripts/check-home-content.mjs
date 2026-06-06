import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const homeView = readFileSync("src/views/HomeView.jsx", "utf8")

assert.equal(homeView.includes("outcomeItems"), false, "HomeView should not render the post-training outcomes section")
assert.equal(homeView.includes("learningLevels"), false, "HomeView should not render the detailed curriculum section")
