import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react"
import BottomNavigation from "./components/mobile/BottomNavigation"
import DesktopNavigation from "./components/mobile/DesktopNavigation"
import { navigationTabs } from "./data/navigationData"
import { buildNavigationHash, readNavigationState } from "./data/navigationState"

const CourseView = lazy(() => import("./views/CourseView"))
const FaqView = lazy(() => import("./views/FaqView"))
const HomeView = lazy(() => import("./views/HomeView"))
const InsightView = lazy(() => import("./views/InsightView"))
const PracticeView = lazy(() => import("./views/PracticeView"))
const TemplateView = lazy(() => import("./views/TemplateView"))

function ViewLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center text-sm font-semibold text-slate-500" role="status">
      화면을 불러오는 중...
    </div>
  )
}

function App() {
  const initialNavigationState = useMemo(() => readNavigationState(), [])
  const [activeTab, setActiveTab] = useState(initialNavigationState.activeTab)
  const [selectedCourseId, setSelectedCourseId] = useState(initialNavigationState.selectedCourseId)
  const [selectedInsightId, setSelectedInsightId] = useState(initialNavigationState.selectedInsightId)
  const mainRef = useRef(null)

  const activeLabel = useMemo(() => {
    return navigationTabs.find((tab) => tab.id === activeTab)?.label ?? "홈"
  }, [activeTab])

  useEffect(() => {
    mainRef.current?.focus()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [activeTab])

  const handleNavigate = (tabId, options = {}) => {
    if (tabId === "course" && options.courseId) {
      setSelectedCourseId(options.courseId)
    }
    if (tabId === "insights" && options.insightId) {
      setSelectedInsightId(options.insightId)
    }
    window.history.replaceState(null, "", buildNavigationHash(tabId, options))
    setActiveTab(tabId)
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case "course":
        return <CourseView key={selectedCourseId ?? "default-course"} selectedLevelId={selectedCourseId} />
      case "practice":
        return <PracticeView />
      case "templates":
        return <TemplateView />
      case "insights":
        return <InsightView key={selectedInsightId ?? "default-insight"} selectedInsightId={selectedInsightId} />
      case "faq":
        return <FaqView />
      case "home":
      default:
        return <HomeView onNavigate={handleNavigate} />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <DesktopNavigation tabs={navigationTabs} activeTab={activeTab} onChange={handleNavigate} />
      <main
        ref={mainRef}
        tabIndex={-1}
        aria-label={`${activeLabel} 화면`}
        className="mx-auto w-full max-w-6xl px-4 pb-28 pt-4 outline-none md:px-6 md:pb-12 md:pt-8"
      >
        <Suspense fallback={<ViewLoading />}>{renderActiveView()}</Suspense>
      </main>
      <BottomNavigation tabs={navigationTabs} activeTab={activeTab} onChange={handleNavigate} />
    </div>
  )
}

export default App
