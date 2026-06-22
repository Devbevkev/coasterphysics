import {
  courseBigIdeas,
  courseDescription,
  courseTitle,
  lessonPlans,
} from "./data/siteData";

const sectionTitles = [
  ["lessonGoal", "Lesson goal"],
  ["whyItMatters", "Why this matters for roller coasters"],
  ["prerequisites", "Prerequisite ideas students should know"],
  ["keyConcepts", "Key concepts"],
  ["keyEquations", "Key equations"],
  ["teachingSequence", "Detailed teaching sequence"],
  ["rollerCoasterApplication", "Roller coaster application"],
  ["workedExample", "Worked example"],
  ["commonMistakes", "Common mistakes"],
  ["conceptualCheckpoints", "Conceptual checkpoint questions"],
  ["practiceProblems", "Practice problems"],
  ["nextLessonConnection", "How this lesson connects to the next lesson"],
];

const SectionHeading = ({ children }) => (
  <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
    {children}
  </h3>
);

const BulletList = ({ items, className = "" }) => (
  <ul className={`space-y-3 text-sm leading-7 text-slate-200 sm:text-base ${className}`}>
    {items.map((item) => (
      <li key={item} className="flex gap-3">
        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-cyan-300" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const KeyConcepts = ({ concepts }) => (
  <div className="grid gap-4 md:grid-cols-2">
    {concepts.map((concept) => (
      <div key={concept.term} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h4 className="text-base font-semibold text-white">{concept.term}</h4>
        <p className="mt-2 text-sm leading-7 text-slate-200">{concept.explanation}</p>
      </div>
    ))}
  </div>
);

const TeachingSequence = ({ steps }) => (
  <div className="space-y-4">
    {steps.map((step) => (
      <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
        <h4 className="text-base font-semibold text-white">{step.title}</h4>
        <p className="mt-2 text-sm leading-7 text-slate-200">{step.detail}</p>
      </div>
    ))}
  </div>
);

const WorkedExample = ({ example }) => (
  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.06] p-6">
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
      Prompt
    </p>
    <p className="mt-3 text-sm leading-7 text-slate-100 sm:text-base">
      {example.prompt}
    </p>
    <div className="mt-5">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
        Solution path
      </p>
      <ol className="mt-3 space-y-3 text-sm leading-7 text-slate-100 sm:text-base">
        {example.steps.map((step) => (
          <li key={step} className="flex gap-3">
            <span className="font-semibold text-cyan-200">•</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
    <p className="mt-5 text-sm leading-7 text-slate-100 sm:text-base">
      <span className="font-semibold text-white">Result:</span> {example.result}
    </p>
  </div>
);

const LessonPlan = ({ lesson }) => (
  <article
    id={lesson.id}
    className="panel scroll-mt-24 p-6 sm:p-8 lg:p-10"
  >
    <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="chip">Lesson {lesson.number}</span>
        <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
          AP Physics C
        </span>
      </div>
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {lesson.title}
        </h2>
      </div>
    </div>

    <div className="mt-8 space-y-8">
      {sectionTitles.map(([field, label]) => {
        const value = lesson[field];

        return (
          <section key={field} className="space-y-4">
            <SectionHeading>{label}</SectionHeading>
            {field === "lessonGoal" && (
              <p className="text-sm leading-7 text-slate-200 sm:text-base">{value}</p>
            )}
            {field === "whyItMatters" && (
              <p className="text-sm leading-7 text-slate-200 sm:text-base">{value}</p>
            )}
            {field === "prerequisites" && <BulletList items={value} />}
            {field === "keyConcepts" && <KeyConcepts concepts={value} />}
            {field === "keyEquations" && (
              <div className="grid gap-3 md:grid-cols-2">
                {value.map((equation) => (
                  <div
                    key={equation}
                    className="rounded-2xl border border-white/10 bg-slate-950/30 px-5 py-4 font-mono text-sm text-cyan-100 sm:text-base"
                  >
                    {equation}
                  </div>
                ))}
              </div>
            )}
            {field === "teachingSequence" && <TeachingSequence steps={value} />}
            {field === "rollerCoasterApplication" && (
              <p className="text-sm leading-7 text-slate-200 sm:text-base">{value}</p>
            )}
            {field === "workedExample" && <WorkedExample example={value} />}
            {field === "commonMistakes" && <BulletList items={value} />}
            {field === "conceptualCheckpoints" && <BulletList items={value} />}
            {field === "practiceProblems" && <BulletList items={value} />}
            {field === "nextLessonConnection" && (
              <p className="text-sm leading-7 text-slate-200 sm:text-base">{value}</p>
            )}
          </section>
        );
      })}
    </div>
  </article>
);

function App() {
  return (
    <div className="pb-16">
      <header className="section-shell pt-10 sm:pt-14">
        <div className="panel overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
            <div>
              <span className="chip">Complete lesson sequence</span>
              <h1 className="mt-5 max-w-4xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                {courseTitle}
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
                {courseDescription}
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <h2 className="text-lg font-semibold text-white">Course logic</h2>
              <BulletList items={courseBigIdeas} className="mt-4" />
            </div>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {lessonPlans.map((lesson) => (
              <a
                key={lesson.id}
                href={`#${lesson.id}`}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4 transition hover:border-cyan-300/40 hover:bg-cyan-300/[0.08]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  Lesson {lesson.number}
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  {lesson.title}
                </p>
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="section-shell mt-10 space-y-8">
        {lessonPlans.map((lesson) => (
          <LessonPlan key={lesson.id} lesson={lesson} />
        ))}
      </main>
    </div>
  );
}

export default App;
