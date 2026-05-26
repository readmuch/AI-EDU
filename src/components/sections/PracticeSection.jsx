import { useState } from "react"
import SectionTitle from "../SectionTitle"

const badgeColors = {
  "커뮤니케이션": "bg-blue-100 text-blue-700",
  "문서 작업": "bg-violet-100 text-violet-700",
  "데이터 분석": "bg-emerald-100 text-emerald-700",
  "기획": "bg-orange-100 text-orange-700",
  "프로젝트": "bg-indigo-100 text-indigo-700",
}

function CopyButton({ text }) {
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
      className="rounded-md bg-indigo-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-indigo-700"
    >
      {copied ? "복사 완료 ✓" : "복사"}
    </button>
  )
}

function PracticeCard({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 p-4 text-left hover:bg-slate-50 transition"
      >
        <div className="flex items-center gap-3">
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColors[item.badge] ?? "bg-slate-100 text-slate-600"}`}
          >
            {item.badge}
          </span>
          <span className="text-sm font-semibold text-slate-900">{item.title}</span>
        </div>
        <span className="shrink-0 text-slate-400 text-base">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="border-t border-slate-100 px-4 pb-5 pt-4 space-y-4">
          {/* 상황 */}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">상황</p>
            <p className="text-sm leading-relaxed text-slate-700">{item.situation}</p>
          </div>

          {/* 프롬프트 */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">프롬프트 예시</p>
              <CopyButton text={item.prompt} />
            </div>
            <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-indigo-100 bg-indigo-50 p-3 text-sm leading-relaxed text-slate-800">
              {item.prompt}
            </pre>
          </div>

          {/* 기대 출력 */}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">기대 출력 예시</p>
            <pre className="overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-relaxed text-slate-700">
              {item.expectedOutput}
            </pre>
          </div>

          {/* 팁 */}
          {item.tip && (
            <div className="flex items-start gap-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2">
              <span className="shrink-0 text-amber-500">💡</span>
              <p className="text-xs leading-relaxed text-amber-800">{item.tip}</p>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

function PracticeSection({ examples }) {
  return (
    <section id="practice" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionTitle
        badge="실습 예제"
        title="업무 상황별로 바로 써보는 AI 실습"
        subtitle="각 카드를 펼치면 상황 설명, 복사 가능한 프롬프트, 기대 출력 예시를 확인할 수 있습니다."
      />
      <div className="flex flex-col gap-3">
        {examples.map((item) => (
          <PracticeCard key={item.title} item={item} />
        ))}
      </div>
    </section>
  )
}

export default PracticeSection
