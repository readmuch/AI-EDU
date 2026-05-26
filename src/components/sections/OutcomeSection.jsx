import SectionTitle from "../SectionTitle"

function OutcomeSection({ effects }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
      <SectionTitle
        badge="기대 효과"
        title="수강 전과 후의 변화"
        subtitle="실습 중심 학습으로 업무에 즉시 적용 가능한 결과를 만듭니다."
      />

      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="px-4 py-3 font-semibold">구분</th>
              <th className="px-4 py-3 font-semibold">수강 전</th>
              <th className="px-4 py-3 font-semibold">수강 후</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="border-t border-slate-200">
              <td className="px-4 py-3 font-medium text-slate-800">AI 활용 수준</td>
              <td className="px-4 py-3 text-slate-600">단편적 질문 중심 사용</td>
              <td className="px-4 py-3 text-slate-700">업무 목적 기반 프롬프트 설계</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="px-4 py-3 font-medium text-slate-800">업무 처리 방식</td>
              <td className="px-4 py-3 text-slate-600">수작업 반복과 시간 소모</td>
              <td className="px-4 py-3 text-slate-700">AI 워크플로우로 반복 업무 축소</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="px-4 py-3 font-medium text-slate-800">결과물 품질</td>
              <td className="px-4 py-3 text-slate-600">개인 역량 의존, 편차 큼</td>
              <td className="px-4 py-3 text-slate-700">검증 기준 기반 품질 개선</td>
            </tr>
            <tr className="border-t border-slate-200">
              <td className="px-4 py-3 font-medium text-slate-800">최종 산출물</td>
              <td className="px-4 py-3 text-slate-600">도구 사용 경험에 머무름</td>
              <td className="px-4 py-3 text-slate-700">개인별 AI 업무 프로젝트 완성</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {effects.map((item) => (
          <li key={item} className="rounded-lg border border-indigo-100 bg-indigo-50 p-3 text-sm text-slate-700">
            ✓ {item}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default OutcomeSection
