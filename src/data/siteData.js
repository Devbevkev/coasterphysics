export const courseTitle = "AP Physics C: Mechanics Roller Coaster Project";

export const courseDescription =
  "A complete eight-lesson sequence that builds AP Physics C: Mechanics through roller coaster motion, from describing motion to evaluating real design and safety decisions.";

export const courseBigIdeas = [
  "Start with motion description, then explain motion changes with forces.",
  "Use energy to predict coaster speed from height before adding real losses.",
  "Treat loops, hills, and turns as curved-motion problems with changing inward direction.",
  "Close by combining mechanics ideas the way an engineer would when evaluating an actual ride.",
];

export const lessonPlans = [
  {
    id: "kinematics",
    number: "1",
    title: "Kinematics",
    lessonGoal:
      "Teach students how to describe motion before explaining what causes motion to change.",
    whyItMatters:
      "Roller coasters are always changing position, speed, and direction. Students need a precise language for motion before they can explain drops, launches, hills, and turns with forces or energy.",
    prerequisites: [
      "Comfort with algebraic rearrangement and substitution.",
      "Basic graph reading, especially slope and area.",
      "A sense that direction matters in physics, even when the numerical speed stays the same.",
    ],
    keyConcepts: [
      {
        term: "Position, distance, and displacement",
        explanation:
          "Position locates the coaster, distance measures total path length, and displacement compares final position to initial position. A coaster can travel a long distance around a track while ending with a small displacement.",
      },
      {
        term: "Scalars vs. vectors",
        explanation:
          "Speed and distance are scalars because they have magnitude only. Velocity, displacement, and acceleration are vectors because direction matters for every later coaster problem.",
      },
      {
        term: "Velocity vs. speed",
        explanation:
          "Speed answers how fast, but velocity answers how fast and in what direction. A coaster entering a turnaround can have nearly constant speed while its velocity changes continuously.",
      },
      {
        term: "Acceleration as any change in velocity",
        explanation:
          "Acceleration includes speeding up, slowing down, and changing direction. This becomes crucial when students later analyze dips, hills, and loops.",
      },
      {
        term: "Graph relationships",
        explanation:
          "Motion graphs are not separate topics from equations; they are another way of expressing the same physics. Students should connect slope and area directly to physical meaning.",
      },
    ],
    keyEquations: [
      "v = v0 + at",
      "x = x0 + v0t + 1/2at^2",
      "v^2 = v0^2 + 2aΔx",
      "Δx = 1/2(v0 + v)t",
    ],
    teachingSequence: [
      {
        title: "1. Describe motion before explaining causes",
        detail:
          "Open with a simple question: if a coaster is halfway down the first drop, what can we say about its motion before discussing forces? Emphasize that physics often begins by describing what happens before explaining why it happens.",
      },
      {
        title: "2. Define the basic motion quantities",
        detail:
          "Introduce position, distance, displacement, speed, velocity, and acceleration using a straight section of track. Keep the first examples one-dimensional so students focus on meaning rather than geometry.",
      },
      {
        title: "3. Separate scalar and vector reasoning",
        detail:
          "Have students sort quantities into scalars and vectors and explain why direction changes the answer. This is a good place to show that a coaster reversing direction can have negative velocity but positive speed.",
      },
      {
        title: "4. Contrast speed and velocity with coaster examples",
        detail:
          "Use a turnaround or flat curve to show that constant speed does not imply constant velocity. Ask students to identify what changes when the magnitude stays the same but the direction rotates.",
      },
      {
        title: "5. Build graph fluency",
        detail:
          "Teach position vs. time, velocity vs. time, and acceleration vs. time graphs as a connected set. Students should explain slope of position-time graph = velocity, slope of velocity-time graph = acceleration, area under velocity-time graph = displacement, and area under acceleration-time graph = change in velocity.",
      },
      {
        title: "6. Introduce constant acceleration equations carefully",
        detail:
          "Present the four constant-acceleration equations as tools that work only when acceleration is constant over the interval. Compare a straight uniform drop to a curved track segment where the acceleration direction and magnitude may change.",
      },
      {
        title: "7. Apply the equations to a straight hill",
        detail:
          "Solve motion on a straight downhill track so students can connect symbols to a physical ride segment. Stress variable selection: identify known values, decide which equation matches those values, and only then substitute.",
      },
      {
        title: "8. Prepare students for more realistic motion",
        detail:
          "Close by noting that real coaster motion is more complicated because slopes curve, forces vary, and friction exists. This creates the need for Newton's laws in the next lesson.",
      },
    ],
    rollerCoasterApplication:
      "A launch track, brake run, or straight descent can often be approximated as one-dimensional motion over a short interval. Kinematics lets students answer questions such as how long a train takes to reach a target speed or how far it travels before entering a loop.",
    workedExample: {
      prompt:
        "A coaster starts from rest and accelerates down a straight section at 3.2 m/s² for 4.0 s. Find the final velocity and displacement.",
      steps: [
        "Known values: v0 = 0, a = 3.2 m/s², t = 4.0 s.",
        "Use v = v0 + at to find the final velocity: v = 0 + (3.2)(4.0) = 12.8 m/s.",
        "Use x = x0 + v0t + 1/2at^2 for displacement from the starting point. With x0 = 0 and v0 = 0, Δx = 1/2(3.2)(4.0)^2.",
        "Compute the displacement: Δx = 0.5(3.2)(16) = 25.6 m.",
      ],
      result:
        "The coaster reaches 12.8 m/s and travels 25.6 m during the 4.0 s interval.",
    },
    commonMistakes: [
      "Confusing speed and velocity.",
      "Thinking acceleration only means speeding up.",
      "Forgetting that changing direction is acceleration.",
      "Using constant acceleration equations when acceleration is not constant.",
      "Misreading slope and area on motion graphs.",
    ],
    conceptualCheckpoints: [
      "If a coaster moves at constant speed through a curve, is it accelerating? Explain why.",
      "Can a coaster have zero velocity and nonzero acceleration at the same instant? Describe a place on a ride where that could happen.",
      "Why is displacement not the same thing as distance traveled on a closed track?",
    ],
    practiceProblems: [
      "A coaster speeds up from 6.0 m/s to 22.0 m/s with a constant acceleration of 4.0 m/s². How long does the speeding-up interval last, and how far does the coaster travel?",
      "A velocity-time graph shows a coaster moving at 8 m/s for 3 s, then increasing linearly to 20 m/s over the next 4 s. Find the displacement during the full 7 s interval.",
      "A coaster leaves the station, travels east at 12 m/s, then later returns west at 12 m/s. Compare its speed and velocity in those two segments.",
    ],
    nextLessonConnection:
      "Kinematics describes what motion looks like, but Newton's laws explain why motion changes from one moment to the next.",
  },
  {
    id: "forces-and-newtons-laws",
    number: "2",
    title: "Forces and Newton's Laws",
    lessonGoal:
      "Teach students how forces cause changes in motion.",
    whyItMatters:
      "Students feel coasters push, pull, and press on them, but the ride only becomes predictable when they identify the actual forces and combine them into a net force.",
    prerequisites: [
      "Lesson 1 fluency with velocity and acceleration.",
      "Comfort resolving right-triangle relationships.",
      "Understanding that acceleration can point in a different direction from velocity.",
    ],
    keyConcepts: [
      {
        term: "Force as an interaction",
        explanation:
          "Forces are not stored inside moving objects. They arise from interactions such as gravity, contact with the track, friction, or a launch mechanism.",
      },
      {
        term: "Newton's First Law and inertia",
        explanation:
          "Objects resist changes in motion. Riders lurch forward when the train brakes because their bodies tend to keep moving with the original velocity.",
      },
      {
        term: "Newton's Second Law",
        explanation:
          "Acceleration depends on the net force, not on a single force by itself. Students must add forces carefully before using Fnet = ma.",
      },
      {
        term: "Newton's Third Law",
        explanation:
          "Force pairs act on different objects. The seat pushing on a rider and the rider pushing on the seat are equal and opposite, but they never appear on the same free-body diagram.",
      },
      {
        term: "Normal force and components on slopes",
        explanation:
          "The normal force is a geometric response of a surface. It changes with track shape and is not automatically equal to the object's weight.",
      },
    ],
    keyEquations: ["Fnet = ma", "Fg = mg", "mg sinθ", "mg cosθ"],
    teachingSequence: [
      {
        title: "1. Ask what changes coaster motion",
        detail:
          "Start with a drop, a launch, and a turn. Ask what physically causes each change in motion so students shift from describing motion to explaining it.",
      },
      {
        title: "2. Define force and inertia",
        detail:
          "Introduce force as an interaction and inertia as resistance to motion changes. Connect this directly to rider sensations during starts, stops, and transitions.",
      },
      {
        title: "3. Develop Newton's laws in coaster context",
        detail:
          "Use the train coasting through a straight section for Newton's First Law, a downhill acceleration example for Newton's Second Law, and rider-seat interactions for Newton's Third Law.",
      },
      {
        title: "4. Teach free-body diagrams as a central skill",
        detail:
          "Students should sketch the object, isolate it, and draw only real forces acting on it. Stress that motion direction is not a force and that each diagram belongs to one chosen object.",
      },
      {
        title: "5. Identify the main coaster forces",
        detail:
          "Work through gravity/weight, normal force, friction, air resistance, and chain lift or launch force. Discuss when each is present and which way each acts.",
      },
      {
        title: "6. Resolve forces on an incline",
        detail:
          "Derive mg sinθ parallel to the slope and mg cosθ perpendicular to the slope. Explain why the parallel component changes motion while the perpendicular component helps determine the normal force.",
      },
      {
        title: "7. Introduce apparent weight",
        detail:
          "Explain that riders feel support force rather than true gravitational weight. Larger normal force feels heavier, and smaller normal force feels lighter.",
      },
      {
        title: "8. Preview curved-track forces",
        detail:
          "Mention that the normal force changes dramatically at the bottoms and tops of hills, preparing students for circular motion later.",
      },
    ],
    rollerCoasterApplication:
      "On a descent, gravity has a component along the track that speeds the train up. In a brake run, the friction-like braking force opposes motion. In every segment, what matters is the vector sum of all forces, not whichever force happens to be largest.",
    workedExample: {
      prompt:
        "A 500 kg coaster car is on a frictionless 30° slope. Find the component of gravity down the slope and the acceleration.",
      steps: [
        "Weight is Fg = mg = (500)(9.8) = 4900 N.",
        "The component of gravity parallel to the slope is mg sinθ = (500)(9.8) sin30°.",
        "Since sin30° = 0.5, the downhill component is 2450 N.",
        "Because the track is frictionless, the downhill net force is 2450 N, so a = Fnet/m = 2450/500 = 4.9 m/s².",
      ],
      result:
        "The component of gravity down the slope is 2450 N and the acceleration is 4.9 m/s² down the slope.",
    },
    commonMistakes: [
      "Thinking motion requires a force in the direction of motion.",
      "Confusing mass and weight.",
      "Assuming normal force always equals mg.",
      "Drawing third-law force pairs on the same object.",
      "Forgetting to find net force before using Fnet = ma.",
    ],
    conceptualCheckpoints: [
      "Why do riders feel heavier at the bottom of a hill even though their actual weight has not changed?",
      "If a coaster is moving uphill but slowing down, which way is the net force along the track?",
      "Why is the normal force determined by the situation rather than fixed in advance?",
    ],
    practiceProblems: [
      "A 900 kg coaster car moves on a frictionless 25° incline. Find the component of gravity along the track and the resulting acceleration.",
      "Draw a free-body diagram for a coaster train being pulled up a lift hill by a chain while friction opposes the motion.",
      "A rider says, 'I feel heavier at the bottom of the drop, so gravity must be bigger there.' Explain what is actually changing.",
    ],
    nextLessonConnection:
      "Forces can predict acceleration directly, but energy gives a powerful way to predict speed from height changes without tracking every instant of motion.",
  },
  {
    id: "energy",
    number: "3",
    title: "Energy",
    lessonGoal:
      "Teach students how energy explains coaster speed, height, and motion through the track.",
    whyItMatters:
      "Roller coasters make energy visible. Height becomes speed, speed becomes height again, and the overall pattern explains why the first hill is so important.",
    prerequisites: [
      "Newton's laws and weight from Lesson 2.",
      "Comfort squaring speed and interpreting algebraic cancellation.",
      "A clear distinction between velocity and speed when using kinetic energy.",
    ],
    keyConcepts: [
      {
        term: "Gravitational potential energy",
        explanation:
          "The higher the train is above a reference level, the more energy is stored in the train-Earth system.",
      },
      {
        term: "Kinetic energy",
        explanation:
          "Kinetic energy depends on speed squared, which is why modest speed changes can correspond to large energy changes.",
      },
      {
        term: "Mechanical energy",
        explanation:
          "Mechanical energy combines kinetic and gravitational potential energy. In ideal coaster problems, it remains constant.",
      },
      {
        term: "Reference height",
        explanation:
          "Only height differences matter. Students should choose a convenient zero level rather than treating ground level as mandatory.",
      },
      {
        term: "Mass cancellation in ideal drops",
        explanation:
          "When friction is ignored, mass cancels out of many energy equations, so heavier coaster cars do not automatically move faster.",
      },
    ],
    keyEquations: [
      "Ug = mgh",
      "K = 1/2mv²",
      "E = K + Ug",
      "Ki + Ugi = Kf + Ugf",
      "mgh = 1/2mv²",
      "v = sqrt(2gh)",
    ],
    teachingSequence: [
      {
        title: "1. Start with the central coaster story",
        detail:
          "Introduce the first hill as stored energy and the first drop as energy conversion. Students should see energy as a system-level way to think about the ride.",
      },
      {
        title: "2. Define potential, kinetic, and mechanical energy",
        detail:
          "Present Ug = mgh, K = 1/2mv², and E = K + Ug. Explain what belongs to the train-Earth system and why kinetic energy depends on speed rather than direction.",
      },
      {
        title: "3. Use conservation of mechanical energy in ideal cases",
        detail:
          "Apply Ki + Ugi = Kf + Ugf between the top and bottom of a drop. Show clearly how mass cancels and why the predicted speed depends on height change, not mass.",
      },
      {
        title: "4. Build multi-point reasoning",
        detail:
          "Have students compare the top of the first hill, bottom of the drop, and top of the second hill. This turns energy into a whole-track analysis instead of a single-equation trick.",
      },
      {
        title: "5. Discuss the first hill as the energy budget",
        detail:
          "Explain why the first hill is usually tallest: later sections can only redistribute or lose energy unless an external system adds more.",
      },
      {
        title: "6. Introduce energy bar charts",
        detail:
          "Use bar charts to track K, Ug, and total energy qualitatively before solving numerically. This helps students catch impossible answers before calculating.",
      },
      {
        title: "7. Add realism through losses",
        detail:
          "Explain that real coasters lose mechanical energy to friction, air resistance, sound, and heat. This sets up the next lesson on work and nonconservative forces.",
      },
    ],
    rollerCoasterApplication:
      "Energy methods are especially powerful on long coaster segments where force directions keep changing. Instead of summing forces at every point, students can compare the ride's energy at two positions and predict the speed change from the height change.",
    workedExample: {
      prompt:
        "Worked example 1: A coaster starts from rest at a height of 40 m. Ignoring friction, find its speed at the bottom. Worked example 2: A coaster starts from rest at 50 m and later reaches a hill of height 20 m. Ignoring friction, find its speed at the top of the second hill.",
      steps: [
        "Example 1: Set mgh = 1/2mv² with h = 40 m. Mass cancels, so v = sqrt(2gh) = sqrt(2)(9.8)(40) ≈ 28.0 m/s.",
        "Example 2: Compare the top of the first hill and the top of the second hill: mghinitial = 1/2mv² + mghfinal.",
        "Substitute heights: (9.8)(50) = 1/2v² + (9.8)(20).",
        "Solve: 1/2v² = 9.8(30) = 294, so v² = 588 and v ≈ 24.2 m/s.",
      ],
      result:
        "The coaster reaches about 28.0 m/s at the bottom of a 40 m drop and about 24.2 m/s at the top of the later 20 m hill.",
    },
    commonMistakes: [
      "Using total height instead of change in height.",
      "Forgetting velocity is squared in kinetic energy.",
      "Thinking mass determines final speed in ideal energy problems.",
      "Mixing up energy conservation with force equations.",
      "Ignoring energy losses in real coaster situations.",
    ],
    conceptualCheckpoints: [
      "If two coaster cars with different masses start from the same height, which one is faster at the bottom if friction is ignored?",
      "Why is the first hill usually the tallest point on a traditional coaster?",
      "Why does changing the reference height not change the predicted speed?",
    ],
    practiceProblems: [
      "A coaster drops 32 m from rest. Ignoring friction, find its speed at the bottom.",
      "A coaster starts from rest at 45 m and reaches a later hill that is 18 m high. Ignoring friction, find its speed at the top of that hill.",
      "A coaster needs to reach 20 m/s at the bottom of the first drop. Ignoring friction, what minimum starting height is required?",
      "Explain why later hills are lower even though total energy is still conserved when the coaster, track, air, and surroundings are treated as one larger system.",
    ],
    nextLessonConnection:
      "Energy predicts speed well, but circular motion explains the forces riders feel in loops, dips, hills, and turns.",
  },
  {
    id: "circular-motion",
    number: "4",
    title: "Circular Motion",
    lessonGoal:
      "Teach students how curved motion creates acceleration and changes the forces riders feel.",
    whyItMatters:
      "The most dramatic coaster sensations happen where the track curves. Circular-motion reasoning explains why riders feel light at crests, heavy in valleys, and secure in loops.",
    prerequisites: [
      "Kinematics understanding that direction changes imply acceleration.",
      "Newton's Second Law and free-body diagrams.",
      "Energy-based speed estimates from Lesson 3.",
    ],
    keyConcepts: [
      {
        term: "Centripetal acceleration",
        explanation:
          "Any curved path requires an inward acceleration, even if the speed stays constant.",
      },
      {
        term: "Centripetal force as a net force",
        explanation:
          "Centripetal force is not a new type of force. It is the inward result of real forces such as gravity and the normal force.",
      },
      {
        term: "Changing inward direction",
        explanation:
          "At the bottom of a dip, inward is upward. At the top of a hill or loop, inward is downward. Correct sign choice depends on this physical picture.",
      },
      {
        term: "Apparent weight in curved motion",
        explanation:
          "Riders feel the support force, so changes in normal force translate directly into feeling heavier or lighter.",
      },
      {
        term: "Minimum loop speed",
        explanation:
          "At the top of a loop, the limiting case occurs when the seat just stops pushing on the rider or train, meaning the normal force is zero.",
      },
    ],
    keyEquations: [
      "ac = v²/r",
      "Fnet,inward = mv²/r",
      "N - mg = mv²/r",
      "mg - N = mv²/r",
      "mg + N = mv²/r",
      "v = sqrt(gr)",
    ],
    teachingSequence: [
      {
        title: "1. Emphasize that real tracks are rarely straight",
        detail:
          "Use a visual sequence of a valley, hill crest, and loop to show that changing direction is central to coaster physics, not a side topic.",
      },
      {
        title: "2. Define centripetal acceleration and net inward force",
        detail:
          "Introduce ac = v²/r and Fnet,inward = mv²/r. Explain that these are not extra forces but requirements for curved motion.",
      },
      {
        title: "3. Practice identifying the inward direction",
        detail:
          "Before doing algebra, have students point to the center of curvature at different parts of a track. This reduces sign mistakes later.",
      },
      {
        title: "4. Analyze the bottom of a valley",
        detail:
          "Write N - mg = mv²/r. Explain that the normal force must not only support the rider's weight but also provide extra upward net force for the turn, so riders feel heavier.",
      },
      {
        title: "5. Analyze the top of a hill",
        detail:
          "Write mg - N = mv²/r. Gravity now helps provide inward acceleration, so the required normal force is smaller and riders feel lighter.",
      },
      {
        title: "6. Analyze the top of a loop",
        detail:
          "Write mg + N = mv²/r. Both gravity and the seat can point inward there. Then derive the minimum-speed condition by setting N = 0.",
      },
      {
        title: "7. Discuss why real loops are not perfect circles",
        detail:
          "Introduce clothoid loops qualitatively so students see how engineering adjusts radius to control g-forces through the loop.",
      },
      {
        title: "8. Extend to turns",
        detail:
          "Mention flat turns and banked turns so students see that circular motion applies horizontally as well as vertically.",
      },
    ],
    rollerCoasterApplication:
      "Circular-motion analysis explains why a fast train in a tight valley can produce large positive g-forces, why airtime hills create lightness, and why loop design depends on both speed and radius.",
    workedExample: {
      prompt:
        "Worked example 1: A coaster travels through the bottom of a circular dip of radius 25 m at 20 m/s. Find the normal force on a 60 kg rider. Worked example 2: Find the minimum speed needed at the top of a loop with radius 12 m.",
      steps: [
        "Example 1: At the bottom of the dip, N - mg = mv²/r.",
        "Compute weight: mg = (60)(9.8) = 588 N. Compute inward requirement: mv²/r = (60)(20²)/25 = 960 N.",
        "Solve for N: N = 588 + 960 = 1548 N.",
        "Example 2: For minimum speed at the top, set N = 0 so mg = mv²/r.",
        "Mass cancels, giving v = sqrt(gr) = sqrt((9.8)(12)) ≈ 10.8 m/s.",
      ],
      result:
        "The rider's normal force at the bottom of the dip is 1548 N, and the minimum loop-top speed for a 12 m radius loop is about 10.8 m/s.",
    },
    commonMistakes: [
      "Thinking centripetal force points outward.",
      "Treating centripetal force as a separate force.",
      "Using mg = mv²/r in every circular motion problem.",
      "Forgetting that the inward direction changes depending on location.",
      "Confusing actual weight with apparent weight.",
    ],
    conceptualCheckpoints: [
      "Why do riders feel lighter at the top of a hill but heavier at the bottom of a valley?",
      "Why is centripetal force not listed separately on a free-body diagram?",
      "What happens physically at the top of a loop if the train's speed drops below the minimum value?",
    ],
    practiceProblems: [
      "A 55 kg rider passes through the bottom of a dip of radius 18 m at 16 m/s. Find the normal force.",
      "A 500 kg coaster car passes over the top of a hill of radius 30 m at 14 m/s. Find the normal force from the track.",
      "Find the minimum speed needed at the top of a loop with radius 9.0 m.",
      "Explain the correct direction of the centripetal acceleration vector for a coaster moving through the top of a hill, the bottom of a valley, and a horizontal turn.",
    ],
    nextLessonConnection:
      "Circular motion explains curved-track forces, but real coasters also lose energy because friction and air resistance do work.",
  },
  {
    id: "work-friction-and-power",
    number: "5",
    title: "Work, Friction, and Power",
    lessonGoal:
      "Teach students how work transfers energy and why real coasters lose mechanical energy.",
    whyItMatters:
      "Ideal energy models are powerful, but real coasters need launch systems, lift motors, brakes, and carefully managed losses. Work and power explain those energy transfers.",
    prerequisites: [
      "Lesson 3 understanding of mechanical energy.",
      "Lesson 2 ability to identify forces and their directions.",
      "Comfort interpreting cosine as directional alignment in dot-product style reasoning.",
    ],
    keyConcepts: [
      {
        term: "Work as energy transfer",
        explanation:
          "A force does work when it acts through a displacement. The sign of the work depends on the angle between force and motion.",
      },
      {
        term: "Work-energy theorem",
        explanation:
          "Net work changes kinetic energy, which gives a direct link between force over distance and speed change.",
      },
      {
        term: "Nonconservative work",
        explanation:
          "Friction, drag, brakes, and launches can change mechanical energy by moving energy into or out of the coaster's mechanical forms.",
      },
      {
        term: "Friction and drag",
        explanation:
          "These do not destroy energy. They convert organized mechanical energy into thermal energy, sound, and other forms.",
      },
      {
        term: "Power",
        explanation:
          "Power describes how quickly energy is transferred. A launch and a lift hill may add similar total energy, but the launch does it in far less time.",
      },
    ],
    keyEquations: ["W = Fd cosθ", "Wnet = ΔK", "Wnc = ΔEmech", "P = W/t", "P = Fv"],
    teachingSequence: [
      {
        title: "1. Challenge the ideal-energy picture",
        detail:
          "Start by asking why a coaster does not keep returning to the same height forever if energy is conserved. Use this question to distinguish total energy from mechanical energy.",
      },
      {
        title: "2. Define work and its sign",
        detail:
          "Introduce W = Fd cosθ and discuss positive, negative, and zero work with coaster examples: gravity on a drop, gravity uphill, friction opposing motion, and a normal force perpendicular to motion.",
      },
      {
        title: "3. Present the work-energy theorem",
        detail:
          "Use Wnet = ΔK to connect force over distance to speed change. Students should see this as complementary to Newton's laws, not a replacement for them.",
      },
      {
        title: "4. Add nonconservative work",
        detail:
          "Explain Wnc = ΔEmech and classify friction and air resistance as nonconservative forces that reduce mechanical energy.",
      },
      {
        title: "5. Discuss where the lost energy goes",
        detail:
          "Make the energy accounting explicit: wheel heating, air turbulence, vibration, sound, and brake system heating are all places where mechanical energy goes.",
      },
      {
        title: "6. Introduce power in coaster systems",
        detail:
          "Contrast a chain lift and a launch system. Both add energy, but the launch does it at a much higher rate, which is why its power demand is so large.",
      },
      {
        title: "7. Connect to braking and safety",
        detail:
          "Explain braking systems as controlled negative work. This reinforces that safe design is about managing energy removal, not merely stopping motion.",
      },
    ],
    rollerCoasterApplication:
      "A lift motor does positive work to increase a train's energy before the ride. Friction and air resistance do negative work during the ride, which is why later hills are lower. Brakes do deliberate negative work to remove kinetic energy before the station.",
    workedExample: {
      prompt:
        "Worked example 1: A coaster loses 20,000 J of mechanical energy due to friction over a section of track. Explain what happens to that energy. Worked example 2: A chain lift does 300,000 J of work in 25 s. Find the average power output.",
      steps: [
        "Example 1: The 20,000 J is not destroyed. Friction converts that mechanical energy into thermal energy in the wheels, track, and surrounding air, plus some sound and vibration.",
        "Example 2: Use P = W/t with W = 300,000 J and t = 25 s.",
        "Compute P = 300,000/25 = 12,000 W.",
      ],
      result:
        "The lost mechanical energy becomes other energy forms such as heat and sound, and the chain lift's average power output is 12,000 W.",
    },
    commonMistakes: [
      "Thinking friction destroys energy.",
      "Confusing work with force.",
      "Forgetting the cosine factor in W = Fd cosθ.",
      "Confusing energy and power.",
      "Assuming mechanical energy is always conserved.",
    ],
    conceptualCheckpoints: [
      "Why does friction make later hills lower even though total energy is still conserved?",
      "Why can the normal force be large on a track segment but still do zero work?",
      "Why does a launch system require high power even if its total work is similar to a lift hill's work?",
    ],
    practiceProblems: [
      "A constant 450 N force pulls a coaster car 18 m in the same direction as the motion. How much work is done?",
      "A net force does -12,000 J of work on a coaster train. What does the work-energy theorem predict about the train's kinetic energy?",
      "A launch system adds 240,000 J of energy in 8.0 s. Find the average power.",
      "Explain why friction and air resistance count as energy losses from the mechanical-energy model but not from the total-energy model.",
    ],
    nextLessonConnection:
      "Work and energy describe motion over distances, while momentum and impulse are especially useful for short interactions like launches, braking, and collisions.",
  },
  {
    id: "momentum-and-impulse",
    number: "6",
    title: "Momentum and Impulse",
    lessonGoal:
      "Teach students how momentum describes motion during interactions, launches, and braking.",
    whyItMatters:
      "Some coaster events happen over very short times. Momentum and impulse give students a better tool for launches, brake runs, and brief collisions than energy alone.",
    prerequisites: [
      "Vector reasoning from Lesson 1.",
      "Newton's laws, especially force and net force.",
      "Work and power concepts from Lesson 5 for comparing long and short interactions.",
    ],
    keyConcepts: [
      {
        term: "Momentum",
        explanation:
          "Momentum combines mass and velocity, so both how much train there is and how fast it is moving matter during starting and stopping.",
      },
      {
        term: "Impulse",
        explanation:
          "Impulse measures the effect of force acting over time. It is the amount needed to change momentum by a specified amount.",
      },
      {
        term: "Stopping time and average force",
        explanation:
          "For a fixed momentum change, increasing the stopping time reduces the average force. This is a central safety idea in coaster braking and restraint design.",
      },
      {
        term: "Conservation of momentum",
        explanation:
          "Momentum is conserved when external impulse is negligible. This is more useful for collisions or coupled-coaster-car interactions than for ordinary track motion.",
      },
      {
        term: "System thinking",
        explanation:
          "A coaster train is a connected system. Internal forces between cars matter for stress and motion distribution, even when they cancel in a whole-system analysis.",
      },
    ],
    keyEquations: ["p = mv", "J = Δp", "J = FΔt"],
    teachingSequence: [
      {
        title: "1. Introduce short-time coaster events",
        detail:
          "Frame launches, braking, and minor impacts as situations where the key question is not just how far the train moves but how quickly its motion changes.",
      },
      {
        title: "2. Define momentum as a vector",
        detail:
          "Use examples of heavy slow trains and light fast trains to show that large momentum can come from either mass or speed. Keep direction visible in every example.",
      },
      {
        title: "3. Define impulse and connect it to force over time",
        detail:
          "Present J = Δp and J = FΔt. Explain that the same momentum change can come from a large force over a short time or a smaller force over a longer time.",
      },
      {
        title: "4. Apply impulse to launches and braking",
        detail:
          "Show a launch system increasing momentum and a brake system decreasing momentum. Stress sign conventions so students do not lose direction information.",
      },
      {
        title: "5. Emphasize safety and stopping time",
        detail:
          "Use rider comfort to discuss why controlled, longer stopping intervals reduce average force on riders and on the train.",
      },
      {
        title: "6. Introduce conservation of momentum selectively",
        detail:
          "Explain that normal coaster travel involves significant external forces from the track, so conservation of momentum is not the main tool there. It becomes useful for collisions, couplings, or small subsystem analyses.",
      },
      {
        title: "7. Connect to train design",
        detail:
          "Discuss how connected cars transmit forces internally and why smoother force changes improve safety and reduce structural stress.",
      },
    ],
    rollerCoasterApplication:
      "Momentum and impulse are the natural language of linear-induction launches, magnetic brakes, emergency stops, and any situation where the train's velocity changes significantly over a brief time interval.",
    workedExample: {
      prompt:
        "Worked example 1: A 700 kg coaster car moving at 18 m/s is brought to rest in 6.0 s. Find the average braking force. Worked example 2: A launch system accelerates a 600 kg car from rest to 25 m/s. Find the impulse delivered to the car.",
      steps: [
        "Example 1: Compute the change in momentum: Δp = m(vf - vi) = 700(0 - 18) = -12,600 kg·m/s.",
        "Use J = FΔt, so Favg = Δp/Δt = -12,600/6.0 = -2100 N.",
        "The negative sign shows the braking force points opposite the initial motion.",
        "Example 2: Impulse equals change in momentum: J = m(vf - vi) = 600(25 - 0) = 15,000 N·s.",
      ],
      result:
        "The average braking force is 2100 N opposite the motion, and the launch system delivers an impulse of 15,000 N·s.",
    },
    commonMistakes: [
      "Treating momentum as a scalar.",
      "Forgetting that impulse equals change in momentum, not just final momentum.",
      "Confusing impulse with force.",
      "Ignoring direction.",
      "Assuming momentum is always conserved even when external forces act.",
    ],
    conceptualCheckpoints: [
      "Why does increasing stopping time reduce the average force on riders?",
      "Why can a slow-moving but very massive coaster train still have large momentum?",
      "Why is conservation of momentum not usually the main tool for a train simply moving along the track?",
    ],
    practiceProblems: [
      "Find the momentum of an 800 kg coaster car moving at 14 m/s.",
      "A 650 kg car moving at 20 m/s is brought to rest in 5.0 s. Find the average braking force.",
      "A launch track takes a 500 kg car from rest to 30 m/s. Find the impulse delivered.",
      "Explain, in words, why a longer magnetic brake run can reduce force on riders even when the overall speed change is the same.",
    ],
    nextLessonConnection:
      "Coaster cars do not just translate along the track; wheels, axles, and rotating parts also involve rotational motion.",
  },
  {
    id: "rotation-and-torque",
    number: "7",
    title: "Rotation and Torque",
    lessonGoal:
      "Teach students how rotational physics applies to coaster wheels, axles, and rolling motion.",
    whyItMatters:
      "Coaster trains do not move as point masses. Wheels spin, axles experience torques, and real engineering decisions depend on how translation and rotation work together.",
    prerequisites: [
      "Linear kinematics and dynamics from earlier lessons.",
      "Energy ideas, especially the possibility of more than one kinetic-energy form.",
      "Comfort with radius as a geometric lever arm.",
    ],
    keyConcepts: [
      {
        term: "Angular and linear relationships",
        explanation:
          "Rotational motion has its own position, velocity, and acceleration variables, but rolling systems connect them directly to linear motion.",
      },
      {
        term: "Torque",
        explanation:
          "Torque is the rotational effect of a force and depends on both the force magnitude and how far from the axis the force acts.",
      },
      {
        term: "Rotational inertia",
        explanation:
          "Mass distribution matters. Mass farther from the axis makes an object harder to spin up or slow down.",
      },
      {
        term: "Rotational kinetic energy",
        explanation:
          "Rolling parts store energy in rotation as well as translation, so some of the coaster's energy budget goes into spinning wheels.",
      },
      {
        term: "Rolling without slipping",
        explanation:
          "When wheels roll without slipping, linear and angular speed stay linked by geometry rather than treated as independent quantities.",
      },
    ],
    keyEquations: [
      "v = rω",
      "a = rα",
      "τ = rF sinθ",
      "Krot = 1/2Iω²",
      "Ktotal = Ktrans + Krot",
      "Ktotal = 1/2mv² + 1/2Iω²",
    ],
    teachingSequence: [
      {
        title: "1. Shift from translating cars to rotating parts",
        detail:
          "Begin by asking what parts of a coaster are clearly rotating even while the train moves forward. Wheels and axles provide a natural transition from translational to rotational mechanics.",
      },
      {
        title: "2. Define angular quantities",
        detail:
          "Introduce angular position, angular velocity, and angular acceleration, then connect them to familiar linear quantities using the wheel rim as the concrete example.",
      },
      {
        title: "3. Present torque as rotational cause",
        detail:
          "Introduce τ = rF sinθ and explain moment arm. Compare pushing near a wheel axle to pushing at the rim so students see why lever arm matters.",
      },
      {
        title: "4. Discuss rotational inertia qualitatively",
        detail:
          "Explain that rotational inertia depends on how mass is distributed, not just total mass. Use a wheel with heavy outer rims versus one with mass concentrated near the center.",
      },
      {
        title: "5. Add rotational kinetic energy",
        detail:
          "Show that Krot = 1/2Iω² means some energy goes into spin. This helps students refine the earlier energy story without discarding it.",
      },
      {
        title: "6. Combine translation and rotation in rolling motion",
        detail:
          "Use Ktotal = Ktrans + Krot and v = rω to explain why wheel design, bearing quality, and axle friction matter for ride efficiency.",
      },
      {
        title: "7. Connect to engineering",
        detail:
          "Discuss why bearings, wheel materials, and axle alignment affect both energy loss and reliability. This prepares students for the final engineering synthesis lesson.",
      },
    ],
    rollerCoasterApplication:
      "Although the train's motion is dominated by height changes and track forces, every wheel must spin, every axle must withstand torque, and every design choice about wheel mass distribution affects energy efficiency and wear.",
    workedExample: {
      prompt:
        "A coaster wheel of radius 0.20 m rotates with angular speed 50 rad/s. Find the linear speed of the wheel edge.",
      steps: [
        "Use the rolling relation v = rω.",
        "Substitute r = 0.20 m and ω = 50 rad/s.",
        "Compute v = (0.20)(50) = 10 m/s.",
      ],
      result:
        "The wheel edge moves with a linear speed of 10 m/s.",
    },
    commonMistakes: [
      "Confusing torque with force.",
      "Forgetting torque depends on lever arm and angle.",
      "Mixing up linear velocity and angular velocity.",
      "Ignoring rotational kinetic energy.",
      "Assuming all objects roll the same way regardless of rotational inertia.",
    ],
    conceptualCheckpoints: [
      "Why does placing more mass farther from the axis make an object harder to spin?",
      "Why is wheel rotation part of the coaster's energy budget even if students focus mostly on the train's forward motion?",
      "Why does a force applied through the axle create less torque than the same force applied at the wheel rim?",
    ],
    practiceProblems: [
      "A wheel of radius 0.18 m rotates at 40 rad/s. Find the linear speed at the rim.",
      "A 120 N force is applied perpendicular to a 0.35 m lever arm. Find the torque.",
      "A wheel has moment of inertia 2.5 kg·m² and angular speed 12 rad/s. Find its rotational kinetic energy.",
      "Explain why rotational inertia depends on mass distribution, not only on total mass.",
    ],
    nextLessonConnection:
      "Real coaster design combines all previous ideas: motion, forces, energy, circular motion, friction, momentum, and rotation.",
  },
  {
    id: "real-world-coaster-design-and-safety",
    number: "8",
    title: "Real-World Coaster Design and Safety",
    lessonGoal:
      "Synthesize all previous lessons into a realistic understanding of coaster engineering and safety.",
    whyItMatters:
      "The final goal is not memorizing isolated formulas. It is using mechanics to judge whether a coaster layout is fast enough, safe enough, and physically consistent from start to finish.",
    prerequisites: [
      "All previous lessons, especially energy and circular motion.",
      "Ability to reason qualitatively before calculating.",
      "Willingness to balance ideal physics models with engineering constraints.",
    ],
    keyConcepts: [
      {
        term: "Physics as a design filter",
        explanation:
          "A coaster layout must satisfy energy, force, momentum, and structural constraints simultaneously. A visually exciting layout can still be physically impossible or unsafe.",
      },
      {
        term: "G-force limits and rider comfort",
        explanation:
          "A good ride uses large motion changes without exceeding tolerable positive, negative, or lateral accelerations for riders.",
      },
      {
        term: "Smooth transitions",
        explanation:
          "Large forces are not the only danger. Abrupt changes in force also matter, which is why real tracks use carefully shaped transitions instead of sharp corners.",
      },
      {
        term: "Energy management",
        explanation:
          "Designers must plan where energy is added, converted, lost, and removed. Every hill, loop, and brake zone depends on that budget.",
      },
      {
        term: "Redundancy and system safety",
        explanation:
          "Safe operation depends on restraints, block zones, sensors, and emergency braking systems in addition to sound mechanics.",
      },
    ],
    keyEquations: [
      "Ki + Ugi = Kf + Ugf",
      "Fnet = ma",
      "Fnet,inward = mv²/r",
      "Wnc = ΔEmech",
      "J = Δp",
      "Ktotal = Ktrans + Krot",
    ],
    teachingSequence: [
      {
        title: "1. Reframe the course as engineering",
        detail:
          "Open by explaining that real coaster design is applied physics plus constraints. The question is not only 'what equation fits?' but also 'what design choices are physically and safely acceptable?'",
      },
      {
        title: "2. Review the course logic",
        detail:
          "Summarize the flow: kinematics describes motion, Newton's laws explain acceleration, energy predicts speed from height, circular motion explains loops and turns, work and friction explain losses, impulse explains launches and braking, and rotation explains spinning components.",
      },
      {
        title: "3. Introduce design constraints",
        detail:
          "Discuss maximum height, maximum speed, track length, rider comfort, g-force limits, available space, cost, and materials. Students should see that a mathematically possible ride may still be a poor design.",
      },
      {
        title: "4. Evaluate g-forces and transitions",
        detail:
          "Revisit positive, negative, and lateral g-forces, then explain why smooth transitions and changing-radius features like clothoid loops improve safety and comfort.",
      },
      {
        title: "5. Analyze turns, hills, and braking zones",
        detail:
          "Discuss banking, controlled braking distances, and launch or lift choices. Tie each feature back to a specific physics principle rather than treating design as intuition.",
      },
      {
        title: "6. Add systems thinking",
        detail:
          "Explain restraints, block zones, sensors, and emergency brakes as overlapping safety layers. Students should see that safe design includes prevention, monitoring, and controlled failure response.",
      },
      {
        title: "7. End with a design challenge",
        detail:
          "Have students justify a simplified coaster layout by identifying where energy is highest, speed is highest, normal force is largest, riders feel lightest, and friction or braking remove energy.",
      },
    ],
    rollerCoasterApplication:
      "Real coaster design asks students to blend every prior lesson: estimate speed from height, check if loops and hills create acceptable normal forces, plan braking zones that reduce force on riders, and account for energy losses so the train still completes the course safely.",
    workedExample: {
      prompt:
        "Given a simplified coaster with a 45 m first hill, a 25 m second hill, a loop, and a braking section, explain the energy transformations and force changes throughout the ride.",
      steps: [
        "At the top of the 45 m hill, the coaster has its largest gravitational potential energy and relatively small kinetic energy.",
        "As the train descends, potential energy changes into kinetic energy, so speed increases and the bottom of the first drop is a likely location for maximum speed.",
        "As the train climbs the 25 m second hill, some kinetic energy changes back into gravitational potential energy, but the hill is lower because friction and drag have removed some mechanical energy.",
        "Entering and exiting the loop, the train needs enough speed that the inward net force requirement can be met everywhere, especially at the top where gravity helps but may not be sufficient alone.",
        "In the braking section, the system deliberately removes kinetic energy through negative work over a chosen distance and time so rider forces remain controlled.",
      ],
      result:
        "The layout is physically plausible only if the first hill provides enough energy for the later hill and loop after losses, and only if the loop and braking zone keep g-forces and stopping forces within safe limits.",
    },
    commonMistakes: [
      "Designing later hills too tall without accounting for energy loss.",
      "Ignoring g-forces in loops and dips.",
      "Assuming faster is always better.",
      "Forgetting rider comfort and safety.",
      "Treating ideal physics as identical to real engineering.",
    ],
    conceptualCheckpoints: [
      "Why does a safe coaster need both exciting changes in motion and controlled limits on force?",
      "Why are smooth transitions as important as peak speed in coaster design?",
      "Why must engineers think about the whole ride system instead of analyzing each element in isolation?",
    ],
    practiceProblems: [
      "Perform a full-track energy analysis for a coaster that starts at 38 m, loses 12,000 J of mechanical energy before a 16 m hill, and then enters a brake run.",
      "A designer proposes tightening the radius at the bottom of the main drop without changing speed. Explain how that affects rider forces.",
      "A brake system must stop a train moving at 24 m/s. Compare the average stopping force for a 3 s stop and a 6 s stop.",
      "Design a simplified coaster with one first hill, one valley, one airtime hill, and one brake run, then justify each feature using mechanics.",
    ],
    nextLessonConnection:
      "This final lesson synthesizes the full course: roller coasters are not just thrill rides, but examples of motion, force, energy, circular motion, work, momentum, rotation, and safety design working together.",
  },
];
