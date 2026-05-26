function SectionTitle({ badge, title, subtitle }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10">
      {badge ? (
        <span className="mb-3 inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-700">
          {badge}
        </span>
      ) : null}
      <h2 className="mb-3 text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
      {subtitle ? <p className="text-sm text-slate-600 md:text-base">{subtitle}</p> : null}
    </div>
  )
}

export default SectionTitle
