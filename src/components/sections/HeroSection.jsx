function HeroSection({ onGoCurriculum, onGoPractice, onGoLecturePlans }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-br from-white via-indigo-50 to-blue-100 p-8 shadow-sm md:p-12">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-700">
          <span>AI 실무 교육</span>
          <span className="rounded bg-indigo-600 px-2 py-0.5 text-white">3단계 로드맵</span>
        </span>
        <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">
          직장인을 위한 AI 활용 교육
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-slate-700 md:text-lg">
          AI를 처음 쓰는 단계부터 나만의 업무 프로젝트 완성까지
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onGoCurriculum}
            className="rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            교육 과정 보기
          </button>
          <button
            type="button"
            onClick={onGoPractice}
            className="rounded-xl border border-indigo-300 bg-white px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
          >
            실습 예제 확인하기
          </button>
          <button
            type="button"
            onClick={onGoLecturePlans}
            className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            단계별 강의안 보기
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
