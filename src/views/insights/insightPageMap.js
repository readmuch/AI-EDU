import FiveAiValueModelsInsight from "./FiveAiValueModelsInsight.js"
import OpenAiTaxAgentInsight from "./OpenAiTaxAgentInsight.js"

export const insightPageMap = {
  openai: OpenAiTaxAgentInsight,
  "the-five-ai-value-models-driving-business-reinvention": FiveAiValueModelsInsight,
}

export function getInsightPage(insightId) {
  return insightPageMap[insightId] ?? null
}
