import SectionHeader from "../components/mobile/SectionHeader"
import { courseTracks, learningLevels, outcomeItems } from "../data/mobileCourseData"

function HomeView({ onNavigate }) {
  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-slate-950 px-5 py-7 text-white md:grid md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-8 md:px-8 md:py-10">
        <div>
          <p className="text-sm font-black text-teal-300">직장인을 위한 AI 활용 교육</p>
          <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">AI 학습을 기본 과정과 심화 과정으로 나눠 시작하세요</h1>
          <p className="mt-4 text-base leading-7 text-slate-200 md:max-w-2xl">
            처음 쓰는 사람은 AI 활용 기본기를 쌓고, 경험이 있는 사람은 Agent with Workflow로 업무 자동화 흐름을 설계합니다.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => onNavigate("course", { courseId: "ai-basics" })}
              className="min-h-12 rounded-lg bg-teal-400 px-4 py-3 text-base font-black text-slate-950 transition hover:bg-teal-300"
            >
              기본 과정 보기
            </button>
            <button
              type="button"
              onClick={() => onNavigate("course", { courseId: "agent-workflow-module-0" })}
              className="min-h-12 rounded-lg bg-white/10 px-4 py-3 text-base font-black text-white ring-1 ring-white/20 transition hover:bg-white/15"
            >
              심화 과정 보기
            </button>
          </div>
        </div>
        <div className="mt-7 grid gap-3 md:mt-0 md:grid-cols-2">
          {courseTracks.map((track) => (
            <button
              key={track.id}
              type="button"
              onClick={() => onNavigate("course", { courseId: track.courseId })}
              className="rounded-lg bg-white p-4 text-left text-slate-950 transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <p className={`text-sm font-black ${track.id === "advanced" ? "text-indigo-700" : "text-amber-700"}`}>{track.badge}</p>
              <h2 className="mt-2 text-2xl font-black leading-tight">{track.title}</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">{track.desc}</p>
              <ul className="mt-4 space-y-2">
                {track.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm font-bold leading-6 text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-slate-950 px-3 py-2 text-sm font-black text-white">
                {track.action}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-sm font-black text-slate-500">교육 후 할 수 있는 일</p>
        <div className="mt-3 grid gap-2 md:grid-cols-3">
          {outcomeItems.map((item) => (
            <div key={item} className="rounded-lg bg-slate-50 p-3 text-sm font-bold leading-6 text-slate-700">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeader
          eyebrow="세부 커리큘럼"
          title="기본기를 쌓은 뒤 심화 과정으로 확장하세요"
          desc="기본 과정은 단계별로 이어지고, Agent with Workflow는 별도의 심화 과정으로 독립 운영됩니다."
        />
        <div className="grid gap-3 md:grid-cols-3">
          {learningLevels.map((level) => (
            <button
              key={level.id}
              type="button"
              onClick={() => onNavigate("course", { courseId: level.id })}
              className="rounded-lg border border-slate-200 bg-white p-4 text-left transition hover:border-indigo-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-indigo-700">{level.step}</p>
                  <h3 className="mt-1 text-xl font-black text-slate-950">{level.title}</h3>
                </div>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-sm font-bold text-slate-600">{level.duration}</span>
              </div>
              <p className="mt-3 text-base leading-7 text-slate-600">{level.summary}</p>
              <p className="mt-3 rounded-lg bg-teal-50 p-3 text-sm font-bold leading-6 text-teal-900">{level.outcome}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomeView
