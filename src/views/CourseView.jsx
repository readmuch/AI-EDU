import { useState } from "react"
import Accordion from "../components/mobile/Accordion"
import SectionHeader from "../components/mobile/SectionHeader"
import { learningLevels } from "../data/mobileCourseData"

function CourseView() {
  const [activeId, setActiveId] = useState(learningLevels[0].id)
  const activeLevel = learningLevels.find((level) => level.id === activeId) ?? learningLevels[0]

  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="과정"
        title="단계별 커리큘럼"
        desc="모바일에서는 필요한 항목만 펼쳐 읽을 수 있게 구성했습니다."
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {learningLevels.map((level) => {
          const isActive = level.id === activeId
          return (
            <button
              key={level.id}
              type="button"
              onClick={() => setActiveId(level.id)}
              className={`min-h-12 min-w-32 rounded-lg px-4 py-3 text-left transition ${
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

        <Accordion title="핵심 개념 설명" defaultOpen>
          <ul className="space-y-2">
            {activeLevel.concepts.map((item) => (
              <li key={item} className="text-base leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="일자별 시간표" defaultOpen>
          <div className="space-y-3">
            {activeLevel.schedule.map((item) => (
              <div key={`${item.time}-${item.title}`} className="rounded-lg bg-slate-50 p-3">
                <p className="text-sm font-black text-indigo-700">{item.time}</p>
                <p className="mt-1 text-base font-black text-slate-950">{item.title}</p>
                <p className="mt-1 text-base leading-7 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </Accordion>

        <Accordion title="실습 자료">
          <ul className="space-y-2">
            {activeLevel.materials.map((item) => (
              <li key={item} className="text-base leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="실무 예시">
          <ul className="space-y-2">
            {activeLevel.examples.map((item) => (
              <li key={item} className="text-base leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="따라 해볼 실습 과제">
          <p className="text-base leading-7 text-slate-700">{activeLevel.practice}</p>
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

        <Accordion title="이해도 점검 질문">
          <ol className="list-decimal space-y-2 pl-5">
            {activeLevel.questions.map((item) => (
              <li key={item} className="text-base leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ol>
        </Accordion>

        <Accordion title="다음 단계 학습 제안">
          <ul className="space-y-2">
            {activeLevel.nextSteps.map((item) => (
              <li key={item} className="text-base leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="평가 기준">
          <ul className="space-y-2">
            {activeLevel.evaluation.map((item) => (
              <li key={item} className="text-base leading-7 text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="참고 자료">
          <ul className="space-y-2">
            {activeLevel.references.map((item) => (
              <li key={item.url} className="text-base leading-7 text-slate-700">
                <a className="font-bold text-indigo-700 underline underline-offset-4" href={item.url} target="_blank" rel="noreferrer">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </Accordion>
      </div>
    </div>
  )
}

export default CourseView
