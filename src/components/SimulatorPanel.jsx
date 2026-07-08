import { useMemo, useState } from "react";

const GRAVITY = 9.81;
const METERS_PER_SECOND_TO_MPH = 2.23694;
const METERS_PER_FOOT = 0.3048;
const FEET_PER_METER = 1 / METERS_PER_FOOT;
const AIR_DENSITY = 1.225;
const TRAIN_MASS = 6500;
const MAX_DROP_HEIGHT_FEET = 1000;
const MAX_DROP_HEIGHT_METERS = MAX_DROP_HEIGHT_FEET / FEET_PER_METER;

const feetToMeters = (feet) => feet * METERS_PER_FOOT;

const unitSystems = {
  imperial: {
    label: "Feet",
    lengthUnit: "ft",
    fromMeters: (meters) => meters * FEET_PER_METER,
    toMeters: feetToMeters,
  },
  metric: {
    label: "Meters",
    lengthUnit: "m",
    fromMeters: (meters) => meters,
    toMeters: (meters) => meters,
  },
};

const unitOptions = [
  {
    key: "imperial",
    label: "Feet",
  },
  {
    key: "metric",
    label: "Meters",
  },
];

const frictionProfiles = [
  {
    key: "low",
    label: "Low",
    rollingResistance: 0.0035,
    dragArea: 3.9,
  },
  {
    key: "medium",
    label: "Medium",
    rollingResistance: 0.007,
    dragArea: 4.8,
  },
  {
    key: "high",
    label: "High",
    rollingResistance: 0.012,
    dragArea: 6.0,
  },
];

const frictionProfilesByKey = Object.fromEntries(
  frictionProfiles.map((profile) => [profile.key, profile]),
);

const controls = [
  {
    key: "height",
    label: "Drop height",
    hasMaximum: true,
  },
  {
    key: "levelOutLength",
    label: "Level-out length",
    hasMaximum: false,
  },
];

const controlsByKey = Object.fromEntries(
  controls.map((control) => [control.key, control]),
);

const formatInputValue = (meters, unitSystem) => {
  const unitConfig = unitSystems[unitSystem];
  const displayValue = unitConfig.fromMeters(meters);

  if (unitSystem === "imperial") {
    return `${Math.round(displayValue)}`;
  }

  return `${Number(displayValue.toFixed(1))}`;
};

const formatLength = (meters, unitSystem, decimals = unitSystem === "imperial" ? 0 : 1) => {
  const unitConfig = unitSystems[unitSystem];
  return `${unitConfig.fromMeters(meters).toFixed(decimals)} ${unitConfig.lengthUnit}`;
};

const getDropHeightLimitLabel = (unitSystem) => {
  if (unitSystem === "imperial") {
    return `${MAX_DROP_HEIGHT_FEET} ft`;
  }

  return `${MAX_DROP_HEIGHT_METERS.toFixed(1)} m`;
};

const getControlError = (control, displayValue, unitSystem) => {
  const unitConfig = unitSystems[unitSystem];

  if (!Number.isFinite(displayValue)) {
    return `Enter a number for ${control.label.toLowerCase()}.`;
  }

  if (displayValue < 0) {
    return `${control.label} cannot be negative.`;
  }

  if (displayValue === 0) {
    return `${control.label} must be greater than 0 ${unitConfig.lengthUnit}.`;
  }

  if (displayValue < 1) {
    return `${control.label} is too low. Minimum is 1 ${unitConfig.lengthUnit}.`;
  }

  const metersValue = unitConfig.toMeters(displayValue);

  if (control.key === "height" && metersValue > MAX_DROP_HEIGHT_METERS) {
    return `Drop height cannot be above ${getDropHeightLimitLabel(unitSystem)}.`;
  }

  return "";
};

const getSliderBounds = (control, metersValue, unitSystem) => {
  const unitConfig = unitSystems[unitSystem];
  const displayValue = unitConfig.fromMeters(metersValue);
  const minimum = 1;

  if (control.key === "height") {
    return {
      min: minimum,
      max: unitConfig.fromMeters(MAX_DROP_HEIGHT_METERS),
      maxLabel: getDropHeightLimitLabel(unitSystem),
    };
  }

  const defaultMax = unitSystem === "imperial" ? 1500 : 450;

  return {
    min: minimum,
    max: Math.max(defaultMax, Math.ceil(displayValue)),
    maxLabel: "No max",
  };
};

const SimulatorPanel = ({
  isDark,
  panelClass,
  subtlePanelClass,
  titleClass,
  copyClass,
  mutedClass,
  accentLabelClass,
}) => {
  const [unitSystem, setUnitSystem] = useState("imperial");
  const [settings, setSettings] = useState({
    height: feetToMeters(180),
    levelOutLength: feetToMeters(290),
    friction: "medium",
  });
  const [controlInputs, setControlInputs] = useState({
    height: "180",
    levelOutLength: "290",
  });
  const [controlErrors, setControlErrors] = useState({});

  const updateSettingFromDisplay = (key, nextDisplayValue) => {
    const control = controlsByKey[key];
    const error = getControlError(control, nextDisplayValue, unitSystem);

    setControlErrors((current) => ({
      ...current,
      [key]: error,
    }));

    if (error) {
      return;
    }

    const nextMetersValue = unitSystems[unitSystem].toMeters(nextDisplayValue);

    setSettings((current) => ({
      ...current,
      [key]: nextMetersValue,
    }));
  };

  const handleControlInputChange = (key, rawValue) => {
    setControlInputs((current) => ({
      ...current,
      [key]: rawValue,
    }));

    if (rawValue.trim() === "") {
      setControlErrors((current) => ({
        ...current,
        [key]: `Enter a number for ${controlsByKey[key].label.toLowerCase()}.`,
      }));
      return;
    }

    updateSettingFromDisplay(key, Number(rawValue));
  };

  const handleRangeChange = (key, nextDisplayValue) => {
    const inputValue = `${Math.round(nextDisplayValue)}`;

    setControlInputs((current) => ({
      ...current,
      [key]: inputValue,
    }));
    updateSettingFromDisplay(key, nextDisplayValue);
  };

  const handleUnitSystemChange = (nextUnitSystem) => {
    setUnitSystem(nextUnitSystem);
    setControlInputs({
      height: formatInputValue(settings.height, nextUnitSystem),
      levelOutLength: formatInputValue(settings.levelOutLength, nextUnitSystem),
    });
    setControlErrors({});
  };

  const model = useMemo(() => {
    const { height, levelOutLength, friction } = settings;
    const frictionProfile = frictionProfilesByKey[friction];
    const segments = 240;
    const dragCoefficient =
      (AIR_DENSITY * frictionProfile.dragArea) / (2 * TRAIN_MASS);

    let speedSquared = 0;
    for (let index = 0; index < segments; index += 1) {
      const t0 = index / segments;
      const t1 = (index + 1) / segments;
      const x0 = levelOutLength * t0;
      const x1 = levelOutLength * t1;
      const z0 = height * (1 - t0) ** 2;
      const z1 = height * (1 - t1) ** 2;
      const dx = x1 - x0;
      const dz = z0 - z1;
      const ds = Math.hypot(dx, dz);
      const sinTheta = ds === 0 ? 0 : dz / ds;
      const cosTheta = ds === 0 ? 1 : dx / ds;
      const rollingAccel = frictionProfile.rollingResistance * GRAVITY * cosTheta;
      const dragAccel = dragCoefficient * speedSquared;
      const tangentialAccel = GRAVITY * sinTheta - rollingAccel - dragAccel;
      const nextSpeedSquared = Math.max(0, speedSquared + 2 * tangentialAccel * ds);
      speedSquared = nextSpeedSquared;
    }

    const maxSpeed = Math.sqrt(speedSquared);
    const maxSpeedMph = maxSpeed * METERS_PER_SECOND_TO_MPH;
    const transitionRadius = (levelOutLength ** 2) / (2 * height);
    const peakGForce = 1 + maxSpeed ** 2 / (transitionRadius * GRAVITY);
    const entryAngle = (Math.atan((2 * height) / levelOutLength) * 180) / Math.PI;

    let intensity = "Comfortable";
    if (peakGForce >= 2.8) intensity = "Intense";
    if (peakGForce >= 4) intensity = "Extreme";

    return {
      maxSpeed,
      maxSpeedMph,
      transitionRadius,
      peakGForce,
      entryAngle,
      intensity,
      frictionLabel: frictionProfile.label,
    };
  }, [settings]);

  const track = useMemo(() => {
    const viewBox = { width: 420, height: 240 };
    const topPadding = 28;
    const bottomY = 184;
    const plateauStartX = 28;
    const dropStartX = 94;
    const maxHeightPx = 128;
    const visualMaxHeight = feetToMeters(400);
    const visualMaxLength = feetToMeters(900);
    const heightRatio = Math.min(1, Math.max(0, settings.height / visualMaxHeight));
    const lengthRatio = Math.min(1, Math.max(0, settings.levelOutLength / visualMaxLength));

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
    <div className="grid items-start gap-8 xl:grid-cols-[0.95fr_1.05fr]">
      <div className={`${panelClass} p-6 sm:p-8`}>
        <div className="mb-8">
          <div>
            <p className={`text-sm uppercase tracking-[0.18em] ${mutedClass}`}>
              Interactive Lab
            </p>
            <h3 className={`mt-2 text-2xl font-semibold ${titleClass}`}>
              Roller Coaster Drop Simulator
            </h3>
          </div>
        </div>

        <p className={`mb-8 text-base leading-7 ${copyClass}`}>
          Adjust the drop height and the level-out length.
        </p>

        <div className="space-y-7">
          {controls.map((control) => {
            const unitConfig = unitSystems[unitSystem];
            const displayValue = unitConfig.fromMeters(settings[control.key]);
            const sliderBounds = getSliderBounds(control, settings[control.key], unitSystem);
            const maxDisplayValue =
              control.key === "height"
                ? unitConfig.fromMeters(MAX_DROP_HEIGHT_METERS)
                : undefined;
            const error = controlErrors[control.key];

            return (
              <label key={control.key} className="block">
                <div className="mb-3 flex items-center justify-between gap-4 text-sm">
                  <span className={titleClass}>{control.label}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      inputMode="decimal"
                      min="0"
                      max={maxDisplayValue}
                      step="any"
                      value={controlInputs[control.key]}
                      onChange={(event) =>
                        handleControlInputChange(control.key, event.target.value)
                      }
                      className={`w-28 rounded-full border px-3 py-1 text-right font-semibold outline-none transition sm:w-32 ${
                        error
                          ? isDark
                            ? "border-amber-300/60 bg-amber-300/10 text-amber-100 focus:border-amber-200"
                            : "border-amber-400 bg-amber-50 text-amber-900 focus:border-amber-500"
                          : isDark
                            ? "border-white/10 bg-white/5 text-slate-100 focus:border-cyan-300/40"
                            : "border-slate-300/85 bg-white/95 text-slate-900 focus:border-sky-500"
                      }`}
                      aria-label={`${control.label} input`}
                    />
                    <select
                      value={unitSystem}
                      onChange={(event) => handleUnitSystemChange(event.target.value)}
                      className={`w-24 rounded-full border px-3 py-1 text-sm font-semibold outline-none transition ${
                        isDark
                          ? "border-white/10 bg-slate-950 text-slate-100 focus:border-cyan-300/40"
                          : "border-slate-300/85 bg-white/95 text-slate-700 focus:border-sky-500"
                      }`}
                      aria-label={`${control.label} units`}
                    >
                      {unitOptions.map((option) => (
                        <option key={option.key} value={option.key}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <input
                  type="range"
                  min={sliderBounds.min}
                  max={sliderBounds.max}
                  step="1"
                  value={Math.min(sliderBounds.max, Math.max(sliderBounds.min, Math.round(displayValue)))}
                  onChange={(event) =>
                    handleRangeChange(control.key, Number(event.target.value))
                  }
                  className={`h-2 w-full cursor-pointer appearance-none rounded-full ${
                    isDark
                      ? "bg-white/10 accent-cyan-300"
                      : "bg-slate-300/80 accent-sky-700"
                  }`}
                />
                <div className={`mt-2 flex justify-between text-xs ${mutedClass}`}>
                  <span>
                    {sliderBounds.min} {unitConfig.lengthUnit}
                  </span>
                  <span>{sliderBounds.maxLabel}</span>
                </div>
                {error ? (
                  <p className={`mt-2 text-xs font-semibold ${isDark ? "text-amber-200" : "text-amber-700"}`}>
                    {error}
                  </p>
                ) : null}
              </label>
            );
          })}

          <div>
            <div className="mb-3 flex items-center justify-between gap-4 text-sm">
              <span className={titleClass}>Friction</span>
              <span className={`text-xs font-semibold uppercase tracking-[0.12em] ${mutedClass}`}>
                {model.frictionLabel}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {frictionProfiles.map((profile) => {
                const active = settings.friction === profile.key;

                return (
                  <button
                    key={profile.key}
                    type="button"
                    onClick={() =>
                      setSettings((current) => ({
                        ...current,
                        friction: profile.key,
                      }))
                    }
                    className={`rounded-full border px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? isDark
                          ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-100"
                          : "border-sky-300 bg-sky-50 text-sky-700"
                        : isDark
                          ? "border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.07]"
                          : "border-slate-300/75 bg-white/72 text-slate-700 hover:bg-white/95"
                    }`}
                  >
                    {profile.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      <div className={`${panelClass} relative overflow-hidden p-6 sm:p-8`}>
        {isDark ? (
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-amber-300/10" />
        ) : null}
        <div className="relative">
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard
              label="Max speed"
              value={
                unitSystem === "imperial"
                  ? `${model.maxSpeedMph.toFixed(1)} mph`
                  : `${model.maxSpeed.toFixed(1)} m/s`
              }
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
              value={formatLength(model.transitionRadius, unitSystem)}
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
                : "border-slate-300/75 bg-white/88"
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
                {formatLength(settings.height, unitSystem)}
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
                level-out {formatLength(settings.levelOutLength, unitSystem)}
              </text>

              <circle cx={track.dropStartX} cy={track.topY} r="6" fill="#f8fafc" />
              <circle cx={track.dropEndX} cy={track.bottomY} r="7" fill="#fbbf24" />

              <g transform={`translate(${track.carX}, ${track.carY - 12})`}>
                <rect x="-14" y="-10" width="28" height="12" rx="6" fill="#f8fafc" />
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
          card: "border-slate-300/70 bg-slate-50/94 shadow-[0_14px_30px_rgba(148,163,184,0.1)]",
          label: "text-slate-500",
          value: "text-slate-900",
        },
    amber: isDark
      ? {
          card: "border-amber-300/10 from-amber-300/20 to-amber-300/5",
          label: "text-amber-100/80",
          value: "text-white",
        }
      : {
          card: "border-slate-300/70 bg-slate-50/94 shadow-[0_14px_30px_rgba(148,163,184,0.1)]",
          label: "text-slate-500",
          value: "text-slate-900",
        },
    rose: isDark
      ? {
          card: "border-rose-300/10 from-rose-400/20 to-rose-400/5",
          label: "text-rose-100/80",
          value: "text-white",
        }
      : {
          card: "border-slate-300/70 bg-slate-50/94 shadow-[0_14px_30px_rgba(148,163,184,0.1)]",
          label: "text-slate-500",
          value: "text-slate-900",
        },
    emerald: isDark
      ? {
          card: "border-emerald-300/10 from-emerald-300/20 to-emerald-300/5",
          label: "text-emerald-100/80",
          value: "text-white",
        }
      : {
          card: "border-slate-300/70 bg-slate-50/94 shadow-[0_14px_30px_rgba(148,163,184,0.1)]",
          label: "text-slate-500",
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
