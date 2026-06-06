import assert from "node:assert/strict"
import {
  buildInsightCategories,
  filterInsightPosts,
  normalizeInsightCategory,
  parseInsightMarkdown,
  sortInsightPosts,
} from "../src/data/insightMarkdown.js"

const sampleMarkdown = `---
title: "체스"
category: "Games"
date: "2026-05-24"
summary: "말을 선택하고 합법 수를 따라 이동하며 체크메이트를 노리는 2인용 체스 게임입니다."
sourceTitle: "원본 출처명"
sourceUrl: "https://example.com"
---

## 본문 제목

본문 내용입니다.`

const parsed = parseInsightMarkdown(sampleMarkdown, "content/insights/chess.md")

assert.equal(parsed.id, "chess")
assert.equal(parsed.title, "체스")
assert.equal(parsed.category, "Games")
assert.equal(parsed.date, "2026-05-24")
assert.equal(parsed.sourceTitle, "원본 출처명")
assert.equal(parsed.sourceUrl, "https://example.com")
assert.match(parsed.html, /<h2[^>]*>본문 제목<\/h2>/)
assert.match(parsed.html, /본문 내용입니다/)

const posts = [
  parsed,
  { ...parsed, id: "workflow", title: "워크플로우", category: "AI", date: "2026-06-01", summary: "Agent", sourceTitle: "Guide" },
  { ...parsed, id: "undated", title: "날짜 없음", category: "Games", date: "", summary: "No date", sourceTitle: "Memo" },
]

assert.deepEqual(buildInsightCategories(posts), ["All Posts", "Games", "AI"])
assert.equal(normalizeInsightCategory("전체", ["All Posts", "Games", "AI"]), "All Posts")
assert.equal(normalizeInsightCategory("Games", ["All Posts", "Games", "AI"]), "Games")
assert.deepEqual(sortInsightPosts(posts).map((post) => post.id), ["workflow", "chess", "undated"])
assert.deepEqual(filterInsightPosts(posts, "Games", "").map((post) => post.id), ["chess", "undated"])
assert.deepEqual(filterInsightPosts(posts, "All Posts", "guide").map((post) => post.id), ["workflow"])
