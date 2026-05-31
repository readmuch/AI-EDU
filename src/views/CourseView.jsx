import { useState } from "react"
import Accordion from "../components/mobile/Accordion"
import SectionHeader from "../components/mobile/SectionHeader"
import { learningLevels } from "../data/mobileCourseData"

function CourseView({ selectedLevelId }) {
  const [activeId, setActiveId] = useState(selectedLevelId ?? learningLevels[0].id)
  const activeLevel = learningLevels.find((level) => level.id === activeId) ?? learningLevels[0]
  const getLessonId = (index) => `${activeLevel.id}-lesson-${index + 1}`

  const handleLessonJump = (index) => {
    const lessonElement = document.getElementById(getLessonId(index))
    lessonElement?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
    lessonElement?.focus({ preventScroll: true })
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="과정"
        title="과정별 커리큘럼"
        desc="각 과정은 교시별 강의자료, 실습, 퀴즈, 산출물까지 바로 수업에 활용할 수 있게 구성했습니다."
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {learningLevels.map((level) => {
          const isActive = level.id === activeId
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => setActiveId(level.id)}
              className={`min-h-12 min-w-36 rounded-lg px-4 py-3 text-left transition ${
                isActive ? "bg-slate-950 text-white" : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              <span className="block text-xs font-black opacity-80">{level.step}</span>
              <span className="block text-base font-black">{level.title}</span>
            </button>
          )
        })}
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
            {activeLevel.lessons.map((lessonItem, index) => (
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
            ))}
          </div>
        </Accordion>

        <Accordion title="좋은 프롬프트 예시">
          <pre className="whitespace-pre-wrap break-words rounded-lg bg-slate-950 p-4 text-sm leading-6 text-white">
            {activeLevel.goodPrompt}
          </pre>
        </Accordion>

        <Accordion title="나쁜 프롬프트와 개선 예시">
          <div className="space-y-3">
            <div className="rounded-lg bg-rose-50 p-3">
              <p className="text-sm font-black text-rose-800">나쁜 예시</p>
              <p className="mt-1 text-base leading-7 text-rose-950">{activeLevel.promptComparison.bad}</p>
            </div>
            <div className="rounded-lg bg-teal-50 p-3">
              <p className="text-sm font-black text-teal-800">개선 예시</p>
              <p className="mt-1 text-base leading-7 text-teal-950">{activeLevel.promptComparison.improved}</p>
            </div>
            <p className="text-base leading-7 text-slate-700">{activeLevel.promptComparison.reason}</p>
          </div>
        </Accordion>

        <Accordion title="체크리스트">
          <ul className="space-y-2">
            {activeLevel.checklist.map((item) => (
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
