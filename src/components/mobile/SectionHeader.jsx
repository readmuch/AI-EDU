function SectionHeader({ eyebrow, title, desc }) {
  return (
    <div className="mb-4">
      {eyebrow ? <p className="mb-2 text-sm font-black text-teal-700">{eyebrow}</p> : null}
      <h2 className="text-2xl font-black leading-tight text-slate-950 md:text-3xl">{title}</h2>
      {desc ? <p className="mt-2 text-base leading-7 text-slate-600">{desc}</p> : null}
    </div>
  )
}

export default SectionHeader
