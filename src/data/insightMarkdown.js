const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/
const ALL_POSTS = "All Posts"

const markdownModules = typeof import.meta.glob === "function"
  ? import.meta.glob("../../content/insights/*.md", { eager: true, query: "?raw", import: "default" })
  : {}

function slugFromPath(filePath) {
  return filePath.split(/[\\/]/).pop()?.replace(/\.md$/, "") ?? "untitled"
}

function stripQuotes(value) {
  const trimmed = value.trim()
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

function parseFrontmatter(source) {
  return source.split(/\r?\n/).reduce((metadata, line) => {
    const separatorIndex = line.indexOf(":")
    if (separatorIndex === -1) return metadata

    const key = line.slice(0, separatorIndex).trim()
    const value = stripQuotes(line.slice(separatorIndex + 1))
    return key ? { ...metadata, [key]: value } : metadata
  }, {})
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

function inlineMarkdown(value) {
  return escapeHtml(value).replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
}

export function markdownToHtml(markdown) {
  const lines = markdown.trim().split(/\r?\n/)
  const html = []
  let listItems = []

  const flushList = () => {
    if (!listItems.length) return
    html.push(`<ul>${listItems.map((item) => `<li>${inlineMarkdown(item)}</li>`).join("")}</ul>`)
    listItems = []
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      flushList()
      continue
    }

    if (line.startsWith("- ")) {
      listItems.push(line.slice(2))
      continue
    }

    flushList()

    if (line.startsWith("### ")) {
      html.push(`<h3>${inlineMarkdown(line.slice(4))}</h3>`)
    } else if (line.startsWith("## ")) {
      html.push(`<h2>${inlineMarkdown(line.slice(3))}</h2>`)
    } else if (line.startsWith("# ")) {
      html.push(`<h1>${inlineMarkdown(line.slice(2))}</h1>`)
    } else if (line.startsWith("> ")) {
      html.push(`<blockquote>${inlineMarkdown(line.slice(2))}</blockquote>`)
    } else {
      html.push(`<p>${inlineMarkdown(line)}</p>`)
    }
  }

  flushList()
  return html.join("\n")
}

export function parseInsightMarkdown(markdown, filePath) {
  const match = markdown.match(FRONTMATTER_PATTERN)
  const metadata = match ? parseFrontmatter(match[1]) : {}
  const body = match ? match[2] : markdown
  const id = slugFromPath(filePath)

  return {
    id,
    title: metadata.title || id,
    category: metadata.category || "Uncategorized",
    date: metadata.date || "",
    summary: metadata.summary || "",
    sourceTitle: metadata.sourceTitle || "",
    sourceUrl: metadata.sourceUrl || "",
    body: body.trim(),
    html: markdownToHtml(body),
    readTime: metadata.readTime || "3 min",
    audience: metadata.audience ? metadata.audience.split(",").map((item) => item.trim()).filter(Boolean) : [],
  }
}

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

export const insightArticles = sortInsightPosts(
  Object.entries(markdownModules).map(([path, markdown]) => parseInsightMarkdown(markdown, path)),
)

export const insightCategories = buildInsightCategories(insightArticles)
export const featuredInsights = insightArticles.slice(0, 3)
export const allPostsCategory = ALL_POSTS
