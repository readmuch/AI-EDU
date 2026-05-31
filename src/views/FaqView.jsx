import Accordion from "../components/mobile/Accordion"
import SectionHeader from "../components/mobile/SectionHeader"
import { faqItems } from "../data/mobileCourseData"

function FaqView() {
  return (
    <div className="space-y-5">
      <SectionHeader
        eyebrow="FAQ"
        title="자주 묻는 질문"
        desc="수강 전 확인할 내용을 짧게 정리했습니다."
      />

      <div className="space-y-3">
        {faqItems.map((item) => (
          <Accordion key={item.q} title={item.q}>
            <p className="text-base leading-7 text-slate-700">{item.a}</p>
          </Accordion>
        ))}
      </div>

      <section className="rounded-lg bg-slate-950 p-5 text-white">
        <p className="text-sm font-black text-teal-300">문의 안내</p>
        <h3 className="mt-2 text-2xl font-black">교육 목적에 맞게 과정 구성을 조정할 수 있습니다.</h3>
        <p className="mt-3 text-base leading-7 text-slate-200">
          대상자 수준, 교육 시간, 실습 업무 유형을 정하면 1단계부터 3단계까지 필요한 부분만 조합할 수 있습니다.
        </p>
      </section>
    </div>
  )
}

export default FaqView
