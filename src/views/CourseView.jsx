import { useState } from "react"
import Accordion from "../components/mobile/Accordion"
import CopyButton from "../components/mobile/CopyButton"
import SectionHeader from "../components/mobile/SectionHeader"
import { advancedLearningLevels, learningLevels } from "../data/mobileCourseData"

const trackOptions = [
  {
    id: "foundation",
    eyebrow: "기본 과정",
    title: "입문부터 프로젝트까지",
    desc: "AI 입문, ChatGPT, 프롬프트, 업무 적용, 프로젝트까지 순서대로 봅니다.",
  },
  {
    id: "advanced",
    eyebrow: "심화 과정",
    title: "Agent with Workflow",
    desc: "Module 0~11을 따라 Agent Workflow 설계 역량을 쌓습니다.",
  },
]

const getTrackIdByLevelId = (levelId) => {
  if (advancedLearningLevels.some((level) => level.id === levelId) || levelId === "agent-workflow") {
    return "advanced"
  }

  return "foundation"
}

const createLessonPromptExamples = (lessonItem) => [
  {
    title: "수업 내용을 내 업무에 적용하기",
    desc: "강의 내용을 실제 업무 상황으로 바꿔서 첫 결과물을 만들 때 사용합니다.",
    prompt: `너는 실무 AI 활용 코치야.
아래 강의 주제를 내 업무에 바로 적용할 수 있는 실행안으로 바꿔줘.

강의 주제: ${lessonItem.topic}
내 업무 상황: [내 업무 상황을 붙여넣기]
목표: ${lessonItem.goals[0]}

출력 형식:
1. 이 주제가 내 업무에 중요한 이유
2. 바로 시도할 수 있는 업무 시나리오 3개
3. 각 시나리오에 쓸 첫 프롬프트
4. 결과물을 검토할 체크리스트

조건:
- 추상적인 설명보다 실제 행동 중심으로 작성
- 내가 바꿔 넣을 부분은 [대괄호]로 표시
- 민감정보를 넣지 말라는 주의사항 포함`,
  },
  {
    title: "실습 산출물 만들기",
    desc: "교시별 실습 결과물을 빠르게 초안화할 때 사용합니다.",
    prompt: `너는 교육 실습 퍼실리테이터야.
다음 실습을 수행할 수 있도록 복사해서 쓸 수 있는 프롬프트와 작성 양식을 만들어줘.

실습명: ${lessonItem.activity.title}
최종 결과물: ${lessonItem.activity.output}
참고 주제: ${lessonItem.topic}
내가 가진 자료: [메모, 회의록, 보고서 초안, 데이터 설명 등을 붙여넣기]

출력 형식:
1. 실습 시작 프롬프트
2. 입력 자료 정리 양식
3. 결과물 초안 작성 프롬프트
4. 결과물 검토 프롬프트
5. 수정 요청 프롬프트

조건:
- 각 프롬프트는 바로 복사해서 실행할 수 있게 작성
- 빈칸은 [ ] 형태로 남기기
- 결과물 검토 기준을 5개 이상 포함`,
  },
  {
    title: "AI 결과물 검토하기",
    desc: "AI가 만든 답변을 그대로 쓰기 전에 누락, 오류, 위험을 확인합니다.",
    prompt: `다음 AI 결과물을 실무 사용 전 검토해줘.

검토 기준:
- 강의 주제와 맞는가: ${lessonItem.topic}
- 수업 목표를 충족하는가: ${lessonItem.goals.join(" / ")}
- 사실 확인이 필요한 문장이 있는가
- 개인정보, 보안, 저작권 위험이 있는가
- 바로 실행하기 어려운 모호한 표현이 있는가

AI 결과물:
[AI가 만든 답변을 붙여넣기]

출력 형식:
1. 바로 사용할 수 있는 부분
2. 수정이 필요한 부분
3. 확인해야 할 사실 또는 근거
4. 위험하거나 삭제해야 할 표현
5. 개선된 최종본`,
  },
]

function CourseView({ selectedLevelId }) {
  const [activeTrackId, setActiveTrackId] = useState(getTrackIdByLevelId(selectedLevelId))
  const activeLevels = activeTrackId === "advanced" ? advancedLearningLevels : learningLevels
  const fallbackLevelId = activeLevels[0].id
  const [activeId, setActiveId] = useState(selectedLevelId === "agent-workflow" ? advancedLearningLevels[0].id : selectedLevelId ?? fallbackLevelId)
  const activeLevel = activeLevels.find((level) => level.id === activeId) ?? activeLevels[0]
  const activeTrack = trackOptions.find((track) => track.id === activeTrackId) ?? trackOptions[0]
  const activeLevelIndex = Math.max(
    activeLevels.findIndex((level) => level.id === activeLevel.id),
    0,
  )
  const getLessonId = (index) => `${activeLevel.id}-lesson-${index + 1}`
  const supportMaterials = activeLevel.supportMaterials ?? {
    templateTitle: "좋은 프롬프트 예시",
    template: activeLevel.goodPrompt,
    comparisonTitle: "나쁜 프롬프트와 개선 예시",
    badLabel: "나쁜 예시",
    bad: activeLevel.promptComparison.bad,
    improvedLabel: "개선 예시",
    improved: activeLevel.promptComparison.improved,
    reason: activeLevel.promptComparison.reason,
    checklistTitle: "체크리스트",
    checklist: activeLevel.checklist,
  }

  const handleLessonJump = (index) => {
    const lessonElement = document.getElementById(getLessonId(index))
    lessonElement?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    lessonElement?.focus({ preventScroll: true })
  }

  const handleTrackChange = (trackId) => {
    const nextLevels = trackId === "advanced" ? advancedLearningLevels : learningLevels
    setActiveTrackId(trackId)
    setActiveId(nextLevels[0].id)
  }

  const handleLevelMove = (direction) => {
    const nextIndex = activeLevelIndex + direction
    const nextLevel = activeLevels[nextIndex]

    if (nextLevel) {
      setActiveId(nextLevel.id)
    }
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="과정"
        title="과정별 커리큘럼"
        desc="기본 과정과 심화 과정을 먼저 고른 뒤, 각 과정 또는 모듈의 강의자료와 실습을 확인합니다."
      />

      <div className="grid gap-3 md:grid-cols-2">
        {trackOptions.map((track) => {
          const isActive = track.id === activeTrackId
          return (
            <button
              key={track.id}
              type="button"
              onClick={() => handleTrackChange(track.id)}
              className={`rounded-lg p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                isActive ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-800 hover:border-indigo-300"
              }`}
            >
              <span className="text-sm font-black opacity-80">{track.eyebrow}</span>
              <span className="mt-1 block text-xl font-black">{track.title}</span>
              <span className={`mt-2 block text-sm font-bold leading-6 ${isActive ? "text-slate-200" : "text-slate-500"}`}>{track.desc}</span>
            </button>
          )
        })}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <div className="flex items-center justify-between gap-3 px-1 pb-3">
          <p className="text-sm font-black text-indigo-700">{activeTrack.eyebrow}</p>
          <p className="text-xs font-bold text-slate-500">
            {activeLevelIndex + 1} / {activeLevels.length}
          </p>
        </div>

        <div className="space-y-3 sm:hidden">
          <label className="block">
            <span className="sr-only">모듈 선택</span>
            <select
              value={activeId}
              onChange={(event) => setActiveId(event.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {activeLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.step}. {level.title}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleLevelMove(-1)}
              disabled={activeLevelIndex === 0}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition enabled:hover:border-indigo-300 enabled:hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              이전 모듈
            </button>
            <button
              type="button"
              onClick={() => handleLevelMove(1)}
              disabled={activeLevelIndex === activeLevels.length - 1}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-black text-slate-700 transition enabled:hover:border-indigo-300 enabled:hover:text-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              다음 모듈
            </button>
          </div>
        </div>

        <div className="hidden gap-2 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {activeLevels.map((level) => {
            const isActive = level.id === activeId
            return (
              <button
                key={level.id}
                type="button"
                onClick={() => setActiveId(level.id)}
                className={`min-h-24 rounded-lg px-4 py-3 text-left transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  isActive ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-300"
                }`}
              >
                <span className="block text-xs font-black opacity-80">{level.step}</span>
                <span className="mt-1 block text-base font-black leading-6">{level.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      <article className="rounded-lg border border-slate-200 bg-white p-4 md:p-5">
        <p className="text-sm font-black text-indigo-700">{activeLevel.step}</p>
        <h3 className="mt-1 text-2xl font-black text-slate-950">{activeLevel.title}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-md bg-slate-100 px-2 py-1 text-sm font-bold text-slate-700">{activeLevel.audience}</span>
          <span className="rounded-md bg-teal-50 px-2 py-1 text-sm font-bold text-teal-800">{activeLevel.duration}</span>
        </div>
        <p className="mt-4 text-base leading-7 text-slate-700">{activeLevel.summary}</p>
        <p className="mt-3 rounded-lg bg-teal-50 p-3 text-sm font-bold leading-6 text-teal-900">{activeLevel.outcome}</p>
      </article>

      <div className="space-y-3">
        <Accordion title="학습 목표" defaultOpen>
          <ul className="space-y-2">
            {activeLevel.objectives.map((item) => (
              <li key={item} className="text-base leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="교시별 시간표" defaultOpen>
          <div className="space-y-3">
            {activeLevel.schedule.map((item, index) => (
              <button
                key={`${item.time}-${item.title}`}
                type="button"
                onClick={() => handleLessonJump(index)}
                className="w-full rounded-lg bg-slate-50 p-3 text-left transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <p className="text-sm font-black text-indigo-700">{item.time}</p>
                <p className="mt-1 text-base font-black text-slate-950">{item.title}</p>
                <p className="mt-1 text-base leading-7 text-slate-600">{item.detail}</p>
              </button>
            ))}
          </div>
        </Accordion>

        <Accordion title="핵심 개념 설명" defaultOpen>
          <ul className="space-y-2">
            {activeLevel.concepts.map((item) => (
              <li key={item} className="text-base leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="교시별 상세 강의자료" defaultOpen>
          <div className="space-y-4">
            {activeLevel.lessons.map((lessonItem, index) => {
              const lessonPromptExamples = createLessonPromptExamples(lessonItem)

              return (
                <article
                  key={lessonItem.title}
                  id={getLessonId(index)}
                  tabIndex={-1}
                  className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                <p className="text-sm font-black text-indigo-700">{index + 1}교시 강의자료</p>
                <h4 className="mt-1 text-xl font-black text-slate-950">{lessonItem.title}</h4>

                <div className="mt-4 rounded-lg bg-slate-50 p-3">
                  <p className="text-sm font-black text-slate-500">주제</p>
                  <p className="mt-1 text-base font-bold leading-7 text-slate-900">{lessonItem.topic}</p>
                </div>

                <div className="mt-4">
                  <p className="text-base font-black text-slate-950">수업 목표</p>
                  <ol className="mt-2 list-decimal space-y-2 pl-5">
                    {lessonItem.goals.map((goal) => (
                      <li key={goal} className="text-base leading-7 text-slate-700">
                        {goal}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="mt-5 space-y-4">
                  {lessonItem.sections.map((section) => (
                    <section key={section.heading}>
                      <h5 className="text-base font-black text-slate-950">{section.heading}</h5>
                      <p className="mt-2 text-base leading-7 text-slate-700">{section.body}</p>
                      {section.points ? (
                        <ul className="mt-2 space-y-1">
                          {section.points.map((point) => (
                            <li key={point} className="text-base leading-7 text-slate-700">
                              {point}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>
                  ))}
                </div>

                {lessonItem.comparisonTable ? (
                  <div className="mt-5 overflow-x-auto rounded-lg border border-slate-200">
                    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          {lessonItem.comparisonTable.headers.map((header) => (
                            <th key={header} className="px-3 py-3 font-black text-slate-700">
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {lessonItem.comparisonTable.rows.map((row) => (
                          <tr key={row.join("-")}>
                            {row.map((cell) => (
                              <td key={cell} className="px-3 py-3 align-top leading-6 text-slate-700">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}

                <div className="mt-5">
                  <p className="text-base font-black text-slate-950">업무 예시</p>
                  <div className="mt-2 grid gap-2 md:grid-cols-2">
                    {lessonItem.examples.map((example) => (
                      <div key={example.title} className="rounded-lg bg-amber-50 p-3">
                        <p className="text-sm font-black text-amber-800">{example.title}</p>
                        <p className="mt-1 text-base leading-7 text-amber-950">{example.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 rounded-lg border border-indigo-100 bg-indigo-50 p-3">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-base font-black text-indigo-950">복사해서 쓰는 프롬프트 사례</p>
                      <p className="mt-1 text-sm font-bold leading-6 text-indigo-800">교시 주제와 실습 산출물에 맞춘 예시입니다.</p>
                    </div>
                    <p className="text-xs font-black text-indigo-700">{lessonPromptExamples.length}개</p>
                  </div>
                  <div className="mt-3 space-y-3">
                    {lessonPromptExamples.map((promptExample) => (
                      <section key={promptExample.title} className="rounded-lg bg-white p-3">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h5 className="text-base font-black text-slate-950">{promptExample.title}</h5>
                            <p className="mt-1 text-sm font-bold leading-6 text-slate-600">{promptExample.desc}</p>
                          </div>
                          <CopyButton text={promptExample.prompt} label="프롬프트 복사" />
                        </div>
                        <pre className="mt-3 max-h-80 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-slate-950 p-4 text-sm leading-6 text-white">
                          {promptExample.prompt}
                        </pre>
                      </section>
                    ))}
                  </div>
                </div>

                <div className="mt-5 rounded-lg bg-teal-50 p-3">
                  <p className="text-base font-black text-teal-900">실습: {lessonItem.activity.title}</p>
                  <ul className="mt-2 space-y-2">
                    {lessonItem.activity.steps.map((step) => (
                      <li key={step} className="text-base leading-7 text-teal-950">
                        {step}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm font-black text-teal-800">결과물: {lessonItem.activity.output}</p>
                </div>

                <div className="mt-5">
                  <p className="text-base font-black text-slate-950">이해 확인 퀴즈</p>
                  <div className="mt-2 space-y-2">
                    {lessonItem.quiz.map((quiz) => (
                      <div key={quiz.q} className="rounded-lg bg-slate-50 p-3">
                        <p className="text-base font-bold leading-7 text-slate-900">Q. {quiz.q}</p>
                        <p className="mt-1 text-base leading-7 text-slate-600">정답: {quiz.a}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 rounded-lg bg-slate-950 p-4 text-white">
                  <p className="text-base font-black">마무리 정리</p>
                  <ul className="mt-2 space-y-2">
                    {lessonItem.summary.map((item) => (
                      <li key={item} className="text-base leading-7 text-slate-100">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                </article>
              )
            })}
          </div>
        </Accordion>

        <Accordion title={supportMaterials.templateTitle}>
          <div className="mb-3 flex justify-end">
            <CopyButton text={supportMaterials.template} label="대표 프롬프트 복사" />
          </div>
          <pre className="whitespace-pre-wrap break-words rounded-lg bg-slate-950 p-4 text-sm leading-6 text-white">
            {supportMaterials.template}
          </pre>
        </Accordion>

        <Accordion title={supportMaterials.comparisonTitle}>
          <div className="space-y-3">
            <div className="rounded-lg bg-rose-50 p-3">
              <p className="text-sm font-black text-rose-800">{supportMaterials.badLabel}</p>
              <p className="mt-1 text-base leading-7 text-rose-950">{supportMaterials.bad}</p>
            </div>
            <div className="rounded-lg bg-teal-50 p-3">
              <p className="text-sm font-black text-teal-800">{supportMaterials.improvedLabel}</p>
              <p className="mt-1 text-base leading-7 text-teal-950">{supportMaterials.improved}</p>
            </div>
            <p className="text-base leading-7 text-slate-700">{supportMaterials.reason}</p>
          </div>
        </Accordion>

        <Accordion title={supportMaterials.checklistTitle}>
          <ul className="space-y-2">
            {supportMaterials.checklist.map((item) => (
              <li key={item} className="text-base leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </Accordion>
      </div>
    </div>
  )
}

export default CourseView
