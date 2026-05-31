import { useState } from "react"

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex min-h-12 w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="text-base font-black text-slate-950">{title}</span>
        <span className="text-xl font-light text-slate-500" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? <div className="border-t border-slate-100 px-4 py-4">{children}</div> : null}
    </section>
  )
}

export default Accordion
