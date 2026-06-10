import HeroVisual from "./components/HeroVisual";
import SectionTitle from "./components/SectionTitle";
import ConceptCard from "./components/ConceptCard";
import LessonCard from "./components/LessonCard";
import FormulaCard from "./components/FormulaCard";
import SimulatorPanel from "./components/SimulatorPanel";
import CoasterTypeCard from "./components/CoasterTypeCard";
import {
  coasterExamples,
  formulas,
  lessons,
  physicsConcepts,
} from "./data/siteData";

const navLinks = [
  { label: "Learn", href: "#learn" },
  { label: "Lessons", href: "#lessons" },
  { label: "Simulator", href: "#simulator" },
  { label: "About", href: "#about" },
];

const App = () => {
  return (
    <div className="relative overflow-x-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-[-8rem] top-20 h-64 w-64 rounded-full bg-cyan-400/[0.12] blur-3xl" />
        <div className="absolute right-[-5rem] top-[24rem] h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 border-b border-white/10 bg-night-950/75 backdrop-blur-xl">
        <div className="section-shell flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <a href="#home" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/15 text-sm font-bold uppercase tracking-[0.18em] text-cyan-100">
              CP
            </div>
            <div>
              <p className="font-display text-lg font-semibold text-white">
                Coaster Physics
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                STEM Project
              </p>
            </div>
          </a>

          <nav className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.16em] text-slate-300 sm:text-sm sm:normal-case sm:tracking-normal">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="section-shell py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-2xl">
              <span className="chip">Physics in Motion</span>
              <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Learn Physics Through Roller Coasters
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Coaster Physics turns drops, loops, launches, brakes, and airtime
                into simple lessons about energy, forces, motion, and why every
                track element feels the way it does.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#lessons"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-cyan-200"
                >
                  Start Learning
                </a>
                <a
                  href="#learn"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
                >
                  Explore Coaster Physics
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <StatCard value="8+" label="Core physics concepts" />
                <StatCard value="6" label="Featured lesson paths" />
                <StatCard value="1" label="Simulator preview" />
              </div>
            </div>

            <HeroVisual />
          </div>
        </section>

        <section id="learn" className="section-shell py-12 sm:py-16">
          <SectionTitle
            eyebrow="Why It Works"
            title="How Roller Coasters Teach Physics"
            description="Roller coasters are basically real-life physics labs. Every climb, turn, launch, and brake run gives students a visible way to connect equations with motion they can imagine and forces they can actually feel."
          />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {physicsConcepts.map((concept) => (
              <ConceptCard key={concept.title} concept={concept} />
            ))}
          </div>
        </section>

        <section id="lessons" className="section-shell py-12 sm:py-16">
          <SectionTitle
            eyebrow="Lessons"
            title="Interactive Lesson Cards"
            description="Each lesson starts with a familiar coaster moment, then connects that experience to the physics behind it in clear, student-friendly language."
          />

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.title} lesson={lesson} />
            ))}
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="panel p-8 sm:p-10">
              <span className="chip">Featured Lesson</span>
              <h2 className="mt-6 font-display text-4xl font-semibold text-white">
                The First Drop
              </h2>
              <div className="mt-6 space-y-4 text-base leading-7 text-slate-300">
                <p>
                  At the top of the hill, the coaster has high gravitational
                  potential energy because it has been lifted high above the
                  ground.
                </p>
                <p>
                  As it drops, that stored energy turns into kinetic energy. The
                  train speeds up because gravity is converting height into motion.
                </p>
                <p>
                  The lower the coaster gets, the faster it moves, which is why
                  the bottom of the drop usually feels intense and powerful.
                </p>
                <p>
                  Real rides also lose some mechanical energy to friction and air
                  resistance, so the system is never perfectly efficient.
                </p>
              </div>
            </div>

            <div className="panel relative overflow-hidden p-8 sm:p-10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-amber-300/10" />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
                      Mini Diagram
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      Height Down, Speed Up
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                    Energy transfer
                  </span>
                </div>

                <div className="mt-8 rounded-[1.75rem] border border-white/10 bg-slate-950/75 p-5">
                  <svg viewBox="0 0 440 260" className="w-full">
                    <path
                      d="M60 210 L60 40"
                      stroke="#475569"
                      strokeDasharray="7 7"
                      strokeWidth="2"
                    />
                    <path
                      d="M60 210 L390 210"
                      stroke="#475569"
                      strokeDasharray="7 7"
                      strokeWidth="2"
                    />
                    <path
                      d="M84 74 C150 84, 220 118, 360 196"
                      stroke="#6ee7f9"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <path
                      d="M84 188 C152 181, 240 154, 360 64"
                      stroke="#fbbf24"
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <text x="76" y="28" fill="#cbd5e1" fontSize="14">
                      More height
                    </text>
                    <text x="285" y="233" fill="#cbd5e1" fontSize="14">
                      More distance
                    </text>
                    <text x="280" y="197" fill="#6ee7f9" fontSize="14">
                      Height
                    </text>
                    <text x="283" y="63" fill="#fbbf24" fontSize="14">
                      Speed
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 sm:py-16">
          <SectionTitle
            eyebrow="Formulas"
            title="Core Physics Equations"
            description="These formulas help translate coaster motion into numbers. The goal is not just memorizing them, but seeing how each one explains a real moment on the ride."
          />

          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {formulas.map((formula) => (
              <FormulaCard key={formula.name} formula={formula} />
            ))}
          </div>
        </section>

        <section id="simulator" className="section-shell py-12 sm:py-16">
          <SectionTitle
            eyebrow="Coming Soon"
            title="Coaster Simulator Preview"
            description="This polished preview shows where the project can go next: an interactive sandbox where students adjust ride variables and watch the physics change in real time."
          />

          <SimulatorPanel />
        </section>

        <section className="section-shell py-12 sm:py-16">
          <SectionTitle
            eyebrow="Examples"
            title="Real-World Coaster Types"
            description="Different coaster designs emphasize different physics ideas, making it easier to compare how forces, energy, and track geometry shape the rider experience."
          />

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {coasterExamples.map((coaster) => (
              <CoasterTypeCard key={coaster.title} coaster={coaster} />
            ))}
          </div>
        </section>

        <section id="about" className="section-shell py-12 sm:py-16">
          <div className="panel grid gap-8 overflow-hidden p-8 sm:p-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <span className="chip">About The Project</span>
              <h2 className="mt-6 font-display text-4xl font-semibold text-white">
                Making Physics Feel Real
              </h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-slate-300">
              <p>
                Coaster Physics was created to make physics more visual, exciting,
                and connected to real-life experiences. Instead of treating motion
                and energy as abstract ideas, the project uses coaster elements
                students already recognize.
              </p>
              <p>
                Roller coasters are a great way to understand acceleration,
                forces, and energy changes because riders can imagine or remember
                what those moments feel like. That physical intuition helps turn
                formulas into something much easier to understand.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="border-t border-white/10 py-10">
        <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-white">
              Coaster Physics
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Learn physics through drops, loops, launches, and real coaster
              motion.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-300">
            <a href="#learn" className="transition hover:text-white">
              Learn
            </a>
            <a href="#simulator" className="transition hover:text-white">
              Simulator
            </a>
            <a href="#lessons" className="transition hover:text-white">
              Lessons
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#footer" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const StatCard = ({ value, label }) => {
  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
      <p className="font-display text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
};

export default App;
