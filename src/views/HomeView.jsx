import { featuredInsights } from "../data/insightData"
import { courseTracks } from "../data/mobileCourseData"

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

      <section className="rounded-lg bg-slate-950 px-5 py-7 text-white md:grid md:grid-cols-[0.95fr_1.05fr] md:items-center md:gap-8 md:px-8 md:py-10">
        <div>
          <p className="text-sm font-black text-teal-300">AI 인사이트</p>
          <h2 className="mt-3 text-3xl font-black leading-tight md:text-5xl">최신 AI 트렌드를 실무 관점으로 공유합니다</h2>
          <p className="mt-4 text-base leading-7 text-slate-200 md:max-w-2xl">
            기술 뉴스와 기업 사례를 교육, 자동화, 생산성 관점에서 다시 풀어냅니다.
          </p>
          <button
            type="button"
            onClick={() => onNavigate("insights")}
            className="mt-6 min-h-12 w-full rounded-lg bg-teal-400 px-4 py-3 text-base font-black text-slate-950 transition hover:bg-teal-300 sm:w-auto sm:min-w-48"
          >
            AI 인사이트 전체 보기
          </button>
        </div>
        <div className="mt-7 grid gap-3 md:mt-0 md:grid-cols-2">
          {featuredInsights.map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => onNavigate("insights", { insightId: article.id })}
              className="rounded-lg bg-white p-4 text-left text-slate-950 transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <p className="text-sm font-black text-indigo-700">{article.category}</p>
              <h3 className="mt-2 text-2xl font-black leading-tight">{article.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{article.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-black text-slate-600">{article.readTime}</span>
                {article.audience.map((item) => (
                  <span key={item} className="rounded-md bg-teal-50 px-2 py-1 text-xs font-black text-teal-800">
                    {item}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-slate-950 px-3 py-2 text-sm font-black text-white">
                인사이트 읽기
              </span>
            </button>
          ))}
        </div>
      </section>

    </div>
  )
}

export default HomeView
