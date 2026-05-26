import SectionTitle from "../SectionTitle"

function AudienceSection({ items }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionTitle
        badge="교육 대상"
        title="이런 분들에게 추천합니다"
        subtitle="AI 초보 직장인도 업무에 바로 적용할 수 있도록 설계된 과정입니다."
      />
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700"
          >
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default AudienceSection
