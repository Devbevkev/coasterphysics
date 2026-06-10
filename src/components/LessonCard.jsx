const difficultyStyles = {
  Beginner: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
  Intermediate: "border-sky-300/25 bg-sky-300/10 text-sky-100",
  Advanced: "border-amber-300/25 bg-amber-300/10 text-amber-100",
};

const LessonCard = ({ lesson }) => {
  return (
    <article className="panel flex h-full flex-col justify-between p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10">
      <div>
        <span
          className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
            difficultyStyles[lesson.difficulty]
          }`}
        >
          {lesson.difficulty}
        </span>
        <h3 className="mt-5 text-2xl font-semibold leading-tight text-white">
          {lesson.title}
        </h3>
        <p className="mt-4 text-sm leading-6 text-slate-300">
          {lesson.description}
        </p>
      </div>

      <button className="mt-8 inline-flex w-fit items-center justify-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200/50 hover:bg-cyan-300/20">
        Learn More
      </button>
    </article>
  );
};

export default LessonCard;
