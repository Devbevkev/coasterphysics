import { useMemo, useState } from "react";

const controls = [
  {
    key: "height",
    label: "Hill height",
    min: 20,
    max: 120,
    step: 1,
    unit: "m",
  },
  {
    key: "mass",
    label: "Cart mass",
    min: 400,
    max: 1800,
    step: 25,
    unit: "kg",
  },
  {
    key: "radius",
    label: "Loop radius",
    min: 8,
    max: 40,
    step: 1,
    unit: "m",
  },
  {
    key: "friction",
    label: "Friction level",
    min: 1,
    max: 10,
    step: 1,
    unit: "/10",
  },
];

const SimulatorPanel = () => {
  const [settings, setSettings] = useState({
    height: 72,
    mass: 980,
    radius: 18,
    friction: 3,
  });

  const outputs = useMemo(() => {
    const gravity = 9.8;
    const speed =
      Math.sqrt(settings.height * gravity * 2) * (1 - settings.friction * 0.028);
    const energy =
      settings.mass * gravity * settings.height * (1 - settings.friction * 0.03);
    const gForce = 1 + speed ** 2 / (settings.radius * gravity * 2.15);
    const score =
      100 - settings.friction * 4 - Math.max(gForce - 3.8, 0) * 12;

    let safetyRating = "Excellent";
    if (score < 82) safetyRating = "Watch";
    if (score < 68) safetyRating = "Caution";

    return {
      speed: `${speed.toFixed(1)} m/s`,
      energy: `${Math.round(energy / 1000)} kJ`,
      gForce: `${gForce.toFixed(1)} g`,
      safetyRating,
    };
  }, [settings]);

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="panel p-6 sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
              Simulator Controls
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              Prototype Ride Builder
            </h3>
          </div>
          <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
            Preview
          </span>
        </div>

        <div className="space-y-6">
          {controls.map((control) => (
            <label key={control.key} className="block">
              <div className="mb-3 flex items-center justify-between gap-4 text-sm">
                <span className="text-slate-200">{control.label}</span>
                <span className="rounded-full bg-white/5 px-3 py-1 text-slate-300">
                  {settings[control.key]} {control.unit}
                </span>
              </div>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={settings[control.key]}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    [control.key]: Number(event.target.value),
                  }))
                }
                className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-cyan-300"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="panel relative overflow-hidden p-6 sm:p-8">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-amber-300/10" />
        <div className="relative">
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
            Live Outputs
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-white">
            Future Physics Dashboard
          </h3>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <MetricCard label="Max speed" value={outputs.speed} accent="cyan" />
            <MetricCard label="Energy" value={outputs.energy} accent="amber" />
            <MetricCard label="Peak g-force" value={outputs.gForce} accent="rose" />
            <MetricCard
              label="Safety rating"
              value={outputs.safetyRating}
              accent="emerald"
            />
          </div>

          <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-slate-950/70 p-5">
            <div className="mb-4 flex items-center justify-between text-sm text-slate-300">
              <span>Projected ride profile</span>
              <span>Concept mode</span>
            </div>
            <svg viewBox="0 0 360 180" className="h-48 w-full">
              <path
                d="M10 150 C70 148, 70 40, 128 38 S200 145, 250 145 290 76, 350 76"
                stroke="#6ee7f9"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M10 160 L350 160"
                stroke="#334155"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              <circle cx="128" cy="38" r="6" fill="#f8fafc" />
              <circle cx="250" cy="145" r="6" fill="#fbbf24" />
              <rect
                x="186"
                y="92"
                width="38"
                height="20"
                rx="8"
                fill="#f8fafc"
                className="animate-pulseSoft"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, accent }) => {
  const accents = {
    cyan: "from-cyan-400/20 to-cyan-400/5 text-cyan-100",
    amber: "from-amber-300/20 to-amber-300/5 text-amber-100",
    rose: "from-rose-400/20 to-rose-400/5 text-rose-100",
    emerald: "from-emerald-300/20 to-emerald-300/5 text-emerald-100",
  };

  return (
    <div
      className={`rounded-[1.5rem] border border-white/10 bg-gradient-to-br p-5 ${accents[accent]}`}
    >
      <p className="text-xs uppercase tracking-[0.18em] text-slate-300">{label}</p>
      <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    </div>
  );
};

export default SimulatorPanel;
