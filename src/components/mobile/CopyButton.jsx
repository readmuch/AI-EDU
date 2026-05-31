import { useState } from "react"

function CopyButton({ text, label = "복사" }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="min-h-11 rounded-lg bg-slate-950 px-4 py-2 text-sm font-black text-white transition hover:bg-slate-800"
    >
      {copied ? "복사 완료" : label}
    </button>
  )
}

export default CopyButton
