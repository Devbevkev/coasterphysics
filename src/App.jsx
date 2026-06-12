const App = () => {
  return (
    <main className="section-shell flex min-h-screen items-center py-16 sm:py-20 lg:py-24">
      <section className="max-w-5xl">
        <h1 className="font-display text-6xl font-semibold tracking-tight text-white sm:text-7xl lg:text-[8.5rem] lg:leading-[0.92]">
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

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#"
            className="inline-flex min-w-[18rem] items-center justify-center rounded-full bg-cyan-300 px-8 py-5 text-lg font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-cyan-200"
          >
            Start Learning
          </a>
          <a
            href="#"
            className="inline-flex min-w-[22rem] items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-5 text-lg font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10"
          >
            Explore Coaster Physics
          </a>
        </div>
      </section>
    </main>
  );
};

export default App;
