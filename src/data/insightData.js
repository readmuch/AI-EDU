import { getInsightPage } from "../views/insights/insightPageMap.js"

const ALL_POSTS = "All Posts"

const insightRecords = [
  {
    id: "the-five-ai-value-models-driving-business-reinvention",
    title: "비즈니스 혁신을 이끄는 다섯 가지 AI 가치 모델",
    category: "AI Adoption",
    date: "2026-03-05",
    summary: "OpenAI가 기업의 AI 도입을 단발성 파일럿이 아니라 다섯 가지 가치 모델의 포트폴리오로 설계해야 한다고 설명한 전략 가이드입니다.",
    sourceTitle: "The five AI value models driving business reinvention",
    sourceUrl: "https://openai.com/ko-KR/index/the-five-ai-value-models-driving-business-reinvention/",
    sourcePath: "content/insight-sources/the-five-ai-value-models-driving-business-reinvention.md",
    readTime: "5 min",
    audience: ["office worker", "leader", "educator"],
  },
  {
    id: "openai",
    title: "Codex로 자기개선형 세무 에이전트 만들기",
    category: "AI Workflow",
    date: "2026-05-27",
    summary: "OpenAI와 Thrive Holdings가 Codex, 전문가 피드백, 제품 trace, eval을 연결해 세무 업무 에이전트를 지속적으로 개선한 사례입니다.",
    sourceTitle: "Building self-improving tax agents with Codex",
    sourceUrl: "https://openai.com/ko-KR/index/building-self-improving-tax-agents-with-codex/",
    sourcePath: "content/insight-sources/OpenAiTaxAgentInsight.md",
    readTime: "4 min",
    audience: ["office worker", "developer", "educator"],
  },
]

export function sortInsightPosts(posts) {
  return [...posts].sort((left, right) => {
    if (!left.date && !right.date) return left.title.localeCompare(right.title)
    if (!left.date) return 1
    if (!right.date) return -1
    return right.date.localeCompare(left.date)
  })
}

export function buildInsightCategories(posts) {
  const categories = posts.reduce((items, post) => {
    return items.includes(post.category) ? items : [...items, post.category]
  }, [])

  return [ALL_POSTS, ...categories]
}

export function filterInsightPosts(posts, activeCategory, searchTerm) {
  const normalizedSearch = searchTerm.trim().toLowerCase()
  const categoryFiltered = activeCategory === ALL_POSTS ? posts : posts.filter((post) => post.category === activeCategory)

  if (!normalizedSearch) return categoryFiltered

  return categoryFiltered.filter((post) => {
    return [post.title, post.summary, post.category, post.sourceTitle].some((value) => value.toLowerCase().includes(normalizedSearch))
  })
}

export function normalizeInsightCategory(activeCategory, categories) {
  return categories.includes(activeCategory) ? activeCategory : ALL_POSTS
}

export { getInsightPage }

export const insightArticles = sortInsightPosts(insightRecords)
export const insightCategories = buildInsightCategories(insightArticles)
export const featuredInsights = insightArticles.slice(0, 3)
export const allPostsCategory = ALL_POSTS
