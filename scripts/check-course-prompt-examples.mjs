import { readFileSync } from "node:fs"

const courseView = readFileSync("src/views/CourseView.jsx", "utf8")

const checks = [
  {
    label: "course view imports the shared copy button",
    pattern: /import CopyButton from "\.\.\/components\/mobile\/CopyButton"/,
  },
  {
    label: "course view defines lesson prompt examples",
    pattern: /const createLessonPromptExamples = \(lessonItem\) => \[/,
  },
  {
    label: "course view renders copyable prompt example section",
    pattern: /복사해서 쓰는 프롬프트 사례[\s\S]*CopyButton text=\{promptExample\.prompt\}/,
  },
  {
    label: "course view renders prompt text in preformatted blocks",
    pattern: /<pre[\s\S]*\{promptExample\.prompt\}[\s\S]*<\/pre>/,
  },
]

const failures = checks.filter((check) => !check.pattern.test(courseView))

if (failures.length) {
  console.error("Course prompt example verification failed:")
  for (const failure of failures) {
    console.error(`- ${failure.label}`)
  }
  process.exit(1)
}

console.log("Course prompt example verification passed")
