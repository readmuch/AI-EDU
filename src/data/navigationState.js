import { navigationTabs } from "./navigationData.js"

const HOME_TAB = "home"
const tabIds = new Set(navigationTabs.map((tab) => tab.id))

function cleanSegment(value) {
  return decodeURIComponent(value ?? "").trim()
}

export function parseNavigationHash(hash) {
  const [tabSegment, detailSegment] = (hash || "").replace(/^#\/?/, "").split("/")
  const activeTab = tabIds.has(tabSegment) ? tabSegment : HOME_TAB
  const detailId = cleanSegment(detailSegment)

  return {
    activeTab,
    selectedCourseId: activeTab === "course" && detailId ? detailId : null,
    selectedInsightId: activeTab === "insights" && detailId ? detailId : null,
  }
}

export function buildNavigationHash(tabId, options = {}) {
  const activeTab = tabIds.has(tabId) ? tabId : HOME_TAB
  const detailId = activeTab === "course" ? options.courseId : activeTab === "insights" ? options.insightId : null

  if (!detailId) return `#${activeTab}`
  return `#${activeTab}/${encodeURIComponent(detailId)}`
}

export function readNavigationState() {
  if (typeof window === "undefined") return parseNavigationHash("")
  return parseNavigationHash(window.location.hash)
}
