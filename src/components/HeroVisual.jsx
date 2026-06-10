const HeroVisual = () => {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-neon">
      <div className="absolute inset-0 bg-grid-fade bg-[size:34px_34px] opacity-20" />
      <div className="absolute -left-10 top-8 h-32 w-32 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-amber-400/15 blur-3xl" />

      <div className="relative flex min-h-[380px] flex-col justify-between gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Track Energy Map
          </span>
          <span className="rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
            Height vs Speed
          </span>
        </div>

        <svg
          viewBox="0 0 640 300"
          className="h-full w-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="trackGlow" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6ee7f9" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#fbbf24" />
            </linearGradient>
          </defs>

          <path
            d="M30 220 C110 220, 120 55, 205 55 S320 250, 395 250 465 115, 530 115 560 185, 610 185"
            stroke="url(#trackGlow)"
            strokeWidth="8"
            strokeLinecap="round"
            className="drop-shadow-[0_0_20px_rgba(110,231,249,0.4)]"
          />

          <circle cx="205" cy="55" r="10" fill="#f8fafc" />
          <circle cx="395" cy="250" r="10" fill="#f8fafc" />
          <circle cx="530" cy="115" r="10" fill="#f8fafc" />

          <g className="animate-float">
            <rect x="254" y="152" width="52" height="28" rx="10" fill="#f8fafc" />
            <rect x="264" y="142" width="32" height="14" rx="6" fill="#38bdf8" />
            <circle cx="269" cy="183" r="7" fill="#fbbf24" />
            <circle cx="291" cy="183" r="7" fill="#fbbf24" />
          </g>

          <path
            d="M80 255 L80 100"
            stroke="#94a3b8"
            strokeDasharray="6 6"
            strokeOpacity="0.45"
          />
          <path
            d="M80 255 L320 255"
            stroke="#94a3b8"
            strokeDasharray="6 6"
            strokeOpacity="0.45"
          />
          <path
            d="M92 130 C135 112, 168 110, 220 110"
            stroke="#6ee7f9"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M92 232 C148 220, 190 198, 220 150"
            stroke="#fbbf24"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <text x="92" y="91" fill="#cbd5e1" fontSize="13">
            Height
          </text>
          <text x="220" y="276" fill="#cbd5e1" fontSize="13">
            Drop distance
          </text>
          <text x="228" y="112" fill="#6ee7f9" fontSize="13">
            Potential energy
          </text>
          <text x="228" y="152" fill="#fbbf24" fontSize="13">
            Speed
          </text>
        </svg>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Lift Hill
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">72 m</p>
            <p className="mt-1 text-sm text-slate-300">stored energy builds</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Peak Speed
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">31 m/s</p>
            <p className="mt-1 text-sm text-slate-300">after the first drop</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Force Zone
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">3.6 g</p>
            <p className="mt-1 text-sm text-slate-300">tightest valley turn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroVisual;
