import { useEffect, useMemo, useRef, useState } from "react"
import BottomNavigation from "./components/mobile/BottomNavigation"
import DesktopNavigation from "./components/mobile/DesktopNavigation"
import { navigationTabs } from "./data/mobileCourseData"
import CourseView from "./views/CourseView"
import FaqView from "./views/FaqView"
import HomeView from "./views/HomeView"
import PracticeView from "./views/PracticeView"
import TemplateView from "./views/TemplateView"

function App() {
  const [activeTab, setActiveTab] = useState("home")
  const mainRef = useRef(null)

  const activeLabel = useMemo(() => {
    return navigationTabs.find((tab) => tab.id === activeTab)?.label ?? "홈"
  }, [activeTab])

  useEffect(() => {
    mainRef.current?.focus()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [activeTab])

  const handleNavigate = (tabId) => {
    setActiveTab(tabId)
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case "course":
        return <CourseView />
      case "practice":
        return <PracticeView />
      case "templates":
        return <TemplateView />
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
        {renderActiveView()}
      </main>
      <BottomNavigation tabs={navigationTabs} activeTab={activeTab} onChange={handleNavigate} />
    </div>
  )
}

export default App
