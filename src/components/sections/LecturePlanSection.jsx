import { useState } from "react"
import SectionTitle from "../SectionTitle"
import { lectureDetailData } from "../../data/lectureDetailData"

function LecturePlanSection({ plans }) {
  const [activeId, setActiveId] = useState(plans[0]?.id ?? "")
  const [copiedKey, setCopiedKey] = useState("")
  const activePlan = plans.find((plan) => plan.id === activeId) ?? plans[0]
  const activeDetail = lectureDetailData[activeId]

  const handleCopyPrompt = async (key, text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey(""), 1600)
    } catch {
      setCopiedKey("")
    }
  }

  if (!activePlan) {
    return null
  }

  return (
    <section id="lecture-plans" className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionTitle
        badge="강의안 상세"
        title="1단계, 2단계, 3단계 학습 안내 페이지"
        subtitle="수강생이 목표, 시간표, 실습 지시문, 평가 기준을 한눈에 확인할 수 있도록 구성했습니다."
      />

      <div className="mb-5 grid gap-2 sm:grid-cols-3">
        {plans.map((plan) => {
          const isActive = plan.id === activePlan.id
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => setActiveId(plan.id)}
              className={`rounded-xl border px-4 py-3 text-left transition ${
                isActive
                  ? "border-indigo-600 bg-indigo-600 text-white"
                  : "border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-300"
              }`}
            >
              <p className="text-xs font-semibold">{plan.step}</p>
              <p className="mt-1 text-sm font-semibold">{plan.title}</p>
            </button>
          )
        })}
      </div>

      <article className="rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-slate-900">{activePlan.title}</h3>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-md bg-white px-2 py-1 text-slate-700">대상: {activePlan.audience}</span>
            <span className="rounded-md bg-white px-2 py-1 text-indigo-700">{activePlan.totalTime}</span>
          </div>
        </div>

        <div className="mb-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-sm font-semibold text-slate-900">수강생 학습 성과</p>
            <ul className="space-y-1 text-sm text-slate-700">
              {activePlan.sessionOutcomes?.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-sm font-semibold text-slate-900">필수 준비물/도구</p>
            <ul className="space-y-1 text-sm text-slate-700">
              {activePlan.requiredTools?.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-slate-900">강의 목표</p>
          <p className="text-sm leading-relaxed text-slate-700">{activePlan.objective}</p>
        </div>

        {activeDetail?.overview ? (
          <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-sm font-semibold text-slate-900">단계 개요</p>
            <p className="text-sm leading-relaxed text-slate-700">{activeDetail.overview}</p>
          </div>
        ) : null}

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-slate-900">수업 전 준비 체크리스트</p>
          <ul className="space-y-1 text-sm text-slate-700">
            {activePlan.preClassChecklist.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        {activeDetail?.dailyPlan?.length ? (
          <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-3 text-sm font-semibold text-slate-900">일자별 상세 시간표</p>
            <div className="space-y-3">
              {activeDetail.dailyPlan.map((dayPlan) => (
                <div key={dayPlan.day} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-indigo-700">{dayPlan.day}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-900">{dayPlan.title}</p>
                  <p className="mt-1 text-sm text-slate-700">
                    <span className="font-medium text-slate-900">학습 목표:</span> {dayPlan.target}
                  </p>
                  <div className="mt-3 space-y-2">
                    {dayPlan.timeBlocks.map((block) => (
                      <div key={`${block.time}-${block.topic}`} className="rounded-lg border border-slate-200 bg-white p-3">
                        <p className="text-xs font-semibold text-indigo-700">{block.time}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">{block.topic}</p>
                        <p className="mt-1 text-sm text-slate-700">
                          <span className="font-medium text-slate-900">학습 내용:</span> {block.learn}
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          <span className="font-medium text-slate-900">실습 활동:</span> {block.activity}
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          <span className="font-medium text-slate-900">산출물:</span> {block.output}
                        </p>
                        <p className="mt-1 text-sm text-slate-700">
                          <span className="font-medium text-slate-900">점검 기준:</span> {block.check}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {activeDetail?.moduleMaterials?.length ? (
          <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-3 text-sm font-semibold text-slate-900">모듈별 상세 학습자료</p>
            <div className="space-y-3">
              {activeDetail.moduleMaterials.map((module) => (
                <div key={module.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-900">{module.title}</p>
                  <p className="mt-1 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">학습 목표:</span> {module.goal}
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    <span className="font-semibold text-slate-900">학습 설명:</span> {module.explanation}
                  </p>
                  {module.template ? (
                    <div className="mt-2 rounded-lg border border-slate-200 bg-white p-3">
                      <p className="mb-1 text-xs font-semibold text-slate-800">실습 템플릿</p>
                      <pre className="overflow-x-auto rounded-md bg-slate-900 p-3 text-xs leading-relaxed text-slate-100">
                        <code className="whitespace-pre">{module.template}</code>
                      </pre>
                    </div>
                  ) : null}
                  <div className="mt-2 grid gap-3 lg:grid-cols-3">
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="mb-1 text-xs font-semibold text-slate-800">실습 단계</p>
                      <ul className="space-y-1 text-sm text-slate-700">
                        {module.steps.map((step) => (
                          <li key={step}>- {step}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="mb-1 text-xs font-semibold text-slate-800">제출 기준</p>
                      <p className="text-sm text-slate-700">{module.submission}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3">
                      <p className="mb-1 text-xs font-semibold text-slate-800">자가 점검</p>
                      <ul className="space-y-1 text-sm text-slate-700">
                        {module.selfCheck.map((item) => (
                          <li key={item}>- {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-slate-900">실제 강의 자료</p>
          <div className="space-y-4">
            {activePlan.materials?.map((material) => (
              <div key={material.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">{material.title}</p>
                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-semibold text-slate-900">목적:</span> {material.purpose}
                </p>
                <div className="mt-2">
                  <p className="mb-1 text-xs font-semibold text-slate-800">핵심 이론 포인트</p>
                  <div className="space-y-2">
                    {material.theoryPoints?.map((item, idx) => {
                      const point = typeof item === "string" ? item : item.point
                      const explanation = typeof item === "string" ? "" : item.explanation
                      const example = typeof item === "string" ? "" : item.example

                      return (
                        <div key={`${point}-${idx}`} className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-sm font-semibold text-slate-900">{point}</p>
                          {explanation ? (
                            <p className="mt-1 text-sm text-slate-700">
                              <span className="font-medium text-slate-900">설명:</span> {explanation}
                            </p>
                          ) : null}
                          {example ? (
                            <p className="mt-1 whitespace-pre-line text-sm text-slate-700">
                              <span className="font-medium text-slate-900">예시:</span> {example}
                            </p>
                          ) : null}
                        </div>
                      )
                    })}
                  </div>
                </div>
                {material.promptExample ? (
                  <div className="mt-2 rounded-lg border border-slate-200 bg-white p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-800">예시 프롬프트</p>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyPrompt(`${activePlan.id}-${material.title}`, material.promptExample)
                        }
                        className="rounded-md bg-indigo-600 px-2.5 py-1 text-[11px] font-semibold text-white transition hover:bg-indigo-700"
                      >
                        {copiedKey === `${activePlan.id}-${material.title}` ? "복사 완료" : "복사"}
                      </button>
                    </div>
                    <pre className="overflow-x-auto rounded-md bg-slate-900 p-3 text-xs leading-relaxed text-slate-100">
                      <code className="whitespace-pre">{material.promptExample}</code>
                    </pre>
                  </div>
                ) : null}
                <div className="mt-2">
                  <p className="mb-1 text-xs font-semibold text-slate-800">수강생 실습 지시문</p>
                  <ul className="space-y-1 text-sm text-slate-700">
                    {material.learnerAction?.map((action) => (
                      <li key={action}>- {action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-slate-900">세부 시간표</p>
          <div className="space-y-3">
            {activePlan.agenda.map((item) => (
              <div key={`${item.time}-${item.topic}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold text-indigo-700">{item.time}</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">{item.topic}</p>
                <p className="mt-1 text-sm text-slate-700">{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-slate-900">평가 체크포인트</p>
          <ul className="space-y-1 text-sm text-slate-700">
            {activePlan.evaluation.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-slate-900">실습 과제 상세</p>
          <div className="space-y-3">
            {activePlan.practiceTasks.map((task) => (
              <div key={task.name} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">{task.name}</p>
                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-medium text-slate-900">미션:</span> {task.mission}
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-medium text-slate-900">산출물:</span> {task.deliverable}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5 grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-sm font-semibold text-slate-900">자주 나오는 질문 대응</p>
            <div className="space-y-2">
              {activePlan.commonQuestions?.map((item) => (
                <div key={item.q} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-semibold text-slate-900">Q. {item.q}</p>
                  <p className="mt-1 text-sm text-slate-700">A. {item.a}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 text-sm font-semibold text-slate-900">실습 중 트러블슈팅</p>
            <ul className="space-y-1 text-sm text-slate-700">
              {activePlan.troubleshooting?.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-3 text-sm font-semibold text-slate-900">산출물 평가 루브릭</p>
          <div className="space-y-3">
            {activePlan.outputRubric?.map((item) => (
              <div key={item.criterion} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-sm font-semibold text-slate-900">{item.criterion}</p>
                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-medium text-emerald-700">좋은 기준:</span> {item.good}
                </p>
                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-medium text-rose-700">보완 필요:</span> {item.bad}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
          <p className="mb-2 text-sm font-semibold text-slate-900">강의 운영 체크리스트</p>
          <ul className="space-y-1 text-sm text-slate-700">
            {activePlan.classRules?.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-indigo-200 bg-indigo-100 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-900">과제 제출 안내</p>
          <p className="text-sm text-slate-800">{activePlan.assignment}</p>
        </div>
      </article>
    </section>
  )
}

export default LecturePlanSection
