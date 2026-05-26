import SectionTitle from "../SectionTitle"

function RoadmapSection({ levels }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionTitle
        badge="교육 로드맵"
        title="입문 → 실무 활용 → 프로젝트 완성"
        subtitle="단계가 올라갈수록 난이도와 실전 적용 범위가 확장됩니다."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        {levels.map((level, idx) => (
          <article
            key={level.id}
            className="relative rounded-2xl border border-indigo-100 bg-gradient-to-b from-white to-indigo-50 p-5"
          >
            {idx < levels.length - 1 ? (
              <span className="absolute -right-3 top-8 hidden rounded-full bg-indigo-600 px-2 py-0.5 text-xs text-white lg:inline-block">
                →
              </span>
            ) : null}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white">
                {level.step}
              </span>
              <span className="rounded-full bg-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">
                {level.badge}
              </span>
            </div>
            <h3 className="mb-2 text-base font-bold text-slate-900">{level.title}</h3>
            <p className="mb-4 text-sm text-slate-700">{level.goal}</p>
            <div className="mb-3 flex flex-wrap gap-2 text-xs">
              <span className="rounded-md bg-indigo-100 px-2 py-1 text-indigo-700">{level.difficulty}</span>
              <span className="rounded-md bg-blue-100 px-2 py-1 text-blue-700">{level.duration}</span>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold text-slate-800">대표 실습</p>
              <p className="text-sm text-slate-700">{level.practice[0]}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default RoadmapSection
