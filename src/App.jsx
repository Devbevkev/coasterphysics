import { useEffect, useRef, useState } from "react";

const Fraction = ({ numerator, denominator }) => {
  return (
    <span className="inline-flex flex-col items-center align-middle leading-none">
      <span className="px-1">{numerator}</span>
      <span className="mt-1 w-full border-t border-current" />
      <span className="px-1 pt-1">{denominator}</span>
    </span>
  );
};

const Initial = ({ symbol }) => {
  return (
    <>
      {symbol}
      <sub>0</sub>
    </>
  );
};

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
              a<sub>avg</sub> = <Fraction numerator="Δv" denominator="Δt" />
            </>
          ),
        },
        {
          label: "Centripetal acceleration",
          expression: (
            <>
              a<sub>c</sub> = <Fraction numerator="v²" denominator="r" />
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
              v<sub>avg</sub> = <Fraction numerator="Δx" denominator="Δt" />
            </>
          ),
        },
        {
          label: "Average acceleration",
          expression: (
            <>
              a<sub>avg</sub> = <Fraction numerator="Δv" denominator="Δt" />
            </>
          ),
        },
        {
          label: "Constant-acceleration velocity",
          expression: (
            <>
              v = <Initial symbol="v" /> + at
            </>
          ),
        },
        {
          label: "Position with constant acceleration",
          expression: (
            <>
              x = <Initial symbol="x" /> + <Initial symbol="v" />
              t + ½at²
            </>
          ),
        },
        {
          label: "Velocity-position relation",
          expression: (
            <>
              v² = <Initial symbol="v" />² + 2aΔx
            </>
          ),
        },
        {
          label: "Curved motion",
          expression: (
            <>
              a<sub>c</sub> = <Fraction numerator="v²" denominator="r" />
            </>
          ),
        },
      ],
      body: [
        "These equations let students connect the coaster's motion to measurable changes in position, time, speed, and curvature.",
      ],
    },
    {
      id: "variables",
      label: "Variables",
      title: "What Each Variable Means",
      body: [
        "Before students use the equations confidently, they should know what each symbol stands for and what kind of quantity it represents.",
        "This keeps the formulas from feeling like random letters and helps students connect the math to the ride itself.",
      ],
      variables: [
        {
          symbol: "x",
          meaning: "position",
          note: "Where the coaster is along the track.",
        },
        {
          symbol: "Δx",
          meaning: "displacement",
          note: "The change in position from start to finish.",
        },
        {
          symbol: "t",
          meaning: "time",
          note: "How long the motion takes.",
        },
        {
          symbol: "Δt",
          meaning: "change in time",
          note: "The time interval being measured.",
        },
        {
          symbol: "v",
          meaning: "velocity",
          note: "How fast the coaster moves and in what direction.",
        },
        {
          symbol: "vavg",
          meaning: "average velocity",
          note: "The total displacement divided by total time.",
        },
        {
          symbol: "v0",
          meaning: "initial velocity",
          note: "The coaster's starting velocity before a motion segment begins.",
        },
        {
          symbol: "Δv",
          meaning: "change in velocity",
          note: "How much the velocity changes over time.",
        },
        {
          symbol: "a",
          meaning: "acceleration",
          note: "How quickly velocity changes.",
        },
        {
          symbol: "aavg",
          meaning: "average acceleration",
          note: "The total change in velocity divided by total time.",
        },
        {
          symbol: "ac",
          meaning: "centripetal acceleration",
          note: "The inward acceleration that changes the coaster's direction on a curve.",
        },
        {
          symbol: "r",
          meaning: "radius of curvature",
          note: "How tight the turn or curve is.",
        },
      ],
      callout:
        "A good habit is to pause before solving and label every symbol in the equation with its physical meaning.",
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

const forcesLesson = {
  title: "Section 2: Forces and Free-Body Diagrams",
  subtitle: "How the Track Pushes Back",
  goal:
    "Students learn how to identify the forces acting on a roller coaster and connect those forces to Newton's 2nd Law.",
  steps: [
    {
      id: "goal",
      label: "Goal",
      title: "What This Lesson Teaches",
      body: [
        "This lesson gives students the force language needed for the rest of coaster physics. Once they can identify forces clearly, later ideas like curves, g-forces, and braking become much easier to explain.",
      ],
      bullets: [
        "Gravity",
        "Normal force",
        "Friction",
        "Free-body diagrams",
        "Newton's 2nd Law",
        "Components of forces on slopes",
      ],
    },
    {
      id: "explanation",
      label: "Explain",
      title: "What Forces Act on a Coaster",
      body: [
        "A moving coaster is never just moving on its own. Gravity pulls it downward, the track pushes on it with a normal force, and friction and air resistance push against the motion.",
        "On a hill or drop, it helps to split gravity into components. One part acts along the track and changes the coaster's motion, while the other part presses the coaster into the track.",
      ],
      callout:
        "A free-body diagram should only show the real forces acting on the coaster, not the direction it happens to be moving.",
    },
    {
      id: "equations",
      label: "Equations",
      title: "Important Force Equations",
      equations: [
        {
          label: "Newton's 2nd Law",
          expression: <>ΣF = ma</>,
        },
        {
          label: "Weight",
          expression: <>F<sub>g</sub> = mg</>,
        },
        {
          label: "Parallel gravity component",
          expression: (
            <>
              F<sub>∥</sub> = mg sinθ
            </>
          ),
        },
        {
          label: "Perpendicular gravity component",
          expression: (
            <>
              F<sub>⊥</sub> = mg cosθ
            </>
          ),
        },
      ],
      body: [
        "These equations help students translate the shape of the track into a net force and then into acceleration.",
      ],
    },
    {
      id: "variables",
      label: "Variables",
      title: "What Each Variable Means",
      variables: [
        { symbol: "ΣF", meaning: "net force", note: "The total force after all forces are added together." },
        { symbol: "F", meaning: "force", note: "A push or pull on the coaster." },
        { symbol: "Fg", display: <>F<sub>g</sub></>, meaning: "weight", note: "The gravitational force on the coaster." },
        { symbol: "N", meaning: "normal force", note: "The push from the track on the coaster." },
        { symbol: "m", meaning: "mass", note: "How much matter the coaster has." },
        { symbol: "a", meaning: "acceleration", note: "How quickly the velocity changes." },
        { symbol: "θ", meaning: "track angle", note: "The angle of the slope compared with horizontal." },
        { symbol: "Fparallel", display: <>F<sub>∥</sub></>, meaning: "parallel force component", note: "The part of gravity acting along the track." },
        { symbol: "Fperp", display: <>F<sub>⊥</sub></>, meaning: "perpendicular force component", note: "The part of gravity pressing into the track." },
      ],
    },
    {
      id: "examples",
      label: "Examples",
      title: "Roller Coaster Examples",
      cards: [
        {
          title: "Example 1: Steep Drop",
          text: "On a steep drop, gravity has a large component along the track, so the coaster speeds up quickly.",
        },
        {
          title: "Example 2: Climbing a Hill",
          text: "As the coaster climbs, the gravity component along the track points backward, so the coaster slows down.",
        },
        {
          title: "Example 3: Brake Run",
          text: "At the end of the ride, friction and magnetic brakes create forces opposite the motion so the train can stop safely.",
        },
      ],
    },
    {
      id: "practice",
      label: "Practice",
      title: "Practice Problems",
      problems: [
        {
          prompt: "A 500 kg coaster has an acceleration of 2 m/s². What net force is required?",
          choices: ["250 N", "500 N", "1000 N", "2500 N"],
          correctChoice: 2,
          correctExplanation: "Correct. Using ΣF = ma gives 500 × 2 = 1000 N.",
          incorrectExplanation: "Not quite. Multiply mass by acceleration: 500 × 2 = 1000 N.",
        },
        {
          prompt: "What is the weight of a 600 kg coaster car on Earth?",
          choices: ["588 N", "980 N", "5880 N", "6000 N"],
          correctChoice: 2,
          correctExplanation: "Correct. Weight is mg = 600 × 9.8 = 5880 N.",
          incorrectExplanation: "Not quite. Use Fg = mg with g = 9.8 m/s², so 600 × 9.8 = 5880 N.",
        },
        {
          prompt: "A coaster is on a 30° slope. If its mass is 1000 kg, what is the gravity component along the track?",
          choices: ["2450 N", "4900 N", "9800 N", "16970 N"],
          correctChoice: 1,
          correctExplanation: "Correct. F∥ = mg sinθ = 1000 × 9.8 × 0.5 = 4900 N.",
          incorrectExplanation: "Not quite. Use the parallel component: mg sin30° = 1000 × 9.8 × 0.5 = 4900 N.",
        },
        {
          prompt: "If the net force on a coaster is zero, what happens to its motion?",
          choices: ["It must stop", "It must speed up", "Its velocity stays constant", "It turns automatically"],
          correctChoice: 2,
          correctExplanation: "Correct. Zero net force means zero acceleration, so the velocity stays constant.",
          incorrectExplanation: "Not quite. If ΣF = 0, then a = 0, which means the velocity stays constant.",
        },
      ],
    },
    {
      id: "quiz",
      label: "Quiz",
      title: "Section 2 Quiz",
      quiz: [
        {
          question: "The normal force on a coaster is best described as:",
          choices: [
            "A. The force pulling it forward",
            "B. The push of the track on the coaster",
            "C. The same thing as friction",
            "D. A force that only appears at the top of hills",
          ],
          correctChoice: 1,
          correctExplanation: "Correct. The normal force is the contact force from the track pushing on the coaster.",
          incorrectExplanation: "Not quite. The normal force is the support force from the track, not friction or a forward pull.",
        },
        {
          question: "A free-body diagram should include:",
          choices: [
            "A. Only real forces",
            "B. The direction of motion as a force",
            "C. Only the biggest force",
            "D. Arrows for speed and time",
          ],
          correctChoice: 0,
          correctExplanation: "Correct. A free-body diagram shows only real forces acting on the object.",
          incorrectExplanation: "Not quite. Free-body diagrams include only actual forces, not motion arrows or extra labels.",
        },
        {
          question: "On a downhill slope, the component of gravity along the track usually makes the coaster:",
          choices: ["A. Slow down", "B. Speed up", "C. Stop moving", "D. Lose all weight"],
          correctChoice: 1,
          correctExplanation: "Correct. The downhill gravity component points along the motion and tends to speed the coaster up.",
          incorrectExplanation: "Not quite. On a downhill slope, gravity has a component that pulls the coaster along the track and increases its speed.",
        },
        {
          question: "Newton's 2nd Law says acceleration depends on:",
          choices: [
            "A. Net force and mass",
            "B. Only speed",
            "C. Only direction",
            "D. Weight and distance only",
          ],
          correctChoice: 0,
          correctExplanation: "Correct. Newton's 2nd Law is ΣF = ma, so acceleration depends on net force and mass.",
          incorrectExplanation: "Not quite. Acceleration comes from the relationship ΣF = ma, which involves net force and mass.",
        },
      ],
    },
  ],
};

const energyLesson = {
  title: "Section 3: Energy",
  subtitle: "Drops, Hills, and Speed",
  goal:
    "Students learn how roller coasters exchange gravitational potential energy and kinetic energy throughout the ride.",
  steps: [
    {
      id: "goal",
      label: "Goal",
      title: "What This Lesson Teaches",
      body: [
        "Energy is one of the most intuitive ways to describe a roller coaster because riders can feel the difference between being high and being fast.",
      ],
      bullets: [
        "Gravitational potential energy",
        "Kinetic energy",
        "Conservation of mechanical energy",
        "Work-energy theorem",
        "Energy loss from friction",
        "Why later hills are lower than the first drop",
      ],
    },
    {
      id: "explanation",
      label: "Explain",
      title: "How Coasters Trade Height for Speed",
      body: [
        "At the top of the first hill, the coaster has a large amount of gravitational potential energy because it has been lifted high above the ground.",
        "As it drops, that stored energy changes into kinetic energy, which is why the train speeds up. Real coasters also lose some energy to friction and air resistance, so the total mechanical energy slowly decreases as the ride continues.",
      ],
      callout:
        "The first hill is usually the tallest because the coaster cannot regain all of the energy it loses later in the ride.",
    },
    {
      id: "equations",
      label: "Equations",
      title: "Important Energy Equations",
      equations: [
        {
          label: "Gravitational potential energy",
          expression: <>U<sub>g</sub> = mgh</>,
        },
        {
          label: "Kinetic energy",
          expression: <>K = ½mv²</>,
        },
        {
          label: "Mechanical energy",
          expression: (
            <>
              E<sub>mech</sub> = K + U<sub>g</sub>
            </>
          ),
        },
        {
          label: "Non-conservative work",
          expression: (
            <>
              W<sub>nc</sub> = ΔE<sub>mech</sub>
            </>
          ),
        },
      ],
      body: [
        "These equations show how a coaster's height, mass, and speed fit together in one energy story.",
      ],
    },
    {
      id: "variables",
      label: "Variables",
      title: "What Each Variable Means",
      variables: [
        { symbol: "Ug", display: <>U<sub>g</sub></>, meaning: "gravitational potential energy", note: "Stored energy due to height above the ground." },
        { symbol: "K", meaning: "kinetic energy", note: "Energy of motion." },
        { symbol: "Emech", display: <>E<sub>mech</sub></>, meaning: "mechanical energy", note: "The total of potential and kinetic energy." },
        { symbol: "Wnc", display: <>W<sub>nc</sub></>, meaning: "non-conservative work", note: "Energy added or removed by friction, drag, brakes, or launches." },
        { symbol: "m", meaning: "mass", note: "How much matter the coaster has." },
        { symbol: "g", meaning: "gravitational field strength", note: "On Earth this is about 9.8 m/s²." },
        { symbol: "h", meaning: "height", note: "Vertical height above a chosen reference point." },
        { symbol: "v", meaning: "speed", note: "How fast the coaster is moving." },
      ],
    },
    {
      id: "examples",
      label: "Examples",
      title: "Roller Coaster Examples",
      cards: [
        {
          title: "Example 1: Top of the Lift Hill",
          text: "At the top, the coaster has lots of potential energy and relatively little kinetic energy because it is high up and moving slowly.",
        },
        {
          title: "Example 2: Bottom of the First Drop",
          text: "Near the bottom, much of that potential energy has turned into kinetic energy, so the coaster is moving very fast.",
        },
        {
          title: "Example 3: Smaller Later Hills",
          text: "Friction and drag take away mechanical energy, which is why the coaster cannot usually climb back to its original height.",
        },
      ],
    },
    {
      id: "practice",
      label: "Practice",
      title: "Practice Problems",
      problems: [
        {
          prompt: "A 500 kg coaster is 20 m above the ground. What is its gravitational potential energy?",
          choices: ["9800 J", "49000 J", "98000 J", "196000 J"],
          correctChoice: 2,
          correctExplanation: "Correct. Ug = mgh = 500 × 9.8 × 20 = 98000 J.",
          incorrectExplanation: "Not quite. Multiply mass, gravity, and height: 500 × 9.8 × 20 = 98000 J.",
        },
        {
          prompt: "A 400 kg coaster car moves at 10 m/s. What is its kinetic energy?",
          choices: ["2000 J", "10000 J", "20000 J", "40000 J"],
          correctChoice: 2,
          correctExplanation: "Correct. K = ½mv² = ½ × 400 × 10² = 20000 J.",
          incorrectExplanation: "Not quite. Use K = ½mv². That gives 0.5 × 400 × 100 = 20000 J.",
        },
        {
          prompt: "If a coaster drops from rest and all potential energy becomes kinetic energy, what speed would it have after falling 25 m?",
          choices: ["15.7 m/s", "22.1 m/s", "35.0 m/s", "49.0 m/s"],
          correctChoice: 1,
          correctExplanation: "Correct. Using v = √(2gh) gives √(2 × 9.8 × 25) ≈ 22.1 m/s.",
          incorrectExplanation: "Not quite. Set mgh = ½mv² and solve for v. For 25 m, the speed is about 22.1 m/s.",
        },
        {
          prompt: "A coaster loses 15000 J of mechanical energy to friction. What happens to its later hills?",
          choices: ["They become taller", "They stay the same height", "They must be lower", "They disappear completely"],
          correctChoice: 2,
          correctExplanation: "Correct. Losing mechanical energy means the coaster cannot climb as high later in the ride.",
          incorrectExplanation: "Not quite. When friction removes energy, the coaster has less energy available to climb later hills, so they must be lower.",
        },
      ],
    },
    {
      id: "quiz",
      label: "Quiz",
      title: "Section 3 Quiz",
      quiz: [
        {
          question: "At the top of the first hill, a coaster usually has its greatest:",
          choices: ["A. Kinetic energy", "B. Gravitational potential energy", "C. Friction force", "D. Momentum change"],
          correctChoice: 1,
          correctExplanation: "Correct. At the top, the coaster is highest above the ground, so its gravitational potential energy is largest.",
          incorrectExplanation: "Not quite. The top of the hill is where height is greatest, so gravitational potential energy is largest there.",
        },
        {
          question: "As a coaster descends a hill, it usually:",
          choices: ["A. Loses kinetic energy", "B. Gains height", "C. Converts potential energy into kinetic energy", "D. Stops accelerating"],
          correctChoice: 2,
          correctExplanation: "Correct. On the drop, potential energy changes into kinetic energy, so speed increases.",
          incorrectExplanation: "Not quite. During a drop, stored height energy is changing into motion energy.",
        },
        {
          question: "Why are later hills usually shorter than the first hill?",
          choices: ["A. The track designer forgot", "B. The coaster loses energy to friction and drag", "C. Gravity gets weaker", "D. Mass disappears"],
          correctChoice: 1,
          correctExplanation: "Correct. Friction and drag remove mechanical energy from the system.",
          incorrectExplanation: "Not quite. The ride loses energy to friction and air resistance, so it cannot climb back to the same height.",
        },
        {
          question: "Mechanical energy is the sum of:",
          choices: ["A. Force and power", "B. Mass and acceleration", "C. Kinetic and potential energy", "D. Work and momentum"],
          correctChoice: 2,
          correctExplanation: "Correct. Mechanical energy combines kinetic energy and potential energy.",
          incorrectExplanation: "Not quite. In this context, mechanical energy means potential energy plus kinetic energy.",
        },
      ],
    },
  ],
};

const workLesson = {
  title: "Section 4: Work, Power, and Launch/Lift Hills",
  subtitle: "Where the Energy Comes From",
  goal:
    "Students learn how energy gets into the coaster in the first place and how work and power describe lifts, launches, and braking.",
  steps: [
    {
      id: "goal",
      label: "Goal",
      title: "What This Lesson Teaches",
      body: [
        "This lesson explains how a coaster gains energy before the ride and how different forces can add or remove energy during the trip.",
      ],
      bullets: [
        "Work",
        "Power",
        "Positive work",
        "Negative work",
        "Chain lifts",
        "Launch systems",
      ],
    },
    {
      id: "explanation",
      label: "Explain",
      title: "How Lifts, Launches, and Brakes Change Energy",
      body: [
        "Work happens when a force acts through a distance. In roller coasters, the chain lift or launch system does positive work to add energy to the train.",
        "Gravity can do positive work on a drop and negative work on an uphill section. Brakes and friction remove energy, so they do negative work on the coaster.",
      ],
      callout:
        "Power tells us how quickly work is done, which is why a fast launch needs much more power than a slow lift hill.",
    },
    {
      id: "equations",
      label: "Equations",
      title: "Important Work and Power Equations",
      equations: [
        {
          label: "Work by a constant force",
          expression: <>W = Fd cosθ</>,
        },
        {
          label: "Power",
          expression: (
            <>
              P = <Fraction numerator="W" denominator="Δt" />
            </>
          ),
        },
        {
          label: "Work-energy connection",
          expression: <>W<sub>net</sub> = ΔK</>,
        },
      ],
      body: [
        "These relationships connect applied forces, time, and changes in motion energy.",
      ],
    },
    {
      id: "variables",
      label: "Variables",
      title: "What Each Variable Means",
      variables: [
        { symbol: "W", meaning: "work", note: "Energy transferred by a force acting through a distance." },
        { symbol: "F", meaning: "force", note: "The push or pull doing the work." },
        { symbol: "d", meaning: "distance", note: "The distance over which the force acts." },
        { symbol: "θ", meaning: "angle", note: "The angle between the force and the direction of motion." },
        { symbol: "P", meaning: "power", note: "How quickly work is done." },
        { symbol: "Δt", meaning: "time interval", note: "The time over which the work is done." },
        { symbol: "Wnet", display: <>W<sub>net</sub></>, meaning: "net work", note: "The combined work done by all forces." },
        { symbol: "ΔK", meaning: "change in kinetic energy", note: "How much the motion energy changes." },
      ],
    },
    {
      id: "examples",
      label: "Examples",
      title: "Roller Coaster Examples",
      cards: [
        {
          title: "Example 1: Chain Lift",
          text: "The lift motor pulls the train uphill and does positive work, storing energy as height.",
        },
        {
          title: "Example 2: Launch Track",
          text: "A launch system gives the coaster a large amount of energy in a short time, which means high power.",
        },
        {
          title: "Example 3: Brake Run",
          text: "Brakes do negative work by removing kinetic energy from the train until it stops.",
        },
      ],
    },
    {
      id: "practice",
      label: "Practice",
      title: "Practice Problems",
      problems: [
        {
          prompt: "A 500 N force pulls a coaster 20 m in the same direction. How much work is done?",
          choices: ["1000 J", "5000 J", "10000 J", "20000 J"],
          correctChoice: 2,
          correctExplanation: "Correct. W = Fd = 500 × 20 = 10000 J.",
          incorrectExplanation: "Not quite. Since the force is in the direction of motion, use W = Fd = 500 × 20 = 10000 J.",
        },
        {
          prompt: "A chain lift does 12000 J of work in 6 s. What is its average power?",
          choices: ["500 W", "1200 W", "2000 W", "72000 W"],
          correctChoice: 2,
          correctExplanation: "Correct. P = W/Δt = 12000 / 6 = 2000 W.",
          incorrectExplanation: "Not quite. Divide the work by time: 12000 / 6 = 2000 W.",
        },
        {
          prompt: "A friction force of 200 N acts opposite the motion for 30 m. What work does friction do?",
          choices: ["6000 J", "-6000 J", "170 N", "-170 J"],
          correctChoice: 1,
          correctExplanation: "Correct. Opposite-direction work is negative, so W = -200 × 30 = -6000 J.",
          incorrectExplanation: "Not quite. Friction removes energy, so the work is negative: -200 × 30 = -6000 J.",
        },
        {
          prompt: "A launch system gives the coaster 90000 J of work in 3 s. What is the power?",
          choices: ["3000 W", "30000 W", "90000 W", "270000 W"],
          correctChoice: 1,
          correctExplanation: "Correct. P = 90000 / 3 = 30000 W.",
          incorrectExplanation: "Not quite. Divide work by time: 90000 / 3 = 30000 W.",
        },
      ],
    },
    {
      id: "quiz",
      label: "Quiz",
      title: "Section 4 Quiz",
      quiz: [
        {
          question: "The chain lift on a coaster mainly does what?",
          choices: ["A. Removes energy", "B. Adds energy", "C. Cancels gravity", "D. Eliminates friction"],
          correctChoice: 1,
          correctExplanation: "Correct. The chain lift does positive work and adds energy to the train.",
          incorrectExplanation: "Not quite. The lift hill adds energy by doing positive work on the coaster.",
        },
        {
          question: "If brakes slow a coaster down, the work done by the brakes is usually:",
          choices: ["A. Positive", "B. Negative", "C. Zero", "D. Infinite"],
          correctChoice: 1,
          correctExplanation: "Correct. Brakes remove kinetic energy, so they do negative work.",
          incorrectExplanation: "Not quite. Slowing the coaster means the brakes remove energy, so their work is negative.",
        },
        {
          question: "Power measures:",
          choices: [
            "A. How much mass an object has",
            "B. How quickly work is done",
            "C. The total distance traveled",
            "D. The direction of force only",
          ],
          correctChoice: 1,
          correctExplanation: "Correct. Power is the rate of doing work.",
          incorrectExplanation: "Not quite. Power tells how fast work is done, not just how much work there is.",
        },
        {
          question: "A faster launch usually requires:",
          choices: ["A. Less power", "B. More power", "C. Zero work", "D. Less energy always"],
          correctChoice: 1,
          correctExplanation: "Correct. Doing a large amount of work in a short time means high power.",
          incorrectExplanation: "Not quite. A fast launch means a lot of work must be done quickly, which requires more power.",
        },
      ],
    },
  ],
};

const curvedMotionLesson = {
  title: "Section 5: Curved Motion",
  subtitle: "Loops, Hills, and Turns",
  goal:
    "Students learn how curved motion requires inward acceleration and how radial force equations explain hills, dips, and loops.",
  steps: [
    {
      id: "goal",
      label: "Goal",
      title: "What This Lesson Teaches",
      body: [
        "This lesson connects circular-motion math to the sensations riders feel in valleys, on crests, and inside loops.",
      ],
      bullets: [
        "Centripetal acceleration",
        "Radial force equations",
        "Hill crests",
        "Valleys",
        "Vertical loops",
        "Minimum speed at the top of a loop",
      ],
    },
    {
      id: "explanation",
      label: "Explain",
      title: "Why Curved Motion Needs an Inward Force",
      body: [
        "Whenever the coaster turns, rises over a crest, or dives through a valley, its velocity direction changes. That means it needs a centripetal acceleration pointing inward toward the center of curvature.",
        "The net inward force is what creates that acceleration. Depending on where the coaster is, gravity and the normal force can either work together or oppose each other.",
      ],
      callout:
        "At the bottom of a dip, the inward direction points upward. At the top of a hill, the inward direction points downward.",
    },
    {
      id: "equations",
      label: "Equations",
      title: "Important Curved-Motion Equations",
      equations: [
        {
          label: "Centripetal acceleration",
          expression: (
            <>
              a<sub>c</sub> = <Fraction numerator="v²" denominator="r" />
            </>
          ),
        },
        {
          label: "Radial net force",
          expression: (
            <>
              ΣF<sub>rad</sub> = m
              <Fraction numerator="v²" denominator="r" />
            </>
          ),
        },
        {
          label: "Top of a hill",
          expression: (
            <>
              mg - N = m
              <Fraction numerator="v²" denominator="r" />
            </>
          ),
        },
        {
          label: "Bottom of a dip",
          expression: (
            <>
              N - mg = m
              <Fraction numerator="v²" denominator="r" />
            </>
          ),
        },
      ],
    },
    {
      id: "variables",
      label: "Variables",
      title: "What Each Variable Means",
      variables: [
        { symbol: "ac", display: <>a<sub>c</sub></>, meaning: "centripetal acceleration", note: "The inward acceleration needed for curved motion." },
        { symbol: "ΣFrad", display: <>ΣF<sub>rad</sub></>, meaning: "net radial force", note: "The total inward force toward the center of curvature." },
        { symbol: "v", meaning: "speed", note: "How fast the coaster is moving along the track." },
        { symbol: "r", meaning: "radius of curvature", note: "How tight the hill, dip, or loop is." },
        { symbol: "N", meaning: "normal force", note: "The force from the track on the coaster." },
        { symbol: "m", meaning: "mass", note: "The mass of the coaster." },
        { symbol: "g", meaning: "gravity", note: "The gravitational field strength near Earth." },
      ],
    },
    {
      id: "examples",
      label: "Examples",
      title: "Roller Coaster Examples",
      cards: [
        {
          title: "Example 1: Bottom of a Valley",
          text: "At the bottom, the inward direction points up, so the normal force must usually be larger than weight.",
        },
        {
          title: "Example 2: Crest of a Hill",
          text: "At the top, the inward direction points down, so the normal force is smaller and riders often feel light.",
        },
        {
          title: "Example 3: Vertical Loop",
          text: "In a loop, the inward direction keeps changing, and the force balance changes all the way around the track.",
        },
      ],
    },
    {
      id: "practice",
      label: "Practice",
      title: "Practice Problems",
      problems: [
        {
          prompt: "A coaster moves at 18 m/s around a curve of radius 36 m. What is its centripetal acceleration?",
          choices: ["4.5 m/s²", "9 m/s²", "18 m/s²", "36 m/s²"],
          correctChoice: 1,
          correctExplanation: "Correct. a_c = v²/r = 18²/36 = 324/36 = 9 m/s².",
          incorrectExplanation: "Not quite. Square the speed and divide by the radius: 18² / 36 = 9 m/s².",
        },
        {
          prompt: "A 500 kg coaster moves at 20 m/s through the bottom of a dip with radius 40 m. What normal force does the track exert?",
          choices: ["4900 N", "7500 N", "9900 N", "14900 N"],
          correctChoice: 2,
          correctExplanation: "Correct. At the bottom, N - mg = mv²/r, so N = 4900 + 5000 = 9900 N.",
          incorrectExplanation: "Not quite. Compute mv²/r = 5000 N, then add weight because the normal force must also support the train: 4900 + 5000 = 9900 N.",
        },
        {
          prompt: "A 400 kg coaster moves at 16 m/s over the top of a hill with radius 32 m. What is the normal force?",
          choices: ["720 N", "3920 N", "6400 N", "7120 N"],
          correctChoice: 0,
          correctExplanation: "Correct. At the top, mg - N = mv²/r, so N = 3920 - 3200 = 720 N.",
          incorrectExplanation: "Not quite. First compute weight 3920 N and inward requirement 3200 N. Then solve mg - N = 3200, so N = 720 N.",
        },
        {
          prompt: "What is the minimum speed needed at the top of a loop of radius 10 m if the normal force is zero there?",
          choices: ["7.0 m/s", "9.9 m/s", "14.0 m/s", "31.3 m/s"],
          correctChoice: 1,
          correctExplanation: "Correct. If N = 0 at the top, then mg = mv²/r, so v = √(rg) = √(10 × 9.8) ≈ 9.9 m/s.",
          incorrectExplanation: "Not quite. Set the normal force to zero at the top, then solve v = √(rg). For r = 10 m, that is about 9.9 m/s.",
        },
      ],
    },
    {
      id: "quiz",
      label: "Quiz",
      title: "Section 5 Quiz",
      quiz: [
        {
          question: "Centripetal acceleration always points:",
          choices: ["A. Forward", "B. Backward", "C. Toward the center of curvature", "D. Straight up"],
          correctChoice: 2,
          correctExplanation: "Correct. Centripetal acceleration always points inward toward the center of curvature.",
          incorrectExplanation: "Not quite. The defining feature of centripetal acceleration is that it points toward the center of the turn.",
        },
        {
          question: "Riders usually feel heaviest:",
          choices: ["A. At the bottom of a dip", "B. At the top of a hill", "C. In the station", "D. At zero speed only"],
          correctChoice: 0,
          correctExplanation: "Correct. At the bottom of a dip, the normal force is often largest, so riders feel heaviest.",
          incorrectExplanation: "Not quite. The bottom of a dip usually has the largest normal force, which produces the heaviest feeling.",
        },
        {
          question: "At the top of a hill, the normal force is often smaller because:",
          choices: [
            "A. Gravity disappears",
            "B. Gravity helps provide the inward acceleration",
            "C. The coaster has no mass",
            "D. Speed must be zero there",
          ],
          correctChoice: 1,
          correctExplanation: "Correct. At the top, gravity already points inward, so the track does not need to push as hard.",
          incorrectExplanation: "Not quite. At the top of a hill, gravity already contributes to the inward force requirement.",
        },
        {
          question: "The minimum-speed condition at the top of a loop happens when:",
          choices: ["A. N is maximum", "B. N is zero", "C. g is zero", "D. r is infinite"],
          correctChoice: 1,
          correctExplanation: "Correct. The minimum speed occurs when the normal force just drops to zero at the top of the loop.",
          incorrectExplanation: "Not quite. The threshold for maintaining contact at the top is when the track no longer needs to push, so N = 0.",
        },
      ],
    },
  ],
};

const gForcesLesson = {
  title: "Section 6: Apparent Weight, Normal Force, and G-Forces",
  subtitle: "What Riders Actually Feel",
  goal:
    "Students learn how the normal force connects the math of coaster motion to the heavy, light, and airtime sensations riders feel.",
  steps: [
    {
      id: "goal",
      label: "Goal",
      title: "What This Lesson Teaches",
      body: [
        "This lesson turns the force equations into rider experience by showing how the seat's push changes how heavy or light a rider feels.",
      ],
      bullets: [
        "Normal force as felt weight",
        "Apparent weight",
        "Weightlessness",
        "Airtime",
        "Positive g's",
        "Low, zero, and negative g's",
      ],
    },
    {
      id: "explanation",
      label: "Explain",
      title: "Why Riders Feel Heavy or Light",
      body: [
        "A rider's true weight is mg, but what the rider actually feels is the normal force from the seat or restraint system. That is why normal force is often called apparent weight or felt weight.",
        "Large normal force makes riders feel heavy. Small normal force makes them feel light. If the normal force drops to zero, the rider feels weightless and experiences airtime.",
      ],
      callout:
        "G-force is often described as the normal force divided by ordinary weight, so 2 g means the seat is pushing with twice the rider's normal weight.",
    },
    {
      id: "equations",
      label: "Equations",
      title: "Important G-Force Equations",
      equations: [
        {
          label: "Apparent weight",
          expression: <>W<sub>app</sub> = N</>,
        },
        {
          label: "G-force",
          expression: (
            <>
              g-force = <Fraction numerator="N" denominator="mg" />
            </>
          ),
        },
        {
          label: "Weightlessness condition",
          expression: <>N = 0</>,
        },
      ],
    },
    {
      id: "variables",
      label: "Variables",
      title: "What Each Variable Means",
      variables: [
        { symbol: "N", meaning: "normal force", note: "The push from the seat or track on the rider or train." },
        { symbol: "Wapp", display: <>W<sub>app</sub></>, meaning: "apparent weight", note: "The weight the rider feels." },
        { symbol: "m", meaning: "mass", note: "The rider's or train's mass." },
        { symbol: "g", meaning: "gravitational field strength", note: "The usual downward pull of gravity near Earth." },
      ],
    },
    {
      id: "examples",
      label: "Examples",
      title: "Roller Coaster Examples",
      cards: [
        {
          title: "Example 1: Bottom of a Drop",
          text: "The seat pushes hard on the rider, so the rider feels heavy and experiences positive g's.",
        },
        {
          title: "Example 2: Crest of an Airtime Hill",
          text: "The normal force drops, so the rider feels light and may even float slightly against the restraint.",
        },
        {
          title: "Example 3: Strong Airtime Moment",
          text: "If the normal force reaches zero, the rider feels weightless for that moment.",
        },
      ],
    },
    {
      id: "practice",
      label: "Practice",
      title: "Practice Problems",
      problems: [
        {
          prompt: "A 60 kg rider experiences a normal force of 1200 N at the bottom of a drop. What g-force is this?",
          choices: ["1.0 g", "1.5 g", "2.0 g", "3.4 g"],
          correctChoice: 2,
          correctExplanation: "Correct. g-force = N/(mg) = 1200/(60 × 9.8) ≈ 2.04, or about 2.0 g.",
          incorrectExplanation: "Not quite. Divide the normal force by ordinary weight: 1200 / 588 ≈ 2.0 g.",
        },
        {
          prompt: "If the normal force on a rider is zero at the top of a hill, the rider feels:",
          choices: ["Heavy", "Normal weight", "Weightless", "Pulled downward twice as hard"],
          correctChoice: 2,
          correctExplanation: "Correct. N = 0 means the rider feels weightless.",
          incorrectExplanation: "Not quite. Apparent weight equals the normal force, so N = 0 means weightlessness.",
        },
        {
          prompt: "A 50 kg rider experiences a normal force of 245 N at the top of a hill. About how many g's is that?",
          choices: ["0.5 g", "1.0 g", "2.0 g", "4.9 g"],
          correctChoice: 0,
          correctExplanation: "Correct. The rider's weight is 490 N, so 245/490 = 0.5 g.",
          incorrectExplanation: "Not quite. Compare the normal force to ordinary weight: 245 / 490 = 0.5 g.",
        },
        {
          prompt: "What kind of force mostly determines how heavy or light a rider feels on a coaster?",
          choices: ["Gravity only", "Normal force", "Momentum only", "Time only"],
          correctChoice: 1,
          correctExplanation: "Correct. The rider's felt weight is set by the normal force.",
          incorrectExplanation: "Not quite. The feeling of heaviness or lightness comes from the normal force from the seat or restraint.",
        },
      ],
    },
    {
      id: "quiz",
      label: "Quiz",
      title: "Section 6 Quiz",
      quiz: [
        {
          question: "A rider feels heavy when:",
          choices: ["A. The normal force is small", "B. The normal force is large", "C. Gravity stops acting", "D. Speed is zero"],
          correctChoice: 1,
          correctExplanation: "Correct. A large normal force means the seat pushes harder, so the rider feels heavy.",
          incorrectExplanation: "Not quite. Feeling heavy comes from a large normal force, not from gravity changing.",
        },
        {
          question: "Airtime is most closely associated with:",
          choices: ["A. N = 0", "B. N = mg exactly", "C. Zero velocity", "D. Zero mass"],
          correctChoice: 0,
          correctExplanation: "Correct. Airtime happens when the normal force drops to zero or near zero.",
          incorrectExplanation: "Not quite. Airtime is tied to the normal force falling to zero or almost zero.",
        },
        {
          question: "G-force is best thought of as:",
          choices: [
            "A. Apparent weight compared with ordinary weight",
            "B. The same as mass",
            "C. The same as distance",
            "D. A special type of friction",
          ],
          correctChoice: 0,
          correctExplanation: "Correct. G-force compares the normal force to the rider's ordinary weight mg.",
          incorrectExplanation: "Not quite. G-force tells how strong the seat's push is compared with normal everyday weight.",
        },
        {
          question: "At the top of a hill, riders often feel light because:",
          choices: [
            "A. Their mass is smaller",
            "B. The normal force is reduced",
            "C. Gravity turns off",
            "D. The train stops moving",
          ],
          correctChoice: 1,
          correctExplanation: "Correct. The normal force is smaller at the crest, so riders feel lighter.",
          incorrectExplanation: "Not quite. The light feeling comes from the seat pushing less, which means a smaller normal force.",
        },
      ],
    },
  ],
};

const momentumLesson = {
  title: "Section 7: Momentum, Impulse, and Braking",
  subtitle: "How the Ride Comes to a Stop",
  goal:
    "Students learn how momentum changes during braking and why longer stopping times reduce the average force on the coaster.",
  steps: [
    {
      id: "goal",
      label: "Goal",
      title: "What This Lesson Teaches",
      body: [
        "This lesson focuses on what happens near the end of the ride, when the coaster must safely reduce its momentum and come to rest.",
      ],
      bullets: [
        "Momentum",
        "Impulse",
        "Average braking force",
        "Stopping time",
        "Stopping distance",
        "Why gradual braking is safer",
      ],
    },
    {
      id: "explanation",
      label: "Explain",
      title: "Why Gentle Braking Matters",
      body: [
        "Momentum depends on mass and velocity, so a fast coaster carries a lot of momentum into the brake run. To stop it, the brakes must create an impulse that changes that momentum to zero.",
        "If the same momentum change happens over a longer time, the average stopping force is smaller. That is why gradual braking is safer and more comfortable than an abrupt stop.",
      ],
      callout:
        "Impulse is the force-times-time idea that explains why a longer stop feels softer even when the coaster begins with the same speed.",
    },
    {
      id: "equations",
      label: "Equations",
      title: "Important Momentum Equations",
      equations: [
        {
          label: "Momentum",
          expression: <>p = mv</>,
        },
        {
          label: "Impulse",
          expression: <>J = Δp</>,
        },
        {
          label: "Average-force form",
          expression: (
            <>
              F<sub>avg</sub> = <Fraction numerator="Δp" denominator="Δt" />
            </>
          ),
        },
      ],
    },
    {
      id: "variables",
      label: "Variables",
      title: "What Each Variable Means",
      variables: [
        { symbol: "p", meaning: "momentum", note: "How hard it is to stop the moving coaster." },
        { symbol: "m", meaning: "mass", note: "The coaster's mass." },
        { symbol: "v", meaning: "velocity", note: "The coaster's speed and direction." },
        { symbol: "J", meaning: "impulse", note: "The total effect of a force over time." },
        { symbol: "Δp", meaning: "change in momentum", note: "How much the momentum changes during braking." },
        { symbol: "Favg", display: <>F<sub>avg</sub></>, meaning: "average force", note: "The average braking force during the stop." },
        { symbol: "Δt", meaning: "stopping time", note: "How long the momentum change takes." },
      ],
    },
    {
      id: "examples",
      label: "Examples",
      title: "Roller Coaster Examples",
      cards: [
        {
          title: "Example 1: Final Brake Run",
          text: "Magnetic or friction brakes reduce the train's momentum until it reaches zero in the station or transfer area.",
        },
        {
          title: "Example 2: Long Gentle Stop",
          text: "If the stop takes more time, the same momentum change is spread out and the average force is smaller.",
        },
        {
          title: "Example 3: Emergency Stop",
          text: "A short stopping time creates a larger average force, which is why emergency braking feels harsher.",
        },
      ],
    },
    {
      id: "practice",
      label: "Practice",
      title: "Practice Problems",
      problems: [
        {
          prompt: "A 500 kg coaster moves at 12 m/s. What is its momentum?",
          choices: ["600 N·s", "6000 kg·m/s", "12000 kg·m/s", "24000 kg·m/s"],
          correctChoice: 1,
          correctExplanation: "Correct. p = mv = 500 × 12 = 6000 kg·m/s.",
          incorrectExplanation: "Not quite. Multiply mass by velocity: 500 × 12 = 6000 kg·m/s.",
        },
        {
          prompt: "If that coaster stops in 4 s, what is the magnitude of the average braking force?",
          choices: ["375 N", "750 N", "1500 N", "6000 N"],
          correctChoice: 2,
          correctExplanation: "Correct. F_avg = Δp/Δt = 6000/4 = 1500 N.",
          incorrectExplanation: "Not quite. Divide the momentum change by time: 6000 / 4 = 1500 N.",
        },
        {
          prompt: "If the same coaster stops in 2 s instead of 4 s, what happens to the average braking force?",
          choices: ["It is cut in half", "It stays the same", "It doubles", "It becomes zero"],
          correctChoice: 2,
          correctExplanation: "Correct. The same Δp in half the time means twice the average force.",
          incorrectExplanation: "Not quite. When the stopping time is shorter but the momentum change is the same, the average force gets larger.",
        },
        {
          prompt: "A brake system applies an average force of 2000 N for 3 s. What impulse does it deliver?",
          choices: ["600 J", "2000 N·s", "6000 N·s", "9000 N·s"],
          correctChoice: 2,
          correctExplanation: "Correct. Impulse is force times time: 2000 × 3 = 6000 N·s.",
          incorrectExplanation: "Not quite. Multiply force by time: 2000 × 3 = 6000 N·s.",
        },
      ],
    },
    {
      id: "quiz",
      label: "Quiz",
      title: "Section 7 Quiz",
      quiz: [
        {
          question: "If a coaster's stopping time increases while the momentum change stays the same, the average force:",
          choices: ["A. Increases", "B. Decreases", "C. Stays undefined", "D. Becomes equal to mass"],
          correctChoice: 1,
          correctExplanation: "Correct. A longer stopping time means the same momentum change is spread out, so the average force is smaller.",
          incorrectExplanation: "Not quite. With the same Δp, increasing Δt lowers the average force.",
        },
        {
          question: "Impulse is equal to:",
          choices: ["A. Mass times speed", "B. Change in momentum", "C. Force times distance only", "D. Energy divided by time"],
          correctChoice: 1,
          correctExplanation: "Correct. Impulse is the change in momentum.",
          incorrectExplanation: "Not quite. The central definition is J = Δp.",
        },
        {
          question: "Why are gradual brake runs usually safer?",
          choices: [
            "A. They remove mass",
            "B. They reduce the average stopping force",
            "C. They eliminate momentum instantly",
            "D. They make gravity weaker",
          ],
          correctChoice: 1,
          correctExplanation: "Correct. Spreading the stop over more time lowers the average force.",
          incorrectExplanation: "Not quite. More stopping time means less average force for the same momentum change.",
        },
        {
          question: "Momentum depends on:",
          choices: ["A. Mass and velocity", "B. Height and time", "C. Force and angle", "D. Radius and gravity"],
          correctChoice: 0,
          correctExplanation: "Correct. Momentum is p = mv, so it depends on mass and velocity.",
          incorrectExplanation: "Not quite. Momentum is defined as mass times velocity.",
        },
      ],
    },
  ],
};

const rotationLesson = {
  title: "Section 8: Rotation, Torque, and Stability",
  subtitle: "Advanced Mechanics on the Ride",
  goal:
    "Students learn how rotational motion, torque, and stability matter in coaster wheels, supports, trains, and turns.",
  steps: [
    {
      id: "goal",
      label: "Goal",
      title: "What This Lesson Teaches",
      body: [
        "This final mechanics section extends the coaster story into rotational ideas that help explain wheel systems, train balance, and structural response.",
      ],
      bullets: [
        "Torque",
        "Rotational inertia",
        "Angular velocity",
        "Rotational kinetic energy",
        "Center of mass",
        "Stability in turns and hills",
      ],
    },
    {
      id: "explanation",
      label: "Explain",
      title: "Why Rotation Matters on a Coaster",
      body: [
        "Coaster wheels rotate as the train moves, so part of the system's energy is rotational. Forces can also create torque on cars, restraints, and support structures.",
        "The center of mass affects how a train behaves over hills and through turns. Designers care about stability so the train and track system handle those forces smoothly and safely.",
      ],
      callout:
        "Rotation shows up even when the train seems to be moving forward in a straight line, because the wheels and axles are constantly turning.",
    },
    {
      id: "equations",
      label: "Equations",
      title: "Important Rotation Equations",
      equations: [
        {
          label: "Torque",
          expression: <>τ = rF sinθ</>,
        },
        {
          label: "Angular velocity",
          expression: (
            <>
              ω = <Fraction numerator="Δθ" denominator="Δt" />
            </>
          ),
        },
        {
          label: "Rotational kinetic energy",
          expression: (
            <>
              K<sub>rot</sub> = ½Iω²
            </>
          ),
        },
      ],
    },
    {
      id: "variables",
      label: "Variables",
      title: "What Each Variable Means",
      variables: [
        { symbol: "τ", meaning: "torque", note: "A turning effect caused by a force." },
        { symbol: "r", meaning: "lever arm", note: "The distance from the pivot to where the force is applied." },
        { symbol: "F", meaning: "force", note: "The push or pull creating the torque." },
        { symbol: "θ", meaning: "angle", note: "The angle between the force and the lever arm." },
        { symbol: "ω", meaning: "angular velocity", note: "How quickly something rotates." },
        { symbol: "Δθ", meaning: "change in angle", note: "The angular displacement." },
        { symbol: "I", meaning: "rotational inertia", note: "How hard it is to change an object's rotational motion." },
        { symbol: "Krot", display: <>K<sub>rot</sub></>, meaning: "rotational kinetic energy", note: "Energy stored in spinning motion." },
      ],
    },
    {
      id: "examples",
      label: "Examples",
      title: "Roller Coaster Examples",
      cards: [
        {
          title: "Example 1: Wheel Rotation",
          text: "As the train moves, the wheels rotate, so some energy is in spinning motion as well as forward motion.",
        },
        {
          title: "Example 2: Support Loads",
          text: "Track forces create torques on support structures, which engineers must account for in the design.",
        },
        {
          title: "Example 3: Center of Mass in a Turn",
          text: "The train's center of mass matters for stability, especially when a long train enters or leaves a hill or turn.",
        },
      ],
    },
    {
      id: "practice",
      label: "Practice",
      title: "Practice Problems",
      problems: [
        {
          prompt: "What torque is produced by a 50 N force applied 2 m from a pivot at 90°?",
          choices: ["25 N·m", "50 N·m", "100 N·m", "200 N·m"],
          correctChoice: 2,
          correctExplanation: "Correct. τ = rF sinθ = 2 × 50 × 1 = 100 N·m.",
          incorrectExplanation: "Not quite. At 90°, sinθ = 1, so τ = 2 × 50 = 100 N·m.",
        },
        {
          prompt: "If a wheel rotates through 12 rad in 3 s, what is its angular velocity?",
          choices: ["2 rad/s", "4 rad/s", "6 rad/s", "36 rad/s"],
          correctChoice: 1,
          correctExplanation: "Correct. ω = Δθ/Δt = 12/3 = 4 rad/s.",
          incorrectExplanation: "Not quite. Divide angle by time: 12 / 3 = 4 rad/s.",
        },
        {
          prompt: "A rotating component has I = 10 kg·m² and ω = 6 rad/s. What is its rotational kinetic energy?",
          choices: ["90 J", "180 J", "360 J", "720 J"],
          correctChoice: 1,
          correctExplanation: "Correct. Krot = ½Iω² = 0.5 × 10 × 36 = 180 J.",
          incorrectExplanation: "Not quite. Square the angular velocity first, then multiply: 0.5 × 10 × 36 = 180 J.",
        },
        {
          prompt: "If rotational inertia increases, what happens to how easily an object can change its rotation?",
          choices: ["It changes more easily", "It becomes harder to change", "Nothing changes", "It stops having torque"],
          correctChoice: 1,
          correctExplanation: "Correct. Larger rotational inertia means more resistance to changes in rotational motion.",
          incorrectExplanation: "Not quite. A larger rotational inertia means it is harder to speed up, slow down, or redirect rotation.",
        },
      ],
    },
    {
      id: "quiz",
      label: "Quiz",
      title: "Section 8 Quiz",
      quiz: [
        {
          question: "Torque is best described as:",
          choices: [
            "A. A straight-line push only",
            "B. A turning effect caused by a force",
            "C. The same as momentum",
            "D. Energy with no direction",
          ],
          correctChoice: 1,
          correctExplanation: "Correct. Torque measures how strongly a force tends to rotate something.",
          incorrectExplanation: "Not quite. Torque is the rotational effect of a force.",
        },
        {
          question: "Rotational inertia tells you:",
          choices: [
            "A. How hard it is to change rotation",
            "B. How much gravity there is",
            "C. How fast the coaster must move",
            "D. How tall the track is",
          ],
          correctChoice: 0,
          correctExplanation: "Correct. Rotational inertia is the rotational version of resistance to acceleration.",
          incorrectExplanation: "Not quite. Rotational inertia measures resistance to changes in rotational motion.",
        },
        {
          question: "A train's center of mass matters because it affects:",
          choices: ["A. Only the paint color", "B. Stability and balance", "C. The existence of gravity", "D. Whether wheels rotate"],
          correctChoice: 1,
          correctExplanation: "Correct. Center of mass influences how balanced and stable the train is on hills and turns.",
          incorrectExplanation: "Not quite. The center of mass matters because it affects balance, stability, and how forces act on the train.",
        },
        {
          question: "Wheels on a coaster show that:",
          choices: [
            "A. Motion is only translational",
            "B. Rotation can happen along with forward motion",
            "C. Torque never matters",
            "D. Angular velocity must be zero",
          ],
          correctChoice: 1,
          correctExplanation: "Correct. The train moves forward while the wheels rotate, so both types of motion happen together.",
          incorrectExplanation: "Not quite. Coaster wheels are a clear example of rotational motion happening at the same time as forward motion.",
        },
      ],
    },
  ],
};

const lessonMap = {
  motion: motionLesson,
  forces: forcesLesson,
  energy: energyLesson,
  work: workLesson,
  "curved-motion": curvedMotionLesson,
  "g-forces": gForcesLesson,
  momentum: momentumLesson,
  rotation: rotationLesson,
};

const LessonView = ({
  lesson,
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
  const step = lesson.steps[stepIndex];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === lesson.steps.length - 1;
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
      Math.min(current + 1, lesson.steps.length - 1),
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
      Math.min(current + 1, lesson.steps.length - 1),
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
          Step {stepIndex + 1} of {lesson.steps.length}
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
                {lesson.title}
              </p>
              <h2 className={`mt-4 font-display text-3xl font-semibold ${titleClass}`}>
                {lesson.subtitle}
              </h2>
              <p className={`mt-4 text-base leading-7 ${copyClass}`}>{lesson.goal}</p>
            </div>
            <button
              type="button"
              onClick={() => setTocOpen((open) => !open)}
              className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg font-semibold leading-none transition ${
                isDark
                  ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                  : "border-slate-300 bg-white/80 text-slate-900 hover:bg-white"
              }`}
              aria-label={tocOpen ? "Collapse lesson outline" : "Expand lesson outline"}
            >
              {tocOpen ? "-" : "+"}
            </button>
          </div>

          {tocOpen ? (
            <div className="mt-8 grid gap-3">
              {lesson.steps.map((item, index) => {
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
              {lesson.steps.map((item, index) => {
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
                    className={`mt-4 overflow-x-auto pb-3 font-serif text-[1.8rem] font-normal leading-[1.5] tracking-normal sm:text-[2.15rem] ${titleClass}`}
                  >
                    {item.expression}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {step.variables ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {step.variables.map((item) => (
                <div key={item.symbol} className={`rounded-3xl border p-5 ${subtlePanelClass}`}>
                  <div className="flex items-start gap-4">
                    <div
                      className={`min-w-[5.5rem] rounded-2xl border px-3 py-3 text-center font-serif text-2xl font-normal leading-none ${
                        isDark
                          ? "border-white/10 bg-white/[0.04] text-white"
                          : "border-slate-300/70 bg-white/80 text-slate-900"
                      }`}
                    >
                      {item.symbol === "vavg" ? (
                        <>
                          v<sub>avg</sub>
                        </>
                      ) : item.symbol === "aavg" ? (
                        <>
                          a<sub>avg</sub>
                        </>
                      ) : item.symbol === "ac" ? (
                        <>
                          a<sub>c</sub>
                        </>
                      ) : item.symbol === "v0" ? (
                        <Initial symbol="v" />
                      ) : item.display ? (
                        item.display
                      ) : (
                        item.symbol
                      )}
                    </div>
                    <div>
                      <p className={`text-lg font-semibold capitalize ${titleClass}`}>
                        {item.meaning}
                      </p>
                      <p className={`mt-2 text-base leading-7 ${copyClass}`}>
                        {item.note}
                      </p>
                    </div>
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
                  Math.min(current + 1, lesson.steps.length - 1),
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
  const [activeLessonId, setActiveLessonId] = useState("motion");
  const [lessonStepIndex, setLessonStepIndex] = useState(0);
  const settingsRef = useRef(null);

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

  useEffect(() => {
    if (!settingsOpen) {
      return;
    }

    const handlePointerDown = (event) => {
      if (!settingsRef.current?.contains(event.target)) {
        setSettingsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [settingsOpen]);

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

  const currentLesson = lessonMap[activeLessonId];

  const openLesson = (section) => {
    setActiveSection(section);
    setActiveLessonId(section.id);
    setLessonStepIndex(0);
    setView("lesson");
  };

  return (
    <main className="section-shell py-10 sm:py-12 lg:py-16">
      <div className="flex justify-end">
        <div ref={settingsRef} className="relative">
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
            <span className={`text-xs ${mutedClass}`}>{settingsOpen ? "-" : "+"}</span>
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
                  className={`relative inline-flex h-8 w-16 shrink-0 items-center rounded-full p-1 transition ${
                    isDark
                      ? "bg-cyan-300/80"
                      : "border border-slate-300/80 bg-slate-300/80"
                  }`}
                  aria-label="Toggle light mode and dark mode"
                  aria-pressed={!isDark}
                >
                  <span
                    className={`inline-block h-6 w-6 rounded-full bg-white shadow-sm transition-transform ${
                      isDark ? "translate-x-0" : "translate-x-8"
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

      {view === "lesson" ? (
        <LessonView
          lesson={currentLesson}
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
          stepIndex={lessonStepIndex}
          setStepIndex={setLessonStepIndex}
          onBack={() => setView("overview")}
        />
      ) : (
        <>
          <section className="grid min-h-[72vh] items-center gap-10 lg:grid-cols-[minmax(0,42rem)_minmax(18rem,1fr)] lg:gap-14">
            <div className="max-w-3xl">
              <h1
                className={`font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-[5.8rem] lg:leading-[0.96] ${titleClass}`}
              >
                coasterphysics
              </h1>

              <p className={`mt-8 max-w-2xl text-xl leading-[1.7] sm:text-2xl ${copyClass}`}>
                Coasterphysics grew out of my obsession with roller coasters and
                the questions they kept sparking. This project turns that
                curiosity into a mission: use rides, drops, loops, and airtime
                to make physics feel visual, personal, and exciting for other
                students too.
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

            <div className="relative mx-auto flex w-full max-w-xl items-end justify-center lg:min-h-[40rem]">
              <div
                className={`absolute inset-x-[14%] inset-y-[18%] rounded-full blur-[90px] ${
                  isDark ? "bg-white/28" : "bg-slate-300/35"
                }`}
              />
              <img
                src="/roller-coaster-hero.png"
                alt="Roller coaster silhouette cresting a hill"
                className="relative h-[24rem] w-auto max-w-full object-contain sm:h-[30rem] lg:h-[40rem]"
              />
            </div>
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

            <div className="mt-10 grid gap-4">
              {sections.map((section) => {
                const isActive = section.id === activeSection.id;

                return (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => {
                      openLesson(section);
                    }}
                    className={`${panelClass} flex items-center justify-between gap-4 p-5 text-left transition ${
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
                        className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${accentNumberClass}`}
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

                    <span
                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xl transition ${
                        isDark
                          ? "border-white/10 bg-white/[0.04] text-slate-200"
                          : "border-slate-300/70 bg-white/70 text-slate-700"
                      }`}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
};

export default App;
