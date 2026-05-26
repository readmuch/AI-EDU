import HeroSection from "./components/sections/HeroSection"
import AudienceSection from "./components/sections/AudienceSection"
import RoadmapSection from "./components/sections/RoadmapSection"
import CurriculumSection from "./components/sections/CurriculumSection"
import PracticeSection from "./components/sections/PracticeSection"
import PromptTemplateSection from "./components/sections/PromptTemplateSection"
import ProjectSection from "./components/sections/ProjectSection"
import OutcomeSection from "./components/sections/OutcomeSection"
import FaqSection from "./components/sections/FaqSection"
import LecturePlanSection from "./components/sections/LecturePlanSection"
import {
  audienceItems,
  roadmapLevels,
  practiceExamples,
  promptTemplates,
  finalProjectExamples,
  effects,
  faqItems,
  lecturePlans,
} from "./data/courseData"

function App() {
  const scrollTo = (id) => {
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 md:gap-8 md:px-6 md:py-8">
        <HeroSection
          onGoCurriculum={() => scrollTo("curriculum")}
          onGoPractice={() => scrollTo("practice")}
          onGoLecturePlans={() => scrollTo("lecture-plans")}
        />
        <AudienceSection items={audienceItems} />
        <RoadmapSection levels={roadmapLevels} />
        <CurriculumSection levels={roadmapLevels} />
        <LecturePlanSection plans={lecturePlans} />
        <PracticeSection examples={practiceExamples} />
        <PromptTemplateSection templates={promptTemplates} />
        <ProjectSection examples={finalProjectExamples} />
        <OutcomeSection effects={effects} />
        <FaqSection items={faqItems} />
      </main>
    </div>
  )
}

export default App
