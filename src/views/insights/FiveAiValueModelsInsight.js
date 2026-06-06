import React from "react"
import { FixedInsightArticle } from "./FixedInsightArticle.js"

export const fiveAiValueModelsSections = [
  {
    id: "summary-heading",
    type: "heading",
    text: "핵심요약",
  },
  {
    id: "summary-1",
    type: "paragraph",
    text: "OpenAI는 많은 조직이 AI를 개별 활용 사례나 파일럿 중심으로 관리한다고 설명합니다. 이런 방식은 일부 생산성 향상은 만들 수 있지만, 비즈니스가 가치를 창출하는 방식 자체를 바꾸기는 어렵습니다.",
  },
  {
    id: "summary-2",
    type: "paragraph",
    text: '글의 핵심은 AI 전략을 "어떤 도구를 도입할 것인가"가 아니라 "어떤 가치 모델을 어떤 순서로 구축할 것인가"로 바라봐야 한다는 점입니다. 앞서가는 조직은 AI를 흩어진 실험의 묶음이 아니라 서로 이어지는 가치 모델 포트폴리오로 다룹니다.',
  },
  {
    id: "summary-3",
    type: "paragraph",
    text: "OpenAI가 제시한 다섯 가지 모델은 인력 역량 강화, AI 네이티브 유통, 전문 역량 확장, 시스템 및 의존성 관리, 프로세스 재설계입니다. 각 모델은 가치 실현 속도와 거버넌스 요구사항이 다르지만, 앞 단계에서 쌓은 역량이 다음 단계의 기반이 됩니다.",
  },
  {
    id: "summary-4",
    type: "paragraph",
    text: "인력 역량 강화는 조직 전반이 ChatGPT 같은 도구를 안전하고 효과적으로 쓰는 공통 역량을 만드는 단계입니다. AI 네이티브 유통은 고객이 대화형 경험 안에서 제품과 서비스를 발견하고 선택하는 방식에 대응하는 모델입니다. 전문 역량 확장은 연구, 창작, 분석처럼 전문가 병목이 큰 영역에서 AI로 탐색 범위와 생산성을 넓히는 접근입니다.",
  },
  {
    id: "summary-5",
    type: "paragraph",
    text: "시스템 및 의존성 관리는 Codex 같은 에이전트를 활용해 코드뿐 아니라 SOP, 계약서, 정책 문서, 고객 커뮤니케이션처럼 서로 연결된 산출물을 안전하게 변경하고 일관성을 유지하는 모델입니다. 프로세스 재설계는 에이전트가 구매-결제, 보험 청구, 제조 변경 관리 같은 엔드투엔드 워크플로를 조율하는 단계입니다.",
  },
  {
    id: "implications-heading",
    type: "heading",
    text: "시사점",
  },
  {
    id: "implications-1",
    type: "paragraph",
    text: "이 글은 기업의 AI 도입을 파일럿 개수로 평가해서는 안 된다는 점을 강조합니다. 중요한 것은 각 실험이 조직 역량, 통제 구조, 시스템 통합, 새로운 운영 모델로 이어지는지입니다.",
  },
  {
    id: "implications-2",
    type: "paragraph",
    text: "조직은 먼저 활용 역량과 신뢰를 구축하고, 이후 소수의 핵심 영역에서 비즈니스 가치를 측정해야 합니다. 그 성과를 데이터 품질, 통합, 관측 가능성, 권한 관리, 감사 가능성 같은 기반에 재투자해야 더 깊은 자동화와 프로세스 재설계로 넘어갈 수 있습니다.",
  },
  {
    id: "implications-3",
    type: "paragraph",
    text: '교육이나 워크숍에서는 "AI를 어디에 붙일까"보다 "우리 조직은 현재 어떤 가치 모델에 있는가", "다음 단계로 가려면 어떤 기반이 필요한가", "권한, 로그, 예외 처리, 책임 구조가 준비되어 있는가"를 묻는 방식이 유용합니다.',
  },
  {
    id: "implications-4",
    type: "paragraph",
    text: "AI는 처음에는 개별 업무를 빠르게 만드는 도구처럼 보이지만, 충분한 역량과 거버넌스가 쌓이면 워크플로와 운영 모델, 나아가 비즈니스 모델 자체를 재설계하는 힘이 됩니다.",
  },
]

function FiveAiValueModelsInsight() {
  return React.createElement(FixedInsightArticle, { sections: fiveAiValueModelsSections })
}

export default FiveAiValueModelsInsight
