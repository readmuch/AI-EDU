import { useMemo, useState } from "react"
import {
  allPostsCategory,
  filterInsightPosts,
  getInsightPage,
  insightArticles,
  insightCategories,
  normalizeInsightCategory,
} from "../data/insightData"

function formatDate(date) {
  if (!date) return "Undated"

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`))
}

function SourceLink({ post, compact = false }) {
  if (!post.sourceTitle && !post.sourceUrl) return null

  const label = post.sourceTitle || post.sourceUrl
  const className = compact
    ? "text-xs font-bold text-slate-500 underline-offset-4 hover:text-slate-950 hover:underline"
    : "inline-flex min-h-10 items-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-black text-slate-700 transition hover:border-slate-400"

  if (!post.sourceUrl) {
    return <span className={className}>{label}</span>
  }

  return (
    <a href={post.sourceUrl} target="_blank" rel="noreferrer" className={className} onClick={(event) => event.stopPropagation()}>
      {label}
    </a>
  )
}

function CategoryTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" aria-label="Insight categories">
      {categories.map((category) => {
        const isActive = category === activeCategory

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`min-h-10 shrink-0 rounded-full px-4 text-sm font-black transition focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 ${
              isActive ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-white hover:text-slate-950"
            }`}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}

function InsightCard({ post, onOpen }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(post.id)}
      className="group flex min-h-72 w-full flex-col rounded-lg border border-stone-200 bg-white p-5 text-left shadow-[0_1px_10px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)] focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="max-w-[70%] truncate rounded-full bg-stone-100 px-3 py-1 text-xs font-black text-stone-700">{post.category}</span>
        <time className="shrink-0 text-xs font-bold text-slate-500" dateTime={post.date || undefined}>
          {formatDate(post.date)}
        </time>
      </div>

      <h3 className="mt-5 text-2xl font-black leading-tight text-slate-950 group-hover:text-slate-700">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-base font-medium leading-7 text-slate-600">{post.summary}</p>

      <div className="mt-auto flex items-center justify-between gap-3 pt-6">
        <SourceLink post={post} compact />
        <span className="shrink-0 text-sm font-black text-slate-950">Read note</span>
      </div>
    </button>
  )
}

function InsightDetail({ post, PageComponent, onBack }) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-[0_1px_10px_rgba(15,23,42,0.04)] md:p-8">
      <button
        type="button"
        onClick={onBack}
        className="min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-black text-slate-700 transition hover:border-slate-400 hover:text-slate-950"
      >
        Back to posts
      </button>

      <header className="mt-7 border-b border-stone-200 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-black text-stone-700">{post.category}</span>
          <time className="text-sm font-bold text-slate-500" dateTime={post.date || undefined}>
            {formatDate(post.date)}
          </time>
        </div>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-5xl">{post.title}</h1>
        <p className="mt-4 max-w-3xl text-lg font-medium leading-8 text-slate-600">{post.summary}</p>
        <div className="mt-5">
          <SourceLink post={post} />
        </div>
      </header>

      <PageComponent post={post} />
    </article>
  )
}

function InsightView({ selectedInsightId }) {
  const initialPost = insightArticles.find((post) => post.id === selectedInsightId)
  const [activeCategory, setActiveCategory] = useState(initialPost?.category ?? allPostsCategory)
  const [searchTerm, setSearchTerm] = useState("")
  const [activePostId, setActivePostId] = useState(initialPost?.id ?? null)
  const visibleCategory = normalizeInsightCategory(activeCategory, insightCategories)

  const visiblePosts = useMemo(() => {
    return filterInsightPosts(insightArticles, visibleCategory, searchTerm)
  }, [visibleCategory, searchTerm])

  const hasRecoverableFilter = insightArticles.length > 0 && visiblePosts.length === 0 && (visibleCategory !== allPostsCategory || searchTerm.trim())

  const activePost = insightArticles.find((post) => post.id === activePostId)
  const activePage = activePost ? getInsightPage(activePost.id) : null
  const shelfCount = Math.max(insightCategories.length - 1, 0)

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setActivePostId(null)
  }

  if (activePost && activePage) {
    return (
      <div className="min-h-screen bg-slate-50 px-1 py-4 md:px-0">
        <InsightDetail post={activePost} PageComponent={activePage} onBack={() => setActivePostId(null)} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-1 py-4 text-slate-950 md:px-0">
      <section className="space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CategoryTabs categories={insightCategories} activeCategory={visibleCategory} onChange={handleCategoryChange} />
          <label className="md:w-72">
            <span className="sr-only">Search posts</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search posts"
              className="min-h-11 w-full rounded-lg border border-stone-200 bg-white px-4 text-sm font-bold text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-2 focus:ring-slate-950/10"
            />
          </label>
        </div>

        <div className="flex flex-col gap-4 border-y border-stone-200 py-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-stone-500">RECENTLY ADDED</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 md:text-5xl">{visibleCategory}</h1>
          </div>
          <p className="text-sm font-black text-slate-500">
            {insightArticles.length} notes across {shelfCount} shelves
          </p>
        </div>

        {visiblePosts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <InsightCard key={post.id} post={post} onOpen={setActivePostId} />
            ))}
          </div>
        ) : hasRecoverableFilter ? (
          <div className="rounded-lg border border-stone-200 bg-white p-8 text-center">
            <p className="text-lg font-black text-slate-950">No posts found</p>
            <p className="mt-2 text-sm font-bold text-slate-500">Clear the current filter to show all posts.</p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory(allPostsCategory)
                setSearchTerm("")
              }}
              className="mt-5 min-h-11 rounded-full bg-slate-950 px-5 text-sm font-black text-white transition hover:bg-slate-800"
            >
              Show all posts
            </button>
          </div>
        ) : (
          <div className="rounded-lg border border-stone-200 bg-white p-8 text-center">
            <p className="text-lg font-black text-slate-950">No posts found</p>
            <p className="mt-2 text-sm font-bold text-slate-500">Add Markdown files to content/insights.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default InsightView
