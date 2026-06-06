import assert from "node:assert/strict"

import {
  buildNavigationHash,
  parseNavigationHash,
} from "../src/data/navigationState.js"

assert.deepEqual(parseNavigationHash("#insights"), {
  activeTab: "insights",
  selectedCourseId: null,
  selectedInsightId: null,
})

assert.deepEqual(parseNavigationHash("#insights/openai"), {
  activeTab: "insights",
  selectedCourseId: null,
  selectedInsightId: "openai",
})

assert.deepEqual(parseNavigationHash("#course/ai-basics"), {
  activeTab: "course",
  selectedCourseId: "ai-basics",
  selectedInsightId: null,
})

assert.deepEqual(parseNavigationHash("#unknown/openai"), {
  activeTab: "home",
  selectedCourseId: null,
  selectedInsightId: null,
})

assert.equal(buildNavigationHash("insights", { insightId: "openai" }), "#insights/openai")
assert.equal(buildNavigationHash("course", { courseId: "ai-basics" }), "#course/ai-basics")
assert.equal(buildNavigationHash("templates"), "#templates")
