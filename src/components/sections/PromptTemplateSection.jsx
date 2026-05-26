import { useState } from "react"
import SectionTitle from "../SectionTitle"

const categoryColors = {
  "공통": "bg-slate-100 text-slate-600",
  "커뮤니케이션": "bg-blue-100 text-blue-700",
  "문서 작업": "bg-violet-100 text-violet-700",
  "데이터 분석": "bg-emerald-100 text-emerald-700",
  "기획": "bg-orange-100 text-orange-700",
  "브레인스토밍": "bg-pink-100 text-pink-700",
}

function CopyButton({ text, label = "템플릿 복사" }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-700"
    >
      {copied ? "복사 완료 ✓" : label}
    </button>
  )
}

function PromptTemplateSection({ templates }) {
  const [activeId, setActiveId] = useState(templates[0]?.id)
  const active = templates.find((t) => t.id === activeId) ?? templates[0]

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionTitle
        badge="프롬프트 템플릿"
        title="업무 유형별 바로 쓰는 템플릿 6종"
        subtitle="[ ] 안의 항목만 채우면 바로 사용할 수 있습니다. 복사 후 AI 채팅창에 붙여넣으세요."
      />

      {/* 탭 */}
      <div className="mb-5 flex flex-wrap gap-2">
        {templates.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveId(t.id)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
              activeId === t.id
                ? "bg-indigo-600 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* 선택된 템플릿 */}
      {active && (
        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-5 space-y-4">
          {/* 헤더 */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-semibold ${categoryColors[active.category] ?? "bg-slate-100 text-slate-600"}`}
                >
                  {active.category}
                </span>
                <h3 className="text-base font-bold text-slate-900">{active.title}</h3>
              </div>
              <p className="text-sm text-slate-600">{active.desc}</p>
            </div>
            <CopyButton text={active.template} label="템플릿 복사" />
          </div>

          {/* 템플릿 */}
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">템플릿</p>
            <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-indigo-200 bg-white p-4 text-sm leading-relaxed text-slate-800">
              {active.template}
            </pre>
          </div>

          {/* 작성 예시 */}
          {active.example && (
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">작성 예시</p>
                <CopyButton text={active.example} label="예시 복사" />
              </div>
              <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                {active.example}
              </pre>
            </div>
          )}

          <p className="text-xs text-slate-400">[ ] 안의 항목을 채운 뒤 ChatGPT, Claude, Gemini 등에 붙여넣어 사용하세요.</p>
        </div>
      )}
    </section>
  )
}

export default PromptTemplateSection
