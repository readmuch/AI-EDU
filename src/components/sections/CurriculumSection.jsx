import SectionTitle from "../SectionTitle"

function CurriculumCard({ level }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white">{level.step}</span>
        <span className="text-xs font-medium text-slate-500">{level.badge}</span>
      </div>
      <h3 className="mb-3 text-lg font-bold text-slate-900">{level.title}</h3>
      <div className="grid gap-4 text-sm text-slate-700 md:grid-cols-2">
        <div>
          <p className="mb-2 font-semibold text-slate-900">학습 목표</p>
          <p>{level.goal}</p>
        </div>
        <div>
          <p className="mb-2 font-semibold text-slate-900">수강 후 할 수 있는 일</p>
          <ul className="space-y-1">
            {level.outcomes.map((outcome) => (
              <li key={outcome} className="flex items-start gap-2">
                <span className="text-indigo-600">•</span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-900">핵심 이론</p>
          <ul className="space-y-1 text-sm text-slate-700">
            {level.theory.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-indigo-50 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-900">실습 과제</p>
          <ul className="space-y-1 text-sm text-slate-700">
            {level.practice.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

function CurriculumSection({ levels }) {
  return (
    <section id="curriculum" className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
      <SectionTitle
        badge="커리큘럼 상세"
        title="레벨별 학습 목표와 실습 과제"
        subtitle="각 단계에서 무엇을 배우고, 무엇을 할 수 있게 되는지 명확하게 제공합니다."
      />
      <div className="space-y-4">
        {levels.map((level) => (
          <CurriculumCard key={level.id} level={level} />
        ))}
      </div>
    </section>
  )
}

export default CurriculumSection
