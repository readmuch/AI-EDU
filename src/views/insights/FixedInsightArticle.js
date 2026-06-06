import React from "react"

function Paragraph({ children }) {
  return React.createElement("p", { className: "text-base leading-8 text-slate-700" }, children)
}

function Heading({ children }) {
  return React.createElement("h2", { className: "pt-3 text-2xl font-black text-slate-950" }, children)
}

function BulletList({ items }) {
  return React.createElement(
    "ul",
    { className: "list-disc space-y-2 pl-5 text-base leading-8 text-slate-700" },
    items.map((item) => React.createElement("li", { key: item, className: "pl-1" }, item)),
  )
}

function Callout({ children }) {
  return React.createElement(
    "div",
    { className: "rounded-lg border border-teal-100 bg-teal-50 p-5 text-base font-bold leading-8 text-teal-950" },
    children,
  )
}

export function FixedInsightArticle({ sections }) {
  return React.createElement(
    "div",
    { className: "mt-7 max-w-3xl space-y-5" },
    sections.map((section) => {
      if (section.type === "heading") return React.createElement(Heading, { key: section.id }, section.text)
      if (section.type === "list") return React.createElement(BulletList, { key: section.id, items: section.items })
      if (section.type === "callout") return React.createElement(Callout, { key: section.id }, section.text)
      return React.createElement(Paragraph, { key: section.id }, section.text)
    }),
  )
}
