import assert from "node:assert/strict"
import { readFileSync } from "node:fs"

const mobileCourseData = readFileSync("src/data/mobileCourseData.js", "utf8")

const financeCategoryCount = [...mobileCourseData.matchAll(/category:\s*"금융 실무"/g)].length
const financeTemplateIds = [...mobileCourseData.matchAll(/id:\s*"(finance-[^"]+)"/g)].map((match) => match[1])
const salesTradingCategoryCount = [...mobileCourseData.matchAll(/category:\s*"Sales & Trading"/g)].length
const salesTradingTemplateIds = [...mobileCourseData.matchAll(/id:\s*"(sales-trading-[^"]+)"/g)].map((match) => match[1])
const addedReviewTemplateIds = [...mobileCourseData.matchAll(/id:\s*"(review-[^"]+)"/g)].map((match) => match[1])
const addedDocumentTemplateIds = [...mobileCourseData.matchAll(/id:\s*"(document-[^"]+)"/g)].map((match) => match[1])
const commonMetaPromptTemplateIds = [...mobileCourseData.matchAll(/id:\s*"(common-meta-prompt[^"]*)"/g)].map((match) => match[1])

assert.equal(financeCategoryCount, 10, "There should be exactly 10 finance prompt templates")
assert.equal(new Set(financeTemplateIds).size, financeTemplateIds.length, "Finance prompt template ids should be unique")
assert.equal(financeTemplateIds.length, 10, "There should be exactly 10 finance prompt template ids")
assert.equal(salesTradingCategoryCount, 10, "There should be exactly 10 sales and trading prompt templates")
assert.equal(new Set(salesTradingTemplateIds).size, salesTradingTemplateIds.length, "Sales and trading prompt template ids should be unique")
assert.equal(salesTradingTemplateIds.length, 10, "There should be exactly 10 sales and trading prompt template ids")
assert.equal(addedReviewTemplateIds.length, 10, "There should be exactly 10 added review prompt templates")
assert.equal(new Set(addedReviewTemplateIds).size, addedReviewTemplateIds.length, "Added review prompt template ids should be unique")
assert.equal(addedDocumentTemplateIds.length, 10, "There should be exactly 10 added document prompt templates")
assert.equal(new Set(addedDocumentTemplateIds).size, addedDocumentTemplateIds.length, "Added document prompt template ids should be unique")
assert.equal(commonMetaPromptTemplateIds.length, 1, "There should be one common meta-prompt template")

assert.ok(mobileCourseData.includes("비식별"), "Finance prompt templates should require de-identification")
assert.ok(mobileCourseData.includes("내부 규정"), "Finance prompt templates should require internal policy review")
assert.ok(mobileCourseData.includes("담당자 검토"), "Finance prompt templates should require human review")
assert.ok(mobileCourseData.includes("투자 권유나 매매 지시가 아님"), "Sales and trading templates should avoid investment recommendation wording")
assert.ok(mobileCourseData.includes("메타프롬프트"), "Common templates should include a meta-prompt converter")
assert.ok(mobileCourseData.includes("원래 프롬프트"), "Meta-prompt template should accept the original prompt")
