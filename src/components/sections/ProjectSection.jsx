import SectionTitle from "../SectionTitle"

const projectSteps = [
  "업무 문제 찾기",
  "AI 활용 가능성 판단하기",
  "프롬프트와 워크플로우 설계하기",
  "결과물 테스트하기",
  "개선하고 발표하기",
]

function ProjectSection({ examples }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
      <SectionTitle
        badge="최종 프로젝트"
        title="실무에 바로 쓰는 나만의 AI 프로젝트 완성"
        subtitle="교육 마지막에는 개인 업무를 해결하는 AI 프로젝트를 기획하고 발표 가능한 수준으로 정리합니다."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="mb-3 text-base font-semibold text-slate-900">프로젝트 진행 단계</h3>
          <ol className="space-y-2 text-sm text-slate-700">
            {projectSteps.map((step, idx) => (
              <li key={step} className="flex items-start gap-3">
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {idx + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
          <h3 className="mb-3 text-base font-semibold text-slate-900">완성 가능한 프로젝트 예시</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {examples.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-indigo-600">◆</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default ProjectSection
