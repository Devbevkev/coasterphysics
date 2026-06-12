import { useEffect, useState } from "react";

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
    intro: "This section connects the math to what riders actually feel.",
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

const motionLesson = {
  title: "Section 1: Motion on the Track",
  subtitle: "Position, Velocity, and Acceleration",
  goal:
    "Students learn how to describe the motion of a roller coaster using position, displacement, velocity, speed, and acceleration.",
  steps: [
    {
      id: "goal",
      label: "Goal",
      title: "What This Lesson Teaches",
      body: [
        "Roller coasters are a perfect way to learn the language of motion because the ride is always changing how fast it moves and which way it points.",
        "In this lesson, students learn how to describe that motion clearly using the core kinematics ideas that show up all through physics.",
      ],
      bullets: [
        "Position",
        "Displacement",
        "Distance traveled",
        "Speed",
        "Velocity",
        "Acceleration",
        "Average vs. instantaneous velocity",
        "Average vs. instantaneous acceleration",
        "Motion graphs",
        "Tangential acceleration",
        "Radial acceleration",
        "Why changing direction means acceleration even if speed is constant",
      ],
    },
    {
      id: "explanation",
      label: "Explain",
      title: "How Motion Changes on a Roller Coaster",
      body: [
        "A roller coaster is constantly changing its motion. It speeds up on drops, slows down on hills, and changes direction on turns and loops.",
        "Position tells us where the coaster is on the track. Displacement tells us the change in position from start to finish. Distance is the total path traveled along the track, while displacement only depends on the starting and ending points.",
        "Speed is how fast something moves, while velocity includes both speed and direction.",
      ],
      callout:
        "A coaster moving at 20 m/s east and a coaster moving at 20 m/s west have the same speed but different velocities.",
    },
    {
      id: "acceleration",
      label: "Acceleration",
      title: "Acceleration Means Any Change in Velocity",
      body: [
        "Acceleration is the rate of change of velocity. That can mean speeding up, slowing down, or changing direction.",
        "This matters a lot on roller coasters because a coaster turning at constant speed is still accelerating.",
        "Tangential acceleration changes speed. Radial acceleration changes direction.",
      ],
      equations: [
        {
          label: "Average acceleration",
          expression: (
            <>
              a<sub>avg</sub> = Δv / Δt
            </>
          ),
        },
        {
          label: "Centripetal acceleration",
          expression: (
            <>
              a<sub>c</sub> = v² / r
            </>
          ),
        },
      ],
    },
    {
      id: "equations",
      label: "Equations",
      title: "Important Equations",
      equations: [
        {
          label: "Average velocity",
          expression: (
            <>
              v<sub>avg</sub> = Δx / Δt
            </>
          ),
        },
        {
          label: "Average acceleration",
          expression: (
            <>
              a<sub>avg</sub> = Δv / Δt
            </>
          ),
        },
        {
          label: "Constant-acceleration velocity",
          expression: <>v = v₀ + at</>,
        },
        {
          label: "Position with constant acceleration",
          expression: <>x = x₀ + v₀t + ½at²</>,
        },
        {
          label: "Velocity-position relation",
          expression: <>v² = v₀² + 2aΔx</>,
        },
        {
          label: "Curved motion",
          expression: (
            <>
              a<sub>c</sub> = v² / r
            </>
          ),
        },
      ],
      body: [
        "These equations let students connect the coaster's motion to measurable changes in position, time, speed, and curvature.",
      ],
    },
    {
      id: "examples",
      label: "Examples",
      title: "Roller Coaster Examples",
      cards: [
        {
          title: "Example 1: First Drop",
          text: "A coaster starts from rest and accelerates down a hill. Its speed increases, so it has tangential acceleration.",
        },
        {
          title: "Example 2: Turn at Constant Speed",
          text: "A coaster moves through a horizontal turn at a constant 18 m/s. Even though its speed stays the same, its velocity changes direction, so it accelerates inward.",
        },
        {
          title: "Example 3: Going Over a Hill",
          text: "As the coaster climbs, it slows down. Its acceleration points partly backward along the track.",
        },
      ],
    },
    {
      id: "interactive",
      label: "Interactive",
      title: "Interactive Website Ideas",
      body: [
        "A strong visualization for this unit is an animated coaster moving along a track with multiple overlays students can turn on and off.",
      ],
      bullets: [
        "Position vector",
        "Velocity vector",
        "Acceleration vector",
        "Speedometer",
        "Graph of position vs. time",
        "Graph of velocity vs. time",
        "Graph of acceleration vs. time",
      ],
      callout:
        "Students should be able to see that velocity is tangent to the track and acceleration does not always point in the direction of motion.",
    },
    {
      id: "practice",
      label: "Practice",
      title: "Practice Problems",
      problems: [
        {
          prompt:
            "A coaster moves from position x = 10 m to x = 70 m in 4 s. What is its average velocity?",
          choices: ["10 m/s", "15 m/s", "20 m/s", "60 m/s"],
          correctChoice: 1,
          correctExplanation:
            "Correct. Average velocity is Δx / Δt = (70 - 10) / 4 = 15 m/s.",
          incorrectExplanation:
            "Not quite. Use average velocity = displacement divided by time: (70 - 10) / 4 = 15 m/s.",
        },
        {
          prompt:
            "A coaster speeds up from 8 m/s to 28 m/s in 5 s. What is its average acceleration?",
          choices: ["2 m/s²", "4 m/s²", "5 m/s²", "7 m/s²"],
          correctChoice: 1,
          correctExplanation:
            "Correct. Average acceleration is Δv / Δt = (28 - 8) / 5 = 4 m/s².",
          incorrectExplanation:
            "Not quite. The change in velocity is 20 m/s, and 20 / 5 gives 4 m/s².",
        },
        {
          prompt:
            "A coaster moves at a constant speed of 20 m/s around a curve of radius 50 m. What is its centripetal acceleration?",
          choices: ["4 m/s²", "8 m/s²", "20 m/s²", "50 m/s²"],
          correctChoice: 1,
          correctExplanation:
            "Correct. Centripetal acceleration is ac = v² / r = 20² / 50 = 400 / 50 = 8 m/s².",
          incorrectExplanation:
            "Not quite. Square the speed first, then divide by the radius: 20² / 50 = 8 m/s².",
        },
        {
          prompt:
            "A coaster starts from rest and accelerates at 3 m/s² for 6 s. How far does it travel?",
          choices: ["27 m", "36 m", "54 m", "108 m"],
          correctChoice: 2,
          correctExplanation:
            "Correct. Using x = v₀t + ½at² gives x = 0 + ½(3)(6²) = 54 m.",
          incorrectExplanation:
            "Not quite. Start from x = v₀t + ½at². Since v₀ = 0, the distance is ½(3)(36) = 54 m.",
        },
      ],
    },
    {
      id: "quiz",
      label: "Quiz",
      title: "Section 1 Quiz",
      quiz: [
        {
          question: "A coaster moving in a circle at constant speed is:",
          choices: [
            "A. Not accelerating",
            "B. Accelerating because its direction changes",
            "C. Accelerating only if its speed increases",
            "D. Moving with zero velocity",
          ],
          correctChoice: 1,
          correctExplanation:
            "Correct. Even at constant speed, the coaster's velocity is changing because its direction changes, so it is accelerating.",
          incorrectExplanation:
            "Not quite. Circular motion still changes velocity direction, which means the coaster is accelerating inward.",
        },
        {
          question:
            "A coaster's velocity changes from 12 m/s to 30 m/s in 3 s. Its acceleration is:",
          choices: [
            "A. 4 m/s²",
            "B. 6 m/s²",
            "C. 10 m/s²",
            "D. 18 m/s²",
          ],
          correctChoice: 1,
          correctExplanation:
            "Correct. The acceleration is Δv / Δt = (30 - 12) / 3 = 18 / 3 = 6 m/s².",
          incorrectExplanation:
            "Not quite. Subtract the starting velocity from the ending velocity, then divide by time: (30 - 12) / 3 = 6 m/s².",
        },
        {
          question: "Speed is different from velocity because velocity includes:",
          choices: ["A. Mass", "B. Time", "C. Direction", "D. Force"],
          correctChoice: 2,
          correctExplanation:
            "Correct. Velocity includes both how fast something moves and the direction it moves in.",
          incorrectExplanation:
            "Not quite. Speed only tells how fast, while velocity includes direction too.",
        },
        {
          question:
            "A coaster moving at 15 m/s around a curve of radius 45 m has centripetal acceleration:",
          choices: [
            "A. 3 m/s²",
            "B. 5 m/s²",
            "C. 10 m/s²",
            "D. 20 m/s²",
          ],
          correctChoice: 1,
          correctExplanation:
            "Correct. Using a_c = v² / r gives 15² / 45 = 225 / 45 = 5 m/s².",
          incorrectExplanation:
            "Not quite. Use a_c = v² / r. That becomes 15² / 45 = 225 / 45 = 5 m/s².",
        },
      ],
    },
  ],
};

const MotionLessonView = ({
  isDark,
  panelClass,
  subtlePanelClass,
  titleClass,
  copyClass,
  mutedClass,
  accentLabelClass,
  accentNumberClass,
  listDotClass,
  warmDotClass,
  stepIndex,
  setStepIndex,
  onBack,
}) => {
  const step = motionLesson.steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === motionLesson.steps.length - 1;
  const [tocOpen, setTocOpen] = useState(true);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [selectedPracticeChoice, setSelectedPracticeChoice] = useState(null);
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizChoice, setSelectedQuizChoice] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);

  const currentPracticeProblem = step.problems?.[practiceIndex] ?? null;
  const practiceIsCorrect =
    currentPracticeProblem &&
    selectedPracticeChoice === currentPracticeProblem.correctChoice;
  const practiceComplete =
    step.id === "practice" &&
    practiceIndex === step.problems.length - 1 &&
    practiceChecked;
  const currentQuizQuestion = step.quiz?.[quizIndex] ?? null;
  const quizIsCorrect =
    currentQuizQuestion && selectedQuizChoice === currentQuizQuestion.correctChoice;
  const quizComplete =
    step.id === "quiz" && quizIndex === step.quiz.length - 1 && quizChecked;

  useEffect(() => {
    if (step.id !== "practice") {
      return;
    }

    setPracticeIndex(0);
    setSelectedPracticeChoice(null);
    setPracticeChecked(false);
  }, [step.id]);

  useEffect(() => {
    if (step.id !== "quiz") {
      return;
    }

    setQuizIndex(0);
    setSelectedQuizChoice(null);
    setQuizChecked(false);
  }, [step.id]);

  useEffect(() => {
    setSelectedPracticeChoice(null);
    setPracticeChecked(false);
  }, [practiceIndex]);

  useEffect(() => {
    setSelectedQuizChoice(null);
    setQuizChecked(false);
  }, [quizIndex]);

  const handlePracticeAdvance = () => {
    if (!currentPracticeProblem) {
      return;
    }

    if (!practiceChecked) {
      setPracticeChecked(true);
      return;
    }

    if (practiceIndex < step.problems.length - 1) {
      setPracticeIndex((current) => current + 1);
      return;
    }

    setStepIndex((current) =>
      Math.min(current + 1, motionLesson.steps.length - 1),
    );
  };

  const handleQuizAdvance = () => {
    if (!currentQuizQuestion) {
      return;
    }

    if (!quizChecked) {
      setQuizChecked(true);
      return;
    }

    if (quizIndex < step.quiz.length - 1) {
      setQuizIndex((current) => current + 1);
      return;
    }

    setStepIndex((current) =>
      Math.min(current + 1, motionLesson.steps.length - 1),
    );
  };

  return (
    <section className="py-8 sm:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
            isDark
              ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
              : "border-slate-300 bg-white/80 text-slate-900 hover:bg-white"
          }`}
        >
          Back to Sections
        </button>

        <div className={`text-sm font-semibold ${mutedClass}`}>
          Step {stepIndex + 1} of {motionLesson.steps.length}
        </div>
      </div>

      <div
        className={`mt-8 grid gap-4 ${
          tocOpen
            ? "lg:grid-cols-[22rem_minmax(0,1fr)]"
            : "lg:grid-cols-[4.75rem_minmax(0,1fr)]"
        }`}
      >
        <aside className={`${panelClass} p-4 sm:p-5`}>
          <div className={`flex ${tocOpen ? "items-start justify-between gap-4" : "flex-col items-center gap-4"}`}>
            <div className={tocOpen ? "" : "hidden"}>
              <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${accentLabelClass}`}>
                {motionLesson.title}
              </p>
              <h2 className={`mt-4 font-display text-3xl font-semibold ${titleClass}`}>
                {motionLesson.subtitle}
              </h2>
              <p className={`mt-4 text-base leading-7 ${copyClass}`}>{motionLesson.goal}</p>
            </div>
            <button
              type="button"
              onClick={() => setTocOpen((open) => !open)}
              className={`inline-flex items-center rounded-full border px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                isDark
                  ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  : "border-slate-300 bg-white/80 text-slate-900 hover:bg-white"
              }`}
            >
              {tocOpen ? "Collapse" : "Expand"}
            </button>
          </div>

          {tocOpen ? (
            <div className="mt-8 grid gap-3">
              {motionLesson.steps.map((item, index) => {
                const active = index === stepIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStepIndex(index)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      active
                        ? isDark
                          ? "border-cyan-300/40 bg-cyan-300/10"
                          : "border-sky-300 bg-sky-50"
                        : isDark
                          ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                          : "border-slate-300/70 bg-slate-50/70 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${accentNumberClass}`}
                      >
                        {index + 1}
                      </span>
                      <div>
                        <p className={`text-sm font-semibold ${titleClass}`}>{item.label}</p>
                        <p className={`text-sm ${mutedClass}`}>{item.title}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-2 flex flex-col items-center gap-3">
              {motionLesson.steps.map((item, index) => {
                const active = index === stepIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStepIndex(index)}
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-xs font-semibold transition ${
                      active
                        ? isDark
                          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                          : "border-sky-300 bg-sky-50 text-sky-700"
                        : isDark
                          ? "border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.07]"
                          : "border-slate-300/70 bg-slate-50/70 text-slate-700 hover:bg-white"
                    }`}
                    aria-label={`Go to ${item.title}`}
                    title={item.title}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          )}
        </aside>

        <article className={`${panelClass} p-7 sm:p-8`}>
          <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${accentLabelClass}`}>
            {step.label}
          </p>
          <h3 className={`mt-4 font-display text-3xl font-semibold ${titleClass}`}>
            {step.title}
          </h3>

          {step.body ? (
            <div className={`mt-6 space-y-4 text-lg leading-8 ${copyClass}`}>
              {step.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          ) : null}

          {step.callout ? (
            <div
              className={`mt-6 rounded-3xl border p-5 text-base leading-7 ${
                isDark
                  ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-50"
                  : "border-sky-200 bg-sky-50 text-sky-900"
              }`}
            >
              {step.callout}
            </div>
          ) : null}

          {step.bullets ? (
            <ul className={`mt-6 space-y-3 text-base leading-7 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              {step.bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className={`mt-2 h-2 w-2 rounded-full ${listDotClass}`} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {step.equations ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {step.equations.map((item) => (
                <div key={item.label} className={`rounded-3xl border p-5 ${subtlePanelClass}`}>
                  <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${mutedClass}`}>
                    {item.label}
                  </p>
                  <div
                    className={`mt-4 overflow-x-auto pb-2 font-display text-2xl font-semibold leading-[1.35] tracking-tight sm:text-3xl ${titleClass}`}
                  >
                    {item.expression}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {step.cards ? (
            <div className="mt-6 grid gap-4">
              {step.cards.map((card) => (
                <div key={card.title} className={`rounded-3xl border p-5 ${subtlePanelClass}`}>
                  <h4 className={`text-lg font-semibold ${titleClass}`}>{card.title}</h4>
                  <p className={`mt-3 text-base leading-7 ${copyClass}`}>{card.text}</p>
                </div>
              ))}
            </div>
          ) : null}

          {step.problems ? (
            <div className={`mt-6 rounded-3xl border p-6 ${subtlePanelClass}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentLabelClass}`}>
                    Practice Quiz
                  </p>
                  <h4 className={`mt-2 text-xl font-semibold ${titleClass}`}>
                    Question {practiceIndex + 1} of {step.problems.length}
                  </h4>
                </div>
                <div className={`text-sm font-semibold ${mutedClass}`}>
                  Answer each one before moving on
                </div>
              </div>

              <p className={`mt-6 text-base leading-7 ${copyClass}`}>
                {currentPracticeProblem.prompt}
              </p>

              <div className="mt-6 grid gap-3">
                {currentPracticeProblem.choices.map((choice, index) => {
                  const selected = selectedPracticeChoice === index;

                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => {
                        if (!practiceChecked) {
                          setSelectedPracticeChoice(index);
                        }
                      }}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        selected
                          ? isDark
                            ? "border-cyan-300/40 bg-cyan-300/10"
                            : "border-sky-300 bg-sky-50"
                          : isDark
                            ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                            : "border-slate-300/70 bg-white/70 hover:bg-white"
                      } ${practiceChecked ? "cursor-default" : ""}`}
                    >
                      <span className={`${isDark ? "text-slate-100" : "text-slate-800"}`}>
                        {choice}
                      </span>
                    </button>
                  );
                })}
              </div>

              {practiceChecked ? (
                <div
                  className={`mt-6 rounded-3xl border p-5 text-base leading-7 ${
                    practiceIsCorrect
                      ? isDark
                        ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-50"
                        : "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : isDark
                        ? "border-amber-300/20 bg-amber-300/10 text-amber-50"
                        : "border-amber-200 bg-amber-50 text-amber-900"
                  }`}
                >
                  <p className="font-semibold">
                    {practiceIsCorrect ? "Correct" : "Not quite"}
                  </p>
                  <p className="mt-2">
                    {practiceIsCorrect
                      ? currentPracticeProblem.correctExplanation
                      : currentPracticeProblem.incorrectExplanation}
                  </p>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handlePracticeAdvance}
                  disabled={selectedPracticeChoice === null}
                  className={`inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition ${
                    selectedPracticeChoice === null
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-cyan-200"
                  }`}
                >
                  {!practiceChecked
                    ? "Check Answer"
                    : practiceIndex < step.problems.length - 1
                      ? "Next Question"
                      : "Finish Practice"}
                </button>
              </div>
            </div>
          ) : null}

          {step.quiz ? (
            <div className={`mt-6 rounded-3xl border p-6 ${subtlePanelClass}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentLabelClass}`}>
                    Section Quiz
                  </p>
                  <h4 className={`mt-2 text-xl font-semibold ${titleClass}`}>
                    Question {quizIndex + 1} of {step.quiz.length}
                  </h4>
                </div>
                <div className={`text-sm font-semibold ${mutedClass}`}>
                  Answer each one before moving on
                </div>
              </div>

              <p className={`mt-6 text-base leading-7 ${copyClass}`}>
                {currentQuizQuestion.question}
              </p>

              <div className="mt-6 grid gap-3">
                {currentQuizQuestion.choices.map((choice, index) => {
                  const selected = selectedQuizChoice === index;

                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => {
                        if (!quizChecked) {
                          setSelectedQuizChoice(index);
                        }
                      }}
                      className={`rounded-2xl border px-4 py-4 text-left transition ${
                        selected
                          ? isDark
                            ? "border-cyan-300/40 bg-cyan-300/10"
                            : "border-sky-300 bg-sky-50"
                          : isDark
                            ? "border-white/10 bg-white/[0.03] hover:bg-white/[0.07]"
                            : "border-slate-300/70 bg-white/70 hover:bg-white"
                      } ${quizChecked ? "cursor-default" : ""}`}
                    >
                      <span className={`${isDark ? "text-slate-100" : "text-slate-800"}`}>
                        {choice}
                      </span>
                    </button>
                  );
                })}
              </div>

              {quizChecked ? (
                <div
                  className={`mt-6 rounded-3xl border p-5 text-base leading-7 ${
                    quizIsCorrect
                      ? isDark
                        ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-50"
                        : "border-emerald-200 bg-emerald-50 text-emerald-900"
                      : isDark
                        ? "border-amber-300/20 bg-amber-300/10 text-amber-50"
                        : "border-amber-200 bg-amber-50 text-amber-900"
                  }`}
                >
                  <p className="font-semibold">{quizIsCorrect ? "Correct" : "Not quite"}</p>
                  <p className="mt-2">
                    {quizIsCorrect
                      ? currentQuizQuestion.correctExplanation
                      : currentQuizQuestion.incorrectExplanation}
                  </p>
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleQuizAdvance}
                  disabled={selectedQuizChoice === null}
                  className={`inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition ${
                    selectedQuizChoice === null
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-cyan-200"
                  }`}
                >
                  {!quizChecked
                    ? "Check Answer"
                    : quizIndex < step.quiz.length - 1
                      ? "Next Question"
                      : "Finish Quiz"}
                </button>
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => setStepIndex((current) => Math.max(current - 1, 0))}
              disabled={isFirstStep}
              className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition ${
                isFirstStep
                  ? "cursor-not-allowed opacity-50"
                  : ""
              } ${
                isDark
                  ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  : "border-slate-300 bg-white/80 text-slate-900 hover:bg-white"
              }`}
            >
              Previous
            </button>
            <button
              type="button"
              onClick={() =>
                setStepIndex((current) =>
                  Math.min(current + 1, motionLesson.steps.length - 1),
                )
              }
              disabled={
                isLastStep ||
                (step.id === "practice" && !practiceComplete) ||
                (step.id === "quiz" && !quizComplete)
              }
              className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-slate-950 transition ${
                isLastStep ||
                (step.id === "practice" && !practiceComplete) ||
                (step.id === "quiz" && !quizComplete)
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-cyan-200"
              } bg-cyan-300`}
            >
              Next
            </button>
          </div>
        </article>
      </div>
    </section>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [theme, setTheme] = useState("dark");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [view, setView] = useState("overview");
  const [motionStepIndex, setMotionStepIndex] = useState(0);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("coasterphysics-theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("coasterphysics-theme", theme);
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [view]);

  const isDark = theme === "dark";
  const panelClass = isDark
    ? "panel border-white/10 bg-white/5"
    : "panel border-slate-300/70 bg-white/80 shadow-[0_24px_60px_rgba(148,163,184,0.16)]";
  const subtlePanelClass = isDark
    ? "border-white/10 bg-white/[0.04]"
    : "border-slate-300/70 bg-slate-50/90";
  const titleClass = isDark ? "text-white" : "text-slate-950";
  const copyClass = isDark ? "text-slate-300" : "text-slate-600";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";
  const accentLabelClass = isDark ? "text-cyan-200" : "text-sky-700";
  const accentNumberClass = isDark
    ? "bg-cyan-300/15 text-cyan-100"
    : "bg-sky-100 text-sky-700";
  const listDotClass = isDark ? "bg-cyan-300" : "bg-sky-500";
  const warmDotClass = isDark ? "bg-amber-300" : "bg-amber-500";

  const openMotionLesson = () => {
    setMotionStepIndex(0);
    setView("motion-lesson");
  };

  return (
    <main className="section-shell py-10 sm:py-12 lg:py-16">
      <div className="flex justify-end">
        <div className="relative">
          <button
            type="button"
            onClick={() => setSettingsOpen((open) => !open)}
            className={`inline-flex items-center gap-3 rounded-full border px-4 py-2.5 text-sm font-semibold transition ${
              isDark
                ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                : "border-slate-300 bg-white/80 text-slate-900 hover:bg-white"
            }`}
          >
            Settings
            <span className={`text-xs ${mutedClass}`}>
              {settingsOpen ? "Close" : "Open"}
            </span>
          </button>

          {settingsOpen ? (
            <div
              className={`absolute right-0 top-[calc(100%+0.75rem)] z-20 w-72 rounded-3xl border p-4 ${panelClass}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className={`text-sm font-semibold ${titleClass}`}>Appearance</p>
                  <p className={`mt-1 text-sm leading-6 ${copyClass}`}>
                    Switch between dark and light mode.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setTheme((currentTheme) =>
                      currentTheme === "dark" ? "light" : "dark",
                    )
                  }
                  className={`relative inline-flex h-8 w-16 items-center rounded-full transition ${
                    isDark ? "bg-cyan-300/80" : "bg-slate-300"
                  }`}
                  aria-label="Toggle light mode and dark mode"
                  aria-pressed={!isDark}
                >
                  <span
                    className={`inline-block h-6 w-6 rounded-full bg-white shadow-sm transition ${
                      isDark ? "translate-x-1" : "translate-x-9"
                    }`}
                  />
                </button>
              </div>

              <div
                className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${subtlePanelClass} ${copyClass}`}
              >
                Current mode:{" "}
                <span className={titleClass}>{isDark ? "Dark" : "Light"}</span>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {view === "motion-lesson" ? (
        <MotionLessonView
          isDark={isDark}
          panelClass={panelClass}
          subtlePanelClass={subtlePanelClass}
          titleClass={titleClass}
          copyClass={copyClass}
          mutedClass={mutedClass}
          accentLabelClass={accentLabelClass}
          accentNumberClass={accentNumberClass}
          listDotClass={listDotClass}
          warmDotClass={warmDotClass}
          stepIndex={motionStepIndex}
          setStepIndex={setMotionStepIndex}
          onBack={() => setView("overview")}
        />
      ) : (
        <>
          <section className="grid min-h-[72vh] items-center gap-10 lg:grid-cols-[minmax(0,52rem)_1fr]">
            <div className="max-w-4xl">
              <h1
                className={`font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-[6.5rem] lg:leading-[0.94] ${titleClass}`}
              >
                Learn Physics
                <br />
                Through Roller
                <br />
                Coasters
              </h1>

              <p className={`mt-8 max-w-4xl text-xl leading-[1.7] sm:text-2xl ${copyClass}`}>
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
              <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${accentLabelClass}`}>
                Learning Path
              </p>
              <h2
                className={`mt-4 font-display text-3xl font-semibold sm:text-4xl ${titleClass}`}
              >
                Select a Roller Coaster Physics Section
              </h2>
              <p className={`mt-4 max-w-3xl text-lg leading-8 ${copyClass}`}>
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
                      className={`${panelClass} p-5 text-left transition ${
                        isActive
                          ? isDark
                            ? "border-cyan-300/40 bg-cyan-300/10"
                            : "border-sky-300 bg-sky-50"
                          : isDark
                            ? "hover:border-white/15 hover:bg-white/[0.07]"
                            : "hover:border-slate-400 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <span
                          className={`mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${accentNumberClass}`}
                        >
                          {section.number}
                        </span>
                        <div>
                          <h3 className={`text-xl font-semibold ${titleClass}`}>
                            {section.title}
                          </h3>
                          <p
                            className={`mt-1 text-sm uppercase tracking-[0.16em] ${mutedClass}`}
                          >
                            {section.subtitle}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <article className={`${panelClass} p-7 sm:p-8`}>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold ${accentNumberClass}`}
                  >
                    {activeSection.number}
                  </span>
                  <div>
                    <p
                      className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentLabelClass}`}
                    >
                      Selected Section
                    </p>
                    <h3 className={`mt-1 text-2xl font-semibold sm:text-3xl ${titleClass}`}>
                      {activeSection.title}
                    </h3>
                  </div>
                </div>

                <p className={`mt-6 text-lg leading-8 ${copyClass}`}>
                  {activeSection.intro}
                </p>

                {activeSection.id === "motion" ? (
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={openMotionLesson}
                      className="inline-flex min-w-[16rem] items-center justify-center rounded-full bg-cyan-300 px-6 py-3.5 text-sm font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-cyan-200"
                    >
                      Start Begin
                    </button>
                  </div>
                ) : null}

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                  <div>
                    <h4
                      className={`text-sm font-semibold uppercase tracking-[0.18em] ${mutedClass}`}
                    >
                      Teach
                    </h4>
                    <ul className={`mt-4 space-y-3 text-base leading-7 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                      {activeSection.teach.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className={`mt-2 h-2 w-2 rounded-full ${listDotClass}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4
                      className={`text-sm font-semibold uppercase tracking-[0.18em] ${mutedClass}`}
                    >
                      Roller Coaster Connection
                    </h4>
                    <ul className={`mt-4 space-y-3 text-base leading-7 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                      {activeSection.coaster.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className={`mt-2 h-2 w-2 rounded-full ${warmDotClass}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {activeSection.highlights ? (
                  <div className={`mt-8 rounded-3xl border p-5 ${subtlePanelClass}`}>
                    <h4
                      className={`text-sm font-semibold uppercase tracking-[0.18em] ${mutedClass}`}
                    >
                      Key Coaster Examples
                    </h4>
                    <ul className={`mt-4 space-y-3 text-base leading-7 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
                      {activeSection.highlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {activeSection.note ? (
                  <div
                    className={`mt-8 rounded-3xl border p-5 text-base leading-7 ${
                      isDark
                        ? "border-cyan-300/20 bg-cyan-300/10 text-cyan-50"
                        : "border-sky-200 bg-sky-50 text-sky-900"
                    }`}
                  >
                    {activeSection.note}
                  </div>
                ) : null}
              </article>
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default App;
