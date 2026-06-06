import React from "react"
import { FixedInsightArticle } from "./FixedInsightArticle.js"

export const openAiTaxAgentSections = [
  {
    id: "summary-heading",
    type: "heading",
    text: "핵심요약",
  },
  {
    id: "summary-1",
    type: "paragraph",
    text: "OpenAI와 Thrive Holdings는 Crete의 세무 전문가들과 함께 Tax AI를 만들며, 실제 업무에서 발생한 수정 사항을 제품 개선으로 연결하는 구조를 설계했습니다. Tax AI는 고객 파일과 메모를 분석해 세무 엔진에 넣을 신고 초안을 만들고, 회계 전문가가 이를 검토하고 수정할 수 있게 합니다.",
  },
  {
    id: "summary-2",
    type: "paragraph",
    text: "핵심은 AI가 단순히 신고서를 대신 작성하는 것이 아니라, 전문가의 수정 내용을 trace와 eval로 남겨 Codex가 개선할 수 있는 작업 단위로 바꾸는 데 있습니다. 입력 파일, 추출 필드, 출처, 세무 엔진 제출값, 전문가 수정 내용이 함께 기록되면 반복되는 오류를 제품 개선 패턴으로 식별할 수 있습니다.",
  },
  {
    id: "summary-3",
    type: "paragraph",
    text: "파일럿 기간 동안 Tax AI는 7,000건의 세금 신고서를 처리했습니다. OpenAI에 따르면 세무 준비 시간을 약 3분의 1 줄였고, 최대 97% 정확도의 초안을 만들었으며, 처리량은 약 50% 높였습니다. 출시 초기에는 75% 이상 필드가 올바르게 채워진 신고서가 4분의 1 수준이었지만, 6주 뒤에는 86%가 그 기준에 도달했습니다.",
  },
  {
    id: "summary-4",
    type: "paragraph",
    text: "Codex는 관련 trace, source artifact, eval dataset, regression suite, 제품 코드, task 문서를 바탕으로 원인을 조사하고 코드를 수정합니다. 이후 targeted eval로 특정 문제가 해결됐는지 확인하고, regression eval로 기존 기능이 깨지지 않았는지 검증한 뒤 사람이 검토할 수 있는 변경 제안을 만듭니다.",
  },
  {
    id: "implications-heading",
    type: "heading",
    text: "시사점",
  },
  {
    id: "implications-1",
    type: "paragraph",
    text: "이 사례는 AI 에이전트가 좋아지려면 모델 성능뿐 아니라 현업 전문가의 피드백, 제품 안의 관찰 가능성, eval 기반 검증, 사람의 최종 검토가 함께 필요하다는 점을 보여줍니다.",
  },
  {
    id: "implications-2",
    type: "paragraph",
    text: "조직에서 AI를 도입할 때는 사용자가 수정한 결과를 구조화해서 기록하고, 반복되는 실패를 eval로 바꾸며, AI가 고칠 수 있는 문제와 사람이 판단해야 하는 문제를 구분해야 합니다. 모든 수정이 자동 배포되는 것이 아니라 실제 오류, 업무상 선호, 전문 판단, workflow noise를 나누는 절차가 필요합니다.",
  },
  {
    id: "implications-3",
    type: "paragraph",
    text: '교육 현장에서는 이 사례를 "AI가 스스로 좋아진다"는 이야기로 다루기보다, 사람이 남긴 고품질 피드백을 제품 trace와 eval로 바꾸고 Codex가 제한된 범위의 개선을 반복하는 운영 설계 사례로 설명하는 것이 좋습니다.',
  },
]

function OpenAiTaxAgentInsight() {
  return React.createElement(FixedInsightArticle, { sections: openAiTaxAgentSections })
}

export default OpenAiTaxAgentInsight
