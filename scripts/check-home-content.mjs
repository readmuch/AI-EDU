import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const homeView = readFileSync("src/views/HomeView.jsx", "utf8")

assert.equal(homeView.includes("outcomeItems"), false, "HomeView should not render the post-training outcomes section")
assert.equal(homeView.includes("learningLevels"), false, "HomeView should not render the detailed curriculum section")
assert.ok(homeView.includes("recommendedPath"), "HomeView should define the recommended learning path")
assert.ok(homeView.includes("오늘의 추천 루트"), "HomeView should render the recommended route panel")
assert.ok(homeView.includes("md:text-4xl"), "Home hero title should use the smaller desktop title size")
assert.equal(homeView.includes("md:text-5xl"), false, "Home hero title should not use the oversized desktop title size")
