import fs from "node:fs"
import path from "node:path"

const root = process.cwd()

const requiredFiles = [
  "src/App.jsx",
  "src/data/mobileCourseData.js",
  "src/components/mobile/BottomNavigation.jsx",
  "src/components/mobile/DesktopNavigation.jsx",
  "src/components/mobile/Accordion.jsx",
  "src/components/mobile/CopyButton.jsx",
  "src/views/HomeView.jsx",
  "src/views/CourseView.jsx",
  "src/views/PracticeView.jsx",
  "src/views/TemplateView.jsx",
  "src/views/FaqView.jsx",
]

const checks = [
  {
    label: "mobile shell uses five navigation tabs",
    file: "src/data/mobileCourseData.js",
    pattern: /id:\s*"home"[\s\S]*id:\s*"course"[\s\S]*id:\s*"practice"[\s\S]*id:\s*"templates"[\s\S]*id:\s*"faq"/,
  },
  {
    label: "mobile bottom navigation exposes aria-current",
    file: "src/components/mobile/BottomNavigation.jsx",
    pattern: /aria-current=\{isActive \? "page" : undefined\}/,
  },
  {
    label: "desktop navigation shares the same tab state",
    file: "src/components/mobile/DesktopNavigation.jsx",
    pattern: /aria-current=\{isActive \? "page" : undefined\}/,
  },
  {
    label: "copy button reports copied state",
    file: "src/components/mobile/CopyButton.jsx",
    pattern: /copied \? "복사 완료" : label/,
  },
  {
    label: "home has large shortcuts to practice and templates",
    file: "src/views/HomeView.jsx",
    pattern: /onNavigate\("practice"\)[\s\S]*onNavigate\("templates"\)/,
  },
  {
    label: "course uses accordions for long mobile content",
    file: "src/views/CourseView.jsx",
    pattern: /<Accordion[\s\S]*일자별 시간표[\s\S]*<Accordion[\s\S]*실습 자료/,
  },
  {
    label: "app switches active views instead of rendering one long page",
    file: "src/App.jsx",
    pattern: /activeTab[\s\S]*renderActiveView[\s\S]*BottomNavigation/,
  },
]

const failures = []

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    failures.push(`missing file: ${relativePath}`)
  }
}

for (const check of checks) {
  const filePath = path.join(root, check.file)
  if (!fs.existsSync(filePath)) {
    continue
  }

  const content = fs.readFileSync(filePath, "utf8")
  if (!check.pattern.test(content)) {
    failures.push(`failed check: ${check.label} (${check.file})`)
  }
}

if (failures.length) {
  console.error("Mobile UX verification failed:")
  for (const failure of failures) {
    console.error(`- ${failure}`)
  }
  process.exit(1)
}

console.log("Mobile UX verification passed")
