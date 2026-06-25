import { useMemo, useState } from "react";

const GRAVITY = 9.81;

const getIdealMaxSpeed = (height) => Math.sqrt(2 * GRAVITY * Math.max(height, 0));

const controls = [
  {
    key: "height",
    label: "Drop height",
    min: 20,
    max: 100,
    step: 1,
    unit: "m",
  },
  {
    key: "levelOutLength",
    label: "Level-out length",
    min: 35,
    max: 150,
    step: 1,
    unit: "m",
  },
];

const SimulatorPanel = ({
  isDark,
  panelClass,
  subtlePanelClass,
  titleClass,
  copyClass,
  mutedClass,
  accentLabelClass,
}) => {
  const [settings, setSettings] = useState({
    height: 54,
    levelOutLength: 88,
  });

  const model = useMemo(() => {
    const { height, levelOutLength } = settings;
    const maxSpeed = getIdealMaxSpeed(height);
    const transitionRadius = (levelOutLength ** 2) / (2 * height);
    const peakGForce = 1 + maxSpeed ** 2 / (transitionRadius * GRAVITY);
    const entryAngle = (Math.atan((2 * height) / levelOutLength) * 180) / Math.PI;

    let intensity = "Comfortable";
    if (peakGForce >= 2.8) intensity = "Intense";
    if (peakGForce >= 4) intensity = "Extreme";

    return {
      maxSpeed,
      transitionRadius,
      peakGForce,
      entryAngle,
      intensity,
    };
  }, [settings]);

  const track = useMemo(() => {
    const viewBox = { width: 420, height: 240 };
    const topPadding = 28;
    const bottomY = 184;
    const plateauStartX = 28;
    const dropStartX = 94;
    const maxHeightPx = 128;
    const minHeight = controls[0].min;
    const maxHeight = controls[0].max;
    const minLength = controls[1].min;
    const maxLength = controls[1].max;

    const heightRatio =
      (settings.height - minHeight) / (maxHeight - minHeight);
    const lengthRatio =
      (settings.levelOutLength - minLength) / (maxLength - minLength);

    const heightPx = 72 + maxHeightPx * heightRatio * 0.72;
    const topY = Math.max(topPadding, bottomY - heightPx);
    const dropWidth = 86 + 170 * lengthRatio;
    const flatLength = 46 + 26 * (1 - Math.min(lengthRatio, 0.85));
    const dropEndX = dropStartX + dropWidth;
    const flatEndX = Math.min(viewBox.width - 24, dropEndX + flatLength);

    const samples = 30;
    const curvePoints = Array.from({ length: samples + 1 }, (_, index) => {
      const t = index / samples;
      const x = dropStartX + dropWidth * t;
      const y = topY + (bottomY - topY) * (2 * t - t * t);
      return { x, y };
    });

    const curvePath = curvePoints
      .map((point) => `${point.x.toFixed(1)} ${point.y.toFixed(1)}`)
      .join(" L ");

    const path = `M ${plateauStartX} ${topY.toFixed(1)} L ${dropStartX} ${topY.toFixed(
      1,
    )} L ${curvePath} L ${flatEndX.toFixed(1)} ${bottomY.toFixed(1)}`;

    const carX = Math.min(flatEndX - 14, dropEndX + 16);
    const carY = bottomY;

    return {
      viewBox,
      topY,
      bottomY,
      plateauStartX,
      dropStartX,
      dropEndX,
      flatEndX,
      carX,
      carY,
      path,
    };
  }, [settings]);

  return (
    <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
      <div className={`${panelClass} p-6 sm:p-8`}>
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className={`text-sm uppercase tracking-[0.18em] ${mutedClass}`}>
              Interactive Lab
            </p>
            <h3 className={`mt-2 text-2xl font-semibold ${titleClass}`}>
              Roller Coaster Drop Simulator
            </h3>
          </div>
          <span className="rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">
            Live
          </span>
        </div>

        <p className={`mb-8 text-base leading-7 ${copyClass}`}>
          Adjust the drop height and the level-out length. The track redraws in
          real time. In this ideal-drop model, max speed follows v = sqrt(2gh),
          so it changes with vertical drop height, while the level-out length
          changes the transition radius and peak g-force at the bottom.
        </p>

        <div className="space-y-7">
          {controls.map((control) => (
            <label key={control.key} className="block">
              <div className="mb-3 flex items-center justify-between gap-4 text-sm">
                <span className={titleClass}>{control.label}</span>
                <span
                  className={`rounded-full px-3 py-1 ${
                    isDark
                      ? "bg-white/5 text-slate-300"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
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
                className={`h-2 w-full cursor-pointer appearance-none rounded-full ${
                  isDark
                    ? "bg-white/10 accent-cyan-300"
                    : "bg-slate-300/70 accent-sky-600"
                }`}
              />
              <div className={`mt-2 flex justify-between text-xs ${mutedClass}`}>
                <span>
                  {control.min} {control.unit}
                </span>
                <span>
                  {control.max} {control.unit}
                </span>
              </div>
            </label>
          ))}
        </div>

      </div>

      <div className={`${panelClass} relative overflow-hidden p-6 sm:p-8`}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-amber-300/10" />
        <div className="relative">
          <p className={`text-sm uppercase tracking-[0.18em] ${mutedClass}`}>
            Live Outputs
          </p>
          <h3 className={`mt-2 text-2xl font-semibold ${titleClass}`}>
            Changing Track Profile
          </h3>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <MetricCard
              label="Max speed"
              value={`${model.maxSpeed.toFixed(1)} m/s`}
              accent="cyan"
              isDark={isDark}
            />
            <MetricCard
              label="Peak g-force"
              value={`${model.peakGForce.toFixed(2)} g`}
              accent="rose"
              isDark={isDark}
            />
            <MetricCard
              label="Transition radius"
              value={`${model.transitionRadius.toFixed(1)} m`}
              accent="amber"
              isDark={isDark}
            />
            <MetricCard
              label="Ride feel"
              value={model.intensity}
              accent="emerald"
              isDark={isDark}
            />
          </div>

          <div
            className={`mt-8 rounded-[1.6rem] border p-5 ${
              isDark
                ? "border-white/10 bg-slate-950/70"
                : "border-slate-300/70 bg-white/90"
            }`}
          >
            <div className={`mb-4 flex items-center justify-between text-sm ${copyClass}`}>
              <span>Projected drop profile</span>
              <span>{model.entryAngle.toFixed(1)}° entry slope</span>
            </div>
            <svg
              viewBox={`0 0 ${track.viewBox.width} ${track.viewBox.height}`}
              className="h-56 w-full"
              role="img"
              aria-label="Interactive roller coaster drop profile"
            >
              <defs>
                <linearGradient id="trackGlow" x1="0%" x2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
                <marker
                  id="arrowTip"
                  markerWidth="8"
                  markerHeight="8"
                  refX="4"
                  refY="4"
                  orient="auto-start-reverse"
                >
                  <path d="M0,0 L8,4 L0,8 z" fill={isDark ? "#94a3b8" : "#64748b"} />
                </marker>
              </defs>

              <rect
                x="0"
                y="0"
                width={track.viewBox.width}
                height={track.viewBox.height}
                rx="22"
                fill={isDark ? "#020617" : "#f8fafc"}
              />

              {Array.from({ length: 7 }).map((_, index) => {
                const y = 28 + index * 26;
                return (
                  <line
                    key={`grid-y-${y}`}
                    x1="24"
                    y1={y}
                    x2="396"
                    y2={y}
                    stroke={isDark ? "rgba(148,163,184,0.14)" : "rgba(148,163,184,0.24)"}
                    strokeDasharray="4 8"
                  />
                );
              })}

              <line
                x1="24"
                y1={track.bottomY}
                x2="396"
                y2={track.bottomY}
                stroke={isDark ? "#334155" : "#94a3b8"}
                strokeWidth="2"
                strokeDasharray="6 8"
              />

              <path
                d={track.path}
                stroke="url(#trackGlow)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              <path
                d={track.path}
                stroke={isDark ? "rgba(255,255,255,0.24)" : "rgba(15,23,42,0.16)"}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />

              <line
                x1="32"
                y1={track.topY}
                x2="32"
                y2={track.bottomY}
                stroke={isDark ? "#94a3b8" : "#64748b"}
                strokeWidth="2"
                strokeDasharray="4 6"
                markerStart="url(#arrowTip)"
                markerEnd="url(#arrowTip)"
              />
              <text
                x="42"
                y={(track.topY + track.bottomY) / 2}
                fill={isDark ? "#cbd5e1" : "#475569"}
                fontSize="12"
              >
                {settings.height} m
              </text>

              <line
                x1={track.dropStartX}
                y1={212}
                x2={track.dropEndX}
                y2={212}
                stroke={isDark ? "#94a3b8" : "#64748b"}
                strokeWidth="2"
                strokeDasharray="4 6"
                markerStart="url(#arrowTip)"
                markerEnd="url(#arrowTip)"
              />
              <text
                x={(track.dropStartX + track.dropEndX) / 2}
                y="228"
                textAnchor="middle"
                fill={isDark ? "#cbd5e1" : "#475569"}
                fontSize="12"
              >
                level-out {settings.levelOutLength} m
              </text>

              <circle cx={track.dropStartX} cy={track.topY} r="6" fill="#f8fafc" />
              <circle cx={track.dropEndX} cy={track.bottomY} r="7" fill="#fbbf24" />

              <g transform={`translate(${track.carX}, ${track.carY - 12})`}>
                <rect x="-14" y="-10" width="28" height="12" rx="6" fill="#f8fafc" />
                <circle cx="-8" cy="4" r="4" fill={isDark ? "#cbd5e1" : "#64748b"} />
                <circle cx="8" cy="4" r="4" fill={isDark ? "#cbd5e1" : "#64748b"} />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ label, value, accent, isDark }) => {
  const accents = {
    cyan: isDark
      ? {
          card: "border-cyan-300/10 from-cyan-400/20 to-cyan-400/5",
          label: "text-cyan-100/80",
          value: "text-white",
        }
      : {
          card: "border-cyan-200 bg-gradient-to-br from-cyan-100 via-white to-sky-50 shadow-[0_14px_32px_rgba(14,165,233,0.10)]",
          label: "text-cyan-700",
          value: "text-slate-900",
        },
    amber: isDark
      ? {
          card: "border-amber-300/10 from-amber-300/20 to-amber-300/5",
          label: "text-amber-100/80",
          value: "text-white",
        }
      : {
          card: "border-amber-200 bg-gradient-to-br from-amber-100 via-white to-yellow-50 shadow-[0_14px_32px_rgba(245,158,11,0.10)]",
          label: "text-amber-700",
          value: "text-slate-900",
        },
    rose: isDark
      ? {
          card: "border-rose-300/10 from-rose-400/20 to-rose-400/5",
          label: "text-rose-100/80",
          value: "text-white",
        }
      : {
          card: "border-rose-200 bg-gradient-to-br from-rose-100 via-white to-pink-50 shadow-[0_14px_32px_rgba(244,63,94,0.10)]",
          label: "text-rose-700",
          value: "text-slate-900",
        },
    emerald: isDark
      ? {
          card: "border-emerald-300/10 from-emerald-300/20 to-emerald-300/5",
          label: "text-emerald-100/80",
          value: "text-white",
        }
      : {
          card: "border-emerald-200 bg-gradient-to-br from-emerald-100 via-white to-teal-50 shadow-[0_14px_32px_rgba(16,185,129,0.10)]",
          label: "text-emerald-700",
          value: "text-slate-900",
        },
  };

  const accentStyles = accents[accent];

  return (
    <div
      className={`rounded-[1.5rem] border p-5 ${accentStyles.card}`}
    >
      <p className={`text-xs uppercase tracking-[0.18em] ${accentStyles.label}`}>{label}</p>
      <p className={`mt-3 text-2xl font-semibold ${accentStyles.value}`}>{value}</p>
    </div>
  );
};

export default SimulatorPanel;
