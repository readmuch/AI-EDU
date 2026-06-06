import { featuredInsights } from "../data/insightData"
import { courseTracks } from "../data/mobileCourseData"

const hubStats = [
  { label: "Academy", value: "2 Tracks", desc: "입문부터 Agent Workflow까지", tabId: "course", options: { courseId: "ai-basics" } },
  { label: "Insights", value: `${featuredInsights.length} Articles`, desc: "비즈니스와 업무 적용 관점", tabId: "insights" },
  { label: "Practice", value: "Ready-to-use", desc: "프롬프트와 실습 자료 연결", tabId: "templates" },
]

const recommendedPath = [
  {
    step: "1",
    title: "기본기 잡기",
    desc: "AI 입문 과정으로 핵심 개념 정리",
    action: "과정",
    tabId: "course",
    options: { courseId: "ai-basics" },
  },
  {
    step: "2",
    title: "업무 관점 넓히기",
    desc: "사례와 전략 인사이트로 적용 방향 확인",
    action: "인사이트",
    tabId: "insights",
    options: {},
  },
  {
    step: "3",
    title: "바로 적용하기",
    desc: "템플릿과 실습 자료로 반복 가능한 흐름 만들기",
    action: "실습",
    tabId: "templates",
    options: {},
  },
]

const topicPicks = [
  {
    title: "AI Agent를 이해하고 적용하기",
    desc: "심화 과정과 워크플로우 인사이트를 함께 보며 실제 업무 자동화 흐름을 설계합니다.",
    primary: { label: "Agent 과정", tabId: "course", options: { courseId: "agent-workflow-module-0" } },
    secondary: { label: "관련 인사이트", tabId: "insights", options: { insightId: "openai" } },
  },
  {
    title: "비즈니스 리더를 위한 AI 전략",
    desc: "AI 도입을 도구 선택이 아니라 가치 모델, 파일럿, 운영 기준으로 판단합니다.",
    primary: { label: "전략 인사이트", tabId: "insights", options: { insightId: "the-five-ai-value-models-driving-business-reinvention" } },
    secondary: { label: "기본 과정", tabId: "course", options: { courseId: "ai-basics" } },
  },
  {
    title: "업무 생산성 빠르게 시작하기",
    desc: "입문 과정에서 기본기를 잡고 실습과 템플릿으로 바로 쓸 수 있는 업무 흐름을 만듭니다.",
    primary: { label: "학습 시작", tabId: "course", options: { courseId: "ai-basics" } },
    secondary: { label: "템플릿 보기", tabId: "templates", options: {} },
  },
]

function HomeView({ onNavigate }) {
  const primaryInsight = featuredInsights[0]
  const secondaryInsight = featuredInsights[1]
  const advancedTrack = courseTracks.find((track) => track.id === "advanced") ?? courseTracks[1]

  const featuredCards = [
    primaryInsight && {
      type: "Insight",
      tone: "text-indigo-700 bg-indigo-50",
      title: primaryInsight.title,
      desc: primaryInsight.summary,
      meta: primaryInsight.readTime,
      action: "대표 인사이트 읽기",
      onClick: () => onNavigate("insights", { insightId: primaryInsight.id }),
    },
    advancedTrack && {
      type: "Academy",
      tone: "text-teal-800 bg-teal-50",
      title: advancedTrack.title,
      desc: advancedTrack.desc,
      meta: advancedTrack.badge,
      action: advancedTrack.action,
      onClick: () => onNavigate("course", { courseId: advancedTrack.courseId }),
    },
    {
      type: "Practice",
      tone: "text-amber-800 bg-amber-50",
      title: "프롬프트와 실습 자료",
      desc: "업무 상황별 예시와 템플릿을 골라 바로 테스트하고 반복 가능한 작업 흐름으로 정리합니다.",
      meta: "Templates",
      action: "실습 자료 보기",
      onClick: () => onNavigate("templates"),
    },
  ].filter(Boolean)

  return (
    <div className="space-y-5">
      <section className="overflow-hidden rounded-lg bg-white text-slate-950 shadow-sm ring-1 ring-slate-200">
        <div className="grid gap-0 md:grid-cols-[1.05fr_0.95fr]">
          <div className="px-5 py-7 md:px-8 md:py-10">
            <p className="text-sm font-black uppercase text-teal-700">AI Media & Academy Hub</p>
            <h1 className="mt-3 text-3xl font-black leading-tight md:text-4xl">
              AI 실무자를 위한 지식 미디어와 학습 허브
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600 md:max-w-2xl">
              생성형 AI의 기본기, Agent Workflow, 비즈니스 인사이트, 실습 자료를 한 화면에서 연결해 업무 적용까지 이어갑니다.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => onNavigate("course", { courseId: "ai-basics" })}
                className="min-h-12 rounded-lg bg-slate-950 px-4 py-3 text-base font-black text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
              >
                교육 과정 살펴보기
              </button>
              <button
                type="button"
                onClick={() => onNavigate("insights")}
                className="min-h-12 rounded-lg bg-teal-50 px-4 py-3 text-base font-black text-teal-900 ring-1 ring-teal-200 transition hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
              >
                최신 인사이트 읽기
              </button>
            </div>
            <div className="mt-7 rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200 md:mt-10">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-base font-black text-slate-950">오늘의 추천 루트</p>
                <p className="text-xs font-black uppercase text-teal-700">Learn - Think - Apply</p>
              </div>
              <div className="mt-3 divide-y divide-slate-200">
                {recommendedPath.map((item) => (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => onNavigate(item.tabId, item.options)}
                    className="grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 py-3 text-left transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-teal-400"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-white">
                      {item.step}
                    </span>
                    <span>
                      <span className="block text-sm font-black text-slate-950">{item.title}</span>
                      <span className="mt-1 block text-sm font-semibold leading-5 text-slate-600">{item.desc}</span>
                    </span>
                    <span className="text-sm font-black text-teal-700">{item.action}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-slate-950 p-5 text-white md:border-l md:border-t-0 md:p-6">
            <p className="text-sm font-black text-teal-300">Featured Now</p>
            <div className="mt-4 space-y-3">
              {featuredCards.map((item) => (
                <button
                  key={`${item.type}-${item.title}`}
                  type="button"
                  onClick={item.onClick}
                  className="w-full rounded-lg bg-white p-4 text-left text-slate-950 transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-950"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-md px-2 py-1 text-xs font-black ${item.tone}`}>{item.type}</span>
                    <span className="text-xs font-black text-slate-500">{item.meta}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-black leading-tight">{item.title}</h2>
                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.desc}</p>
                  <span className="mt-3 inline-flex min-h-9 items-center rounded-lg bg-slate-950 px-3 py-2 text-sm font-black text-white">
                    {item.action}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        {hubStats.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onNavigate(item.tabId, item.options)}
            className="rounded-lg bg-white p-4 text-left shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
          >
            <p className="text-xs font-black uppercase text-slate-500">{item.label}</p>
            <p className="mt-2 text-2xl font-black text-slate-950">{item.value}</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">{item.desc}</p>
          </button>
        ))}
      </section>

      <section className="rounded-lg bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200 md:px-6 md:py-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-teal-700">Academy</p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950 md:text-3xl">체계적으로 배우는 AI 실무 과정</h2>
            <p className="mt-2 text-base leading-7 text-slate-600">기본기와 심화 워크플로우를 나누어 배우되, 인사이트와 실습으로 업무 적용 관점을 함께 잡습니다.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("course", { courseId: "ai-basics" })}
            className="min-h-11 rounded-lg bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
          >
            전체 과정 보기
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {courseTracks.map((track) => (
            <button
              key={track.id}
              type="button"
              onClick={() => onNavigate("course", { courseId: track.courseId })}
              className="rounded-lg bg-slate-50 p-4 text-left transition hover:bg-white hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              <p className={`text-sm font-black ${track.id === "advanced" ? "text-indigo-700" : "text-amber-700"}`}>{track.badge}</p>
              <h3 className="mt-2 text-2xl font-black leading-tight text-slate-950">{track.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">{track.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {track.points.slice(0, 3).map((point) => (
                  <span key={point} className="rounded-md bg-white px-2 py-1 text-xs font-black text-slate-600 ring-1 ring-slate-200">
                    {point}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-lg bg-slate-950 px-5 py-6 text-white md:px-6 md:py-7">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-black uppercase text-teal-300">Insights</p>
            <h2 className="mt-2 text-2xl font-black leading-tight md:text-3xl">업무와 비즈니스 관점으로 읽는 AI 인사이트</h2>
            <p className="mt-2 text-base leading-7 text-slate-200">기술 뉴스보다 한 걸음 더 들어가 교육, 자동화, 생산성, 조직 도입 관점으로 다시 정리합니다.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate("insights")}
            className="min-h-11 rounded-lg bg-teal-400 px-4 py-2 text-sm font-black text-slate-950 transition hover:bg-teal-300"
          >
            인사이트 전체 보기
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
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
            </button>
          ))}
          {secondaryInsight ? null : (
            <button
              type="button"
              onClick={() => onNavigate("practice")}
              className="rounded-lg bg-white p-4 text-left text-slate-950 transition hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              <p className="text-sm font-black text-amber-700">Practice</p>
              <h3 className="mt-2 text-2xl font-black leading-tight">실습 예제로 바로 적용하기</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">업무 상황별 프롬프트를 열어보고, 결과 검토 기준까지 함께 확인합니다.</p>
            </button>
          )}
        </div>
      </section>

      <section className="rounded-lg bg-white px-5 py-6 shadow-sm ring-1 ring-slate-200 md:px-6 md:py-7">
        <div>
          <p className="text-sm font-black uppercase text-teal-700">Topic Picks</p>
          <h2 className="mt-2 text-2xl font-black leading-tight text-slate-950 md:text-3xl">관심 주제별로 이어보는 학습과 인사이트</h2>
        </div>
        <div className="mt-5 grid gap-3 lg:grid-cols-3">
          {topicPicks.map((pick) => (
            <article key={pick.title} className="rounded-lg bg-slate-50 p-4 ring-1 ring-slate-200">
              <h3 className="text-xl font-black leading-tight text-slate-950">{pick.title}</h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">{pick.desc}</p>
              <div className="mt-4 grid gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate(pick.primary.tabId, pick.primary.options)}
                  className="min-h-10 rounded-lg bg-slate-950 px-3 py-2 text-sm font-black text-white transition hover:bg-slate-800"
                >
                  {pick.primary.label}
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate(pick.secondary.tabId, pick.secondary.options)}
                  className="min-h-10 rounded-lg bg-white px-3 py-2 text-sm font-black text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-100"
                >
                  {pick.secondary.label}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default HomeView
