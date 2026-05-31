function DesktopNavigation({ tabs, activeTab, onChange }) {
  return (
    <nav className="sticky top-0 z-30 hidden border-b border-slate-200 bg-white/90 backdrop-blur md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <div>
          <p className="text-sm font-black text-slate-950">AI 업무 교육</p>
          <p className="text-xs font-medium text-slate-500">모바일 중심 학습 자료 서비스</p>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onChange(tab.id)}
                className={`min-h-11 rounded-md px-4 text-sm font-bold transition ${
                  isActive ? "bg-white text-slate-950 shadow-sm" : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default DesktopNavigation
