import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const roots = ["src"]
const extensions = new Set([".js", ".jsx", ".css"])
const suspicious = /[\uFFFD\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/u
const allowed = new Set(["public/icons.svg"])

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    const stat = statSync(path)
    if (stat.isDirectory()) return walk(path)
    const ext = path.slice(path.lastIndexOf("."))
    return extensions.has(ext) ? [path] : []
  })
}

const failures = []

for (const root of roots) {
  for (const file of walk(root)) {
    if (allowed.has(file.replaceAll("\\", "/"))) continue
    const text = readFileSync(file, "utf8")
    const lines = text.split(/\r?\n/)
    lines.forEach((line, index) => {
      if (suspicious.test(line)) {
        failures.push(`${file}:${index + 1}: ${line.trim()}`)
      }
    })
  }
}

if (failures.length) {
  console.error("Suspicious mojibake characters found:")
  console.error(failures.slice(0, 80).join("\n"))
  if (failures.length > 80) {
    console.error(`...and ${failures.length - 80} more`)
  }
  process.exit(1)
}

console.log("Korean text check passed.")
