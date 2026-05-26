import SectionTitle from "../SectionTitle"

function FaqSection({ items }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionTitle
        badge="FAQ"
        title="자주 묻는 질문"
        subtitle="교육 신청 전 많이 물어보는 내용을 정리했습니다."
      />
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.q} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <summary className="cursor-pointer text-sm font-semibold text-slate-900">{item.q}</summary>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default FaqSection
