import Accordion from "../components/mobile/Accordion"
import CopyButton from "../components/mobile/CopyButton"
import SectionHeader from "../components/mobile/SectionHeader"
import { practiceExamples } from "../data/mobileCourseData"

function PracticeView() {
  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="실습"
        title="업무별 실습 예제"
        desc="수강 중 휴대폰으로 열어보고 바로 복사할 수 있게 상황별로 정리했습니다."
      />

      <div className="grid gap-3 lg:grid-cols-2">
        {practiceExamples.map((example) => (
          <article key={example.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-amber-700">{example.category}</p>
                <h3 className="mt-1 text-xl font-black text-slate-950">{example.title}</h3>
              </div>
              <CopyButton text={example.prompt} label="프롬프트 복사" />
            </div>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-sm font-black text-slate-500">상황</p>
                <p className="mt-1 text-base leading-7 text-slate-700">{example.situation}</p>
              </div>
              <div className="rounded-lg bg-teal-50 p-3">
                <p className="text-sm font-black text-teal-800">목표</p>
                <p className="mt-1 text-base leading-7 text-teal-950">{example.goal}</p>
              </div>
              <Accordion title="프롬프트와 활용 팁">
                <pre className="whitespace-pre-wrap break-words rounded-lg bg-slate-950 p-4 text-sm leading-6 text-white">
                  {example.prompt}
                </pre>
                <p className="mt-3 text-base leading-7 text-slate-700">{example.expected}</p>
                <p className="mt-2 text-sm font-bold leading-6 text-slate-500">{example.tip}</p>
              </Accordion>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default PracticeView
