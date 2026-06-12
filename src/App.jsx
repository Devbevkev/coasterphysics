import { useState } from "react";

const sections = [
  {
    id: "motion",
    number: "1",
    title: "Motion on the Track",
    subtitle: "Position, Velocity, Acceleration",
    intro: "Start with the basic language of motion.",
    teach: [
      "Position vs. displacement",
      "Speed vs. velocity",
      "Acceleration",
      "Motion graphs",
      "Tangential vs. radial acceleration",
      "Why changing direction counts as acceleration",
    ],
    coaster: [
      "A coaster speeds up on drops.",
      "It slows down going uphill.",
      "It accelerates even in turns because velocity direction changes.",
    ],
  },
  {
    id: "forces",
    number: "2",
    title: "Forces and Free-Body Diagrams",
    subtitle: "How the Track Pushes Back",
    intro:
      "This should come early because almost everything later depends on forces.",
    teach: [
      "Gravity",
      "Normal force",
      "Friction",
      "Free-body diagrams",
      "Newton's 2nd Law: Sigma F = ma",
      "Components of forces on slopes",
    ],
    coaster: [
      "On a hill, gravity has a component along the track.",
      "The track pushes on the coaster with a normal force.",
      "Friction and drag oppose motion.",
    ],
  },
  {
    id: "energy",
    number: "3",
    title: "Energy",
    subtitle: "Drops, Hills, and Speed",
    intro: "This is probably the most intuitive coaster unit.",
    teach: [
      "Gravitational potential energy",
      "Kinetic energy",
      "Conservation of mechanical energy",
      "Work-energy theorem",
      "Energy loss from friction",
      "Why later hills are lower than the first drop",
    ],
    coaster: [
      "At the top: maximum potential energy.",
      "At the bottom: maximum kinetic energy.",
      "Friction turns mechanical energy into thermal energy, so the coaster cannot return to the same height.",
    ],
  },
  {
    id: "work",
    number: "4",
    title: "Work, Power, and Launch/Lift Hills",
    subtitle: "Where the Energy Comes From",
    intro:
      "This section explains how the coaster gets energy in the first place.",
    teach: [
      "Work: W = integral of F dx",
      "Work by gravity",
      "Work by friction",
      "Work by the chain lift or launch",
      "Power: P = dW/dt",
      "Positive vs. negative work",
    ],
    coaster: [
      "The chain lift does positive work.",
      "Gravity does positive work on drops and negative work uphill.",
      "Brakes and friction do negative work.",
      "A faster lift or launch requires more power.",
    ],
  },
  {
    id: "curved-motion",
    number: "5",
    title: "Curved Motion",
    subtitle: "Loops, Hills, and Turns",
    intro: "This is where it starts to feel very AP Physics C.",
    teach: [
      "Centripetal acceleration",
      "Radial force equations",
      "Motion over hill crests",
      "Motion through valleys",
      "Vertical loops",
      "Minimum speed at the top of a loop",
    ],
    coaster: [
      "At the bottom of a dip, riders feel heavy.",
      "At the top of a hill, riders feel light.",
      "In a loop, the required inward acceleration changes direction constantly.",
    ],
    highlights: [
      "Top of hill: mg - N = mv^2/r",
      "Bottom of dip: N - mg = mv^2/r",
      "Top of loop: mg + N = mv^2/r",
    ],
  },
  {
    id: "g-forces",
    number: "6",
    title: "Apparent Weight, Normal Force, and G-Forces",
    subtitle: "What Riders Actually Feel",
    intro:
      "This section connects the math to what riders actually feel.",
    teach: [
      "Normal force as felt weight",
      "Apparent weight",
      "Weightlessness",
      "Airtime",
      "Positive g's",
      "Low, zero, and negative g's",
      "Why the seat pushes harder at the bottom of a drop",
    ],
    coaster: [
      "Big normal force = feeling heavy.",
      "Small normal force = feeling light.",
      "N = 0 gives weightlessness and airtime.",
      "Negative g's happen when restraints push down on you.",
    ],
    note:
      "This section should come after curved motion because g-force is basically normal force divided by weight.",
  },
  {
    id: "momentum",
    number: "7",
    title: "Momentum, Impulse, and Braking",
    subtitle: "How the Ride Comes to a Stop",
    intro: "This is perfect for the end of the ride.",
    teach: [
      "Momentum: p = mv",
      "Impulse: J = integral of F dt = delta p",
      "Average braking force",
      "Stopping distance",
      "Stopping time",
      "Why gradual braking is safer",
    ],
    coaster: [
      "Brakes reduce the coaster's momentum.",
      "A longer stopping time means a smaller average force.",
      "Emergency stops create larger forces because the same momentum change happens over less time.",
    ],
  },
  {
    id: "rotation",
    number: "8",
    title: "Rotation, Torque, and Stability",
    subtitle: "Advanced Mechanics on the Ride",
    intro: "Use this as the advanced final mechanics section.",
    teach: [
      "Torque: tau = rF sin theta",
      "Rotational inertia",
      "Rolling wheels",
      "Angular velocity",
      "Rotational kinetic energy",
      "Stability and center of mass",
      "Tipping and turning effects",
    ],
    coaster: [
      "Wheels rotate as the coaster moves.",
      "Track forces create torques on cars and supports.",
      "The center of mass matters when a long train goes over a hill.",
      "Stability matters in turns, banking, and support design.",
    ],
  },
];

const App = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);

  return (
    <main className="section-shell py-16 sm:py-20 lg:py-24">
      <section className="grid min-h-[78vh] items-center gap-10 lg:grid-cols-[minmax(0,56rem)_1fr]">
        <div className="max-w-4xl">
          <h1 className="font-display text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-[6.5rem] lg:leading-[0.94]">
            Learn Physics
            <br />
            Through Roller
            <br />
            Coasters
          </h1>

          <p className="mt-8 max-w-4xl text-xl leading-[1.7] text-slate-300 sm:text-2xl">
            Coaster Physics turns drops, loops, launches, brakes, and airtime
            into simple lessons about energy, forces, motion, and why every
            track element feels the way it does.
          </p>

          <div className="mt-10">
            <a
              href="#topics"
              className="inline-flex min-w-[18rem] items-center justify-center rounded-full bg-cyan-300 px-8 py-5 text-lg font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-cyan-200"
            >
              Start Learning
            </a>
          </div>
        </div>

        <div className="hidden lg:block" />
      </section>

      <section id="topics" className="py-10 sm:py-14">
        <div className="max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Learning Path
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Select a Roller Coaster Physics Section
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            Start with motion, then work through forces, energy, curves, and
            g-forces like a full coaster ride from lift hill to brake run.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="grid gap-4">
            {sections.map((section) => {
              const isActive = section.id === activeSection.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section)}
                  className={`panel p-5 text-left transition ${
                    isActive
                      ? "border-cyan-300/40 bg-cyan-300/10"
                      : "hover:border-white/15 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-cyan-100">
                      {section.number}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {section.title}
                      </h3>
                      <p className="mt-1 text-sm uppercase tracking-[0.16em] text-slate-400">
                        {section.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <article className="panel p-7 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-300/15 text-base font-semibold text-cyan-100">
                {activeSection.number}
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-200">
                  Selected Section
                </p>
                <h3 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                  {activeSection.title}
                </h3>
              </div>
            </div>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              {activeSection.intro}
            </p>

            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Teach
                </h4>
                <ul className="mt-4 space-y-3 text-base leading-7 text-slate-200">
                  {activeSection.teach.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-cyan-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Roller Coaster Connection
                </h4>
                <ul className="mt-4 space-y-3 text-base leading-7 text-slate-200">
                  {activeSection.coaster.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-2 w-2 rounded-full bg-amber-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {activeSection.highlights ? (
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Key Coaster Examples
                </h4>
                <ul className="mt-4 space-y-3 text-base leading-7 text-slate-200">
                  {activeSection.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {activeSection.note ? (
              <div className="mt-8 rounded-3xl border border-cyan-300/20 bg-cyan-300/10 p-5 text-base leading-7 text-cyan-50">
                {activeSection.note}
              </div>
            ) : null}
          </article>
        </div>
      </section>
    </main>
  );
};

export default App;
