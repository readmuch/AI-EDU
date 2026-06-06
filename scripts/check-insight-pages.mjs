import assert from "node:assert/strict"
import { existsSync } from "node:fs"

import {
  allPostsCategory,
  featuredInsights,
  getInsightPage,
  insightArticles,
  insightCategories,
} from "../src/data/insightData.js"
import { openAiTaxAgentSections } from "../src/views/insights/OpenAiTaxAgentInsight.js"

assert.ok(insightArticles.length > 0, "Expected at least one published insight")
assert.equal(allPostsCategory, "All Posts")
assert.ok(insightCategories.includes(allPostsCategory), "Expected All Posts category")
assert.ok(featuredInsights.length > 0, "Expected featured insights")

const ids = new Set()

for (const post of insightArticles) {
  assert.ok(post.id, "Insight is missing id")
  assert.ok(post.title, `${post.id} is missing title`)
  assert.ok(post.category, `${post.id} is missing category`)
  assert.match(post.date, /^\d{4}-\d{2}-\d{2}$/, `${post.id} date must be YYYY-MM-DD`)
  assert.ok(post.summary, `${post.id} is missing summary`)
  assert.ok(post.sourcePath?.startsWith("content/insight-sources/"), `${post.id} must point to raw source md`)
  assert.ok(existsSync(post.sourcePath), `${post.id} sourcePath does not exist: ${post.sourcePath}`)
  assert.equal(ids.has(post.id), false, `Duplicate insight id: ${post.id}`)
  ids.add(post.id)

  assert.equal(typeof getInsightPage(post.id), "function", `${post.id} is missing a page component`)
}

assert.equal(getInsightPage("missing-page"), null)
assert.equal(
  typeof getInsightPage("the-five-ai-value-models-driving-business-reinvention"),
  "function",
  "The five AI value models source should be published",
)

assert.deepEqual(
  openAiTaxAgentSections.filter((section) => section.type === "heading").map((section) => section.text),
  ["핵심요약", "시사점"],
)
assert.equal(
  openAiTaxAgentSections.every((section) => section.type === "heading" || section.type === "paragraph"),
  true,
  "OpenAI tax agent insight should render only summary and implications paragraphs",
)
