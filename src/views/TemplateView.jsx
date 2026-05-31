import { useMemo, useState } from "react"
import CopyButton from "../components/mobile/CopyButton"
import SectionHeader from "../components/mobile/SectionHeader"
import { promptTemplates } from "../data/mobileCourseData"

function TemplateView() {
  const categories = useMemo(() => ["전체", ...new Set(promptTemplates.map((template) => template.category))], [])
  const [activeCategory, setActiveCategory] = useState("전체")
  const visibleTemplates =
    activeCategory === "전체" ? promptTemplates : promptTemplates.filter((template) => template.category === activeCategory)

  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="템플릿"
        title="복사해서 쓰는 프롬프트"
        desc="괄호 안의 내용만 바꾸면 실무 상황에 맞게 바로 사용할 수 있습니다."
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((category) => {
          const isActive = category === activeCategory
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`min-h-11 rounded-lg px-4 text-sm font-black transition ${
                isActive ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {category}
            </button>
          )
        })}
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {visibleTemplates.map((template) => (
          <article key={template.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-indigo-700">{template.category}</p>
                <h3 className="mt-1 text-xl font-black text-slate-950">{template.title}</h3>
                <p className="mt-2 text-base leading-7 text-slate-600">{template.desc}</p>
              </div>
              <CopyButton text={template.template} />
            </div>
            <pre className="mt-4 whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-800">
              {template.template}
            </pre>
          </article>
        ))}
      </div>
    </div>
  )
}

export default TemplateView
