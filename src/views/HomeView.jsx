import SectionHeader from "../components/mobile/SectionHeader"
import { learningLevels, outcomeItems } from "../data/mobileCourseData"

function HomeView({ onNavigate }) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-slate-950 px-5 py-7 text-white md:grid md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-8 md:px-8 md:py-10">
        <div>
          <p className="text-sm font-black text-teal-300">직장인을 위한 AI 활용 교육</p>
          <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">입문부터 프로젝트까지 이어지는 AI 학습</h1>
          <p className="mt-4 text-base leading-7 text-slate-200 md:max-w-2xl">
            처음 쓰는 사람도 ChatGPT 기본 사용, 프롬프트 작성, 업무 생산성, 리더십, 실습 프로젝트까지 자연스럽게 따라갈 수 있도록 구성했습니다.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => onNavigate("course")}
              className="min-h-12 rounded-lg bg-teal-400 px-4 py-3 text-base font-black text-slate-950 transition hover:bg-teal-300"
            >
              과정 보기
            </button>
            <button
              type="button"
              onClick={() => onNavigate("practice")}
              className="min-h-12 rounded-lg bg-white/10 px-4 py-3 text-base font-black text-white ring-1 ring-white/20 transition hover:bg-white/15"
            >
              실습 예제
            </button>
            <button
              type="button"
              onClick={() => onNavigate("templates")}
              className="min-h-12 rounded-lg bg-white/10 px-4 py-3 text-base font-black text-white ring-1 ring-white/20 transition hover:bg-white/15"
            >
              템플릿 복사
            </button>
          </div>
        </div>
        <div className="mt-7 rounded-lg bg-white p-4 text-slate-950 md:mt-0">
          <p className="text-sm font-black text-amber-700">교육 후 할 수 있는 일</p>
          <ul className="mt-3 space-y-3">
            {outcomeItems.map((item) => (
              <li key={item} className="flex gap-3 text-base font-bold leading-6">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-teal-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="학습 경로"
          title="내 상황에 맞는 과정부터 시작하세요"
          desc="각 과정은 독립적으로 볼 수 있지만, 처음이라면 AI 입문과 ChatGPT 101부터 보는 것이 가장 안전합니다."
        />
        <div className="grid gap-3 md:grid-cols-3">
          {learningLevels.map((level) => (
            <article key={level.id} className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-indigo-700">{level.step}</p>
                  <h3 className="mt-1 text-xl font-black text-slate-950">{level.title}</h3>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-sm font-bold text-slate-600">{level.duration}</span>
              </div>
              <p className="mt-3 text-base leading-7 text-slate-600">{level.summary}</p>
              <p className="mt-3 rounded-lg bg-teal-50 p-3 text-sm font-bold leading-6 text-teal-900">{level.outcome}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomeView
