import { useEffect, useRef, useState } from "react";
import SimulatorPanel from "./components/SimulatorPanel";
import SiteFooter from "./components/SiteFooter";

const Fraction = ({ numerator, denominator }) => {
  return (
    <span className="inline-flex flex-col items-center align-middle leading-none">
      <span className="px-1">{numerator}</span>
      <span className="mt-1 w-full border-t-2 border-current" />
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

const Radical = ({ children }) => {
  return (
    <span className="physics-radical">
      <span className="physics-radical-sign">√</span>
      <span className="physics-radical-content">{children}</span>
    </span>
  );
};

const escapeHtml = (text) =>
  text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const wrapRadicals = (text) => {
  let result = "";

  for (let index = 0; index < text.length; index += 1) {
    if (text[index] === "√" && text[index + 1] === "(") {
      let depth = 0;
      let endIndex = index + 1;

      for (; endIndex < text.length; endIndex += 1) {
        if (text[endIndex] === "(") depth += 1;
        if (text[endIndex] === ")") {
          depth -= 1;
          if (depth === 0) break;
        }
      }

      if (depth === 0 && endIndex < text.length) {
        const radicand = text.slice(index + 2, endIndex);
        result += `<span class="physics-radical"><span class="physics-radical-sign">√</span><span class="physics-radical-content">${radicand}</span></span>`;
        index = endIndex;
        continue;
      }
    }

    result += text[index];
  }

  return result;
};

const formatPhysicsMarkup = (text) => {
  const replacements = [
    [/sqrt/g, "√"],
    [/one-half/g, "½"],
    [/vxt/g, "v<sub>x</sub>t"],
    [/(?<![A-Za-z])τnet(?![A-Za-z])/g, "τ<sub>net</sub>"],
    [/(?<![A-Za-z])Krot(?![A-Za-z])/g, "K<sub>rot</sub>"],
    [/(?<![A-Za-z])Ktotal(?![A-Za-z])/g, "K<sub>total</sub>"],
    [/(?<![A-Za-z])Fnet,inward(?![A-Za-z])/g, "F<sub>c</sub>"],
    [/(?<![A-Za-z])Fc(?![A-Za-z])/g, "F<sub>c</sub>"],
    [/(?<![A-Za-z])Fnet(?![A-Za-z])/g, "F<sub>net</sub>"],
    [/(?<![A-Za-z])Favg(?![A-Za-z])/g, "F<sub>avg</sub>"],
    [/(?<![A-Za-z])Fg(?![A-Za-z])/g, "F<sub>g</sub>"],
    [/(?<![A-Za-z])Wnet(?![A-Za-z])/g, "W<sub>net</sub>"],
    [/(?<![A-Za-z])W_nc(?![A-Za-z])/g, "W<sub>nc</sub>"],
    [/(?<![A-Za-z])ΔE_mech(?![A-Za-z])/g, "ΔE<sub>mech</sub>"],
    [/(?<![A-Za-z])Emech(?![A-Za-z])/g, "E<sub>mech</sub>"],
    [/(?<![A-Za-z])Ug(?![A-Za-z])/g, "U<sub>g</sub>"],
    [/(?<![A-Za-z])vavg(?![A-Za-z])/g, "v<sub>avg</sub>"],
    [/(?<![A-Za-z])aavg(?![A-Za-z])/g, "a<sub>avg</sub>"],
    [/(?<![A-Za-z])a_c(?![A-Za-z])/g, "a<sub>c</sub>"],
    [/(?<![A-Za-z])ac(?![A-Za-z])/g, "a<sub>c</sub>"],
    [/v0/g, "v<sub>0</sub>"],
    [/x0/g, "x<sub>0</sub>"],
    [/(?<![A-Za-z])vf(?![A-Za-z])/g, "v<sub>f</sub>"],
    [/(?<![A-Za-z])vi(?![A-Za-z])/g, "v<sub>i</sub>"],
    [/(?<![A-Za-z])pf(?![A-Za-z])/g, "p<sub>f</sub>"],
    [/(?<![A-Za-z])pi(?![A-Za-z])/g, "p<sub>i</sub>"],
  ];

  return wrapRadicals(
    replacements.reduce(
      (result, [pattern, replacement]) => result.replace(pattern, replacement),
      escapeHtml(text),
    ),
  );
};

const FormattedPhysicsText = ({ as: Component = "span", className, text }) => (
  <Component
    className={className}
    dangerouslySetInnerHTML={{ __html: formatPhysicsMarkup(text) }}
  />
);

const equation = (label, expression) => ({ label, expression });

const card = (title, text) => ({ title, text });

const figure = (title, render, description) => ({
  title,
  render,
  description,
});

const HeroCollagePhoto = ({ src, alt, isDark, className = "", imageClassName = "" }) => {
  return (
    <div
      className={`overflow-hidden rounded-[1.25rem] border-[6px] shadow-[0_18px_38px_rgba(15,23,42,0.13)] ${
        isDark ? "border-slate-100/85 bg-slate-100/95" : "border-white/95 bg-white/95"
      } ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className={`h-full w-full rounded-[0.8rem] object-cover ${imageClassName}`}
      />
    </div>
  );
};

const HeroCollage = ({ isDark }) => {
  const glowPrimaryClass = isDark ? "bg-cyan-300/16" : "bg-cyan-200/55";
  const glowSecondaryClass = isDark ? "bg-sky-300/12" : "bg-sky-100/50";
  const mobilePhotos = [
    {
      src: "/hero-coaster-frame.png",
      alt: "Roller coaster train descending a blue track curve",
      className: "col-span-2 rotate-[2deg] sm:col-span-4",
      imageClassName: "aspect-[16/10]",
    },
    {
      src: "/mako-drop.png",
      alt: "Tall roller coaster drop against a blue sky",
      className: "hidden rotate-[-5deg] sm:col-span-2 sm:block",
      imageClassName: "aspect-[4/5]",
    },
    {
      src: "/hero-collage-superman.png",
      alt: "Red and blue roller coaster train cresting a hill",
      className: "col-span-2 rotate-[-4deg] sm:col-span-3",
      imageClassName: "aspect-[6/4]",
    },
    {
      src: "/hero-collage-white-loop.png",
      alt: "White roller coaster inversion against a clear blue sky",
      className: "hidden rotate-[4deg] sm:col-span-3 sm:block",
      imageClassName: "aspect-[6/5]",
    },
    {
      src: "/hero-collage-red-inversion.png",
      alt: "Red roller coaster train diving through a tight inversion",
      className: "col-span-1 rotate-[5deg] sm:col-span-2",
      imageClassName: "aspect-[5/4]",
    },
    {
      src: "/hero-collage-wood-sunset.png",
      alt: "Wooden roller coaster train cresting a hill at sunset",
      className: "col-span-1 rotate-[-3deg] sm:col-span-2",
      imageClassName: "aspect-[6/5]",
    },
    {
      src: "/hero-collage-loop-blue.png",
      alt: "Blue roller coaster loop with train entering the element",
      className: "hidden rotate-[6deg] sm:col-span-2 sm:block",
      imageClassName: "aspect-[4/5]",
    },
    {
      src: "/hero-collage-blue-crest-wide.png",
      alt: "Blue coaster train cresting a hill against a bright sky",
      className: "hidden rotate-[-2deg] sm:col-span-4 sm:block",
      imageClassName: "aspect-[16/9]",
    },
    {
      src: "/hero-collage-orange-turn.png",
      alt: "Orange coaster train carving through a banked turn",
      className: "hidden rotate-[4deg] sm:col-span-2 sm:block",
      imageClassName: "aspect-[6/5]",
    },
  ];
  const desktopPhotos = [
    {
      src: "/mako-drop.png",
      alt: "Tall roller coaster drop against a blue sky",
      className: "absolute left-[4%] top-[1.25rem] z-10 w-[23%] rotate-[-7deg]",
      imageClassName: "aspect-[4/5]",
    },
    {
      src: "/hero-collage-red-loop-tower.png",
      alt: "Roller coaster train diving beside a red vertical loop structure",
      className: "absolute left-[25%] top-[0.75rem] z-20 w-[24%] rotate-[3deg]",
      imageClassName: "aspect-[4/6]",
    },
    {
      src: "/hero-collage-loop-blue.png",
      alt: "Blue roller coaster loop with train entering the element",
      className: "absolute right-[-2%] top-[0.75rem] z-20 w-[25%] rotate-[6deg]",
      imageClassName: "aspect-[4/5]",
    },
    {
      src: "/hero-coaster-frame.png",
      alt: "Roller coaster train descending a blue track curve",
      className: "absolute right-[-4%] top-[8rem] z-40 w-[48%] rotate-[1.5deg]",
      imageClassName: "aspect-[16/10]",
    },
    {
      src: "/hero-collage-superman.png",
      alt: "Red and blue roller coaster train cresting a hill",
      className: "absolute left-[-4%] top-[11.25rem] z-20 w-[35%] rotate-[-5deg]",
      imageClassName: "aspect-[6/4]",
    },
    {
      src: "/hero-collage-blue-crest-wide.png",
      alt: "Blue coaster train cresting a hill against a bright sky",
      className: "absolute left-[18%] top-[12.25rem] z-30 w-[50%] rotate-[-2deg]",
      imageClassName: "aspect-[16/9]",
    },
    {
      src: "/hero-collage-inverted-train.png",
      alt: "Inverted coaster train sweeping across a deep blue sky",
      className: "absolute right-[5%] top-[18.5rem] z-20 w-[30.5%] rotate-[-3deg]",
      imageClassName: "aspect-[16/10]",
    },
    {
      src: "/hero-collage-red-inversion.png",
      alt: "Red roller coaster train diving through a tight inversion",
      className: "absolute left-[50%] bottom-[12.25rem] z-30 w-[28.5%] rotate-[4deg]",
      imageClassName: "aspect-[5/4]",
    },
    {
      src: "/hero-collage-orange-turn.png",
      alt: "Orange coaster train carving through a banked turn",
      className: "absolute left-[16%] bottom-[13.5rem] z-20 w-[26%] rotate-[-4deg]",
      imageClassName: "aspect-[6/5]",
    },
    {
      src: "/hero-collage-wood-sunset.png",
      alt: "Wooden roller coaster train cresting a hill at sunset",
      className: "absolute left-[4%] bottom-[6rem] z-10 w-[26%] rotate-[-4deg]",
      imageClassName: "aspect-[6/5]",
    },
    {
      src: "/hero-collage-vegas-glider.png",
      alt: "Green coaster car gliding above a city skyline at sunset",
      className: "absolute left-[27%] bottom-[6rem] z-20 w-[33.5%] rotate-[2deg]",
      imageClassName: "aspect-[16/10]",
    },
    {
      src: "/hero-collage-white-loop.png",
      alt: "White roller coaster inversion against a clear blue sky",
      className: "absolute right-[-3%] bottom-[6rem] z-20 w-[30%] rotate-[4deg]",
      imageClassName: "aspect-[6/5]",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[52rem] lg:max-w-[58rem]">
      <div className={`absolute right-[12%] top-[14%] h-44 w-44 rounded-full blur-[84px] ${glowPrimaryClass}`} />
      <div className={`absolute left-[20%] bottom-[10%] h-52 w-52 rounded-full blur-[108px] ${glowSecondaryClass}`} />

      <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4 lg:hidden">
        {mobilePhotos.map((photo) => (
          <HeroCollagePhoto
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            isDark={isDark}
            className={photo.className}
            imageClassName={photo.imageClassName}
          />
        ))}
      </div>

      <div className="relative hidden h-[45rem] lg:block">
        {desktopPhotos.map((photo) => (
          <HeroCollagePhoto
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            isDark={isDark}
            className={photo.className}
            imageClassName={photo.imageClassName}
          />
        ))}
      </div>
    </div>
  );
};

const SettingsControl = ({
  className = "",
  copyClass,
  isDark,
  mutedClass,
  panelClass,
  settingsOpen,
  setSettingsOpen,
  settingsRef,
  setTheme,
  subtlePanelClass,
  theme,
  titleClass,
}) => {
  return (
    <div ref={settingsRef} className={`relative z-[70] ${className}`}>
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
          className={`absolute right-0 top-[calc(100%+0.75rem)] z-[80] w-72 rounded-3xl border p-4 ${panelClass}`}
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
              aria-pressed={theme !== "dark"}
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
  );
};

const FlatTrackCartDiagram = ({ isDark }) => {
  const lineColor = isDark ? "#94a3b8" : "#64748b";
  const panelFill = isDark ? "#0f172a" : "#f8fafc";
  const cartFill = isDark ? "#22d3ee" : "#38bdf8";
  const wheelFill = isDark ? "#cbd5e1" : "#475569";
  const accentFill = isDark ? "#f8fafc" : "#ffffff";

  return (
    <svg viewBox="0 0 320 180" className="h-48 w-full" role="img" aria-label="Roller coaster cart on a flat track">
      <rect x="0" y="0" width="320" height="180" rx="24" fill={panelFill} />
      <line x1="40" y1="128" x2="280" y2="128" stroke={lineColor} strokeWidth="6" strokeLinecap="round" />
      <rect x="110" y="86" width="100" height="28" rx="12" fill={cartFill} />
      <rect x="125" y="72" width="70" height="18" rx="9" fill={accentFill} opacity="0.95" />
      <circle cx="132" cy="128" r="12" fill={wheelFill} />
      <circle cx="188" cy="128" r="12" fill={wheelFill} />
      <circle cx="132" cy="128" r="4" fill={accentFill} />
      <circle cx="188" cy="128" r="4" fill={accentFill} />
    </svg>
  );
};

const FlatTrackFreeBodyDiagram = ({ isDark }) => {
  const panelFill = isDark ? "#0f172a" : "#f8fafc";
  const bodyFill = isDark ? "#f8fafc" : "#0f172a";
  const forceColor = isDark ? "#22d3ee" : "#0284c7";
  const textColor = isDark ? "#e2e8f0" : "#334155";

  return (
    <svg viewBox="0 0 320 180" className="h-48 w-full" role="img" aria-label="Free-body diagram of a coaster cart on a flat track">
      <rect x="0" y="0" width="320" height="180" rx="24" fill={panelFill} />
      <circle cx="160" cy="90" r="11" fill={bodyFill} />

      <line x1="160" y1="78" x2="160" y2="42" stroke={forceColor} strokeWidth="5" strokeLinecap="round" />
      <polygon points="160,30 150,48 170,48" fill={forceColor} />
      <text x="178" y="48" fill={textColor} fontSize="18" fontWeight="600">
        N
      </text>

      <line x1="160" y1="102" x2="160" y2="138" stroke={forceColor} strokeWidth="5" strokeLinecap="round" />
      <polygon points="160,150 150,132 170,132" fill={forceColor} />
      <text x="178" y="146" fill={textColor} fontSize="18" fontWeight="600">
        mg
      </text>
    </svg>
  );
};

const KinematicsVelocityGraph = ({ isDark }) => {
  const axisColor = isDark ? "#94a3b8" : "#64748b";
  const labelColor = isDark ? "#e2e8f0" : "#334155";
  const gridColor = isDark ? "rgba(148,163,184,0.18)" : "rgba(148,163,184,0.28)";
  const lineColor = isDark ? "#22d3ee" : "#0284c7";
  const pointFill = isDark ? "#f8fafc" : "#0f172a";

  return (
    <svg
      viewBox="0 0 320 220"
      className="h-64 w-full"
      role="img"
      aria-label="Velocity-time graph with constant positive slope and labeled axes"
    >
      <rect x="0" y="0" width="320" height="220" rx="24" fill="transparent" />

      {[0, 1, 2, 3, 4, 5].map((tick) => {
        const x = 56 + tick * 42;
        return (
          <g key={`x-${tick}`}>
            <line x1={x} y1="26" x2={x} y2="176" stroke={gridColor} strokeWidth="1.5" />
            <line x1={x} y1="176" x2={x} y2="182" stroke={axisColor} strokeWidth="2" />
            <text x={x} y="198" textAnchor="middle" fill={labelColor} fontSize="13" fontWeight="600">
              {tick}
            </text>
          </g>
        );
      })}

      {[0, 4, 8, 12, 16].map((tick, index) => {
        const y = 176 - index * 37.5;
        return (
          <g key={`y-${tick}`}>
            <line x1="56" y1={y} x2="272" y2={y} stroke={gridColor} strokeWidth="1.5" />
            <line x1="50" y1={y} x2="56" y2={y} stroke={axisColor} strokeWidth="2" />
            <text x="40" y={y + 4} textAnchor="end" fill={labelColor} fontSize="13" fontWeight="600">
              {tick}
            </text>
          </g>
        );
      })}

      <line x1="56" y1="176" x2="280" y2="176" stroke={axisColor} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="56" y1="184" x2="56" y2="20" stroke={axisColor} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="286,176 274,170 274,182" fill={axisColor} />
      <polygon points="56,14 50,26 62,26" fill={axisColor} />

      <line x1="56" y1="138.5" x2="266" y2="44.75" stroke={lineColor} strokeWidth="5" strokeLinecap="round" />
      <circle cx="56" cy="138.5" r="5.5" fill={pointFill} stroke={lineColor} strokeWidth="3" />
      <circle cx="266" cy="44.75" r="5.5" fill={pointFill} stroke={lineColor} strokeWidth="3" />

      <text x="168" y="214" textAnchor="middle" fill={labelColor} fontSize="14" fontWeight="600">
        Time (s)
      </text>
      <text
        x="18"
        y="102"
        textAnchor="middle"
        fill={labelColor}
        fontSize="14"
        fontWeight="600"
        transform="rotate(-90 18 102)"
      >
        Velocity (m/s)
      </text>
    </svg>
  );
};

const SlopeCartDiagram = ({ isDark }) => {
  const panelFill = isDark ? "#0f172a" : "#f8fafc";
  const panelGlow = isDark ? "rgba(148,163,184,0.1)" : "rgba(255,255,255,0.95)";
  const trackColor = isDark ? "#94a3b8" : "#64748b";
  const cartFill = isDark ? "#22d3ee" : "#38bdf8";
  const wheelFill = isDark ? "#475569" : "#475569";
  const accentFill = isDark ? "#f8fafc" : "#ffffff";
  const textColor = isDark ? "#e2e8f0" : "#334155";

  return (
    <svg viewBox="0 0 320 180" className="h-48 w-full" role="img" aria-label="Roller coaster cart on a sloped track">
      <defs>
        <radialGradient id="slopeGlow" cx="50%" cy="42%" r="78%">
          <stop offset="0%" stopColor={panelGlow} />
          <stop offset="100%" stopColor={panelFill} />
        </radialGradient>
      </defs>

      <rect x="0" y="0" width="320" height="180" rx="24" fill="url(#slopeGlow)" />

      <line
        x1="0"
        y1="161"
        x2="300"
        y2="77"
        stroke={trackColor}
        strokeWidth="6"
        strokeLinecap="round"
        opacity="0.92"
      />

      <g transform="translate(116 111) rotate(-15)">
        <rect x="-52" y="-26" width="104" height="32" rx="14" fill={cartFill} />
        <rect x="-26" y="-40" width="56" height="18" rx="9" fill={accentFill} opacity="0.95" />
        <circle cx="-22" cy="4" r="11" fill={wheelFill} />
        <circle cx="24" cy="4" r="11" fill={wheelFill} />
        <circle cx="-22" cy="4" r="4.25" fill={accentFill} />
        <circle cx="24" cy="4" r="4.25" fill={accentFill} />
      </g>

      <line
        x1="18"
        y1="162"
        x2="68"
        y2="162"
        stroke={trackColor}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.82"
      />
      <path
        d="M44 162 A14 14 0 0 0 41.5 151.2"
        fill="none"
        stroke={trackColor}
        strokeWidth="2.5"
      />
      <text x="50" y="158" fill={textColor} fontSize="16" fontWeight="600">
        θ
      </text>
    </svg>
  );
};

const SlopeComponentsDiagram = () => {
  return (
    <div className="overflow-hidden rounded-[1.5rem] bg-white">
      <img
        src="/slope-components-reference.png"
        alt="Slope free-body diagram showing N, mg, mg sin theta, and mg cos theta"
        className="h-48 w-full object-cover"
      />
    </div>
  );
};

const DipForceDiagram = ({ isDark }) => {
  const circleColor = isDark ? "#94a3b8" : "#94a3b8";
  const bodyFill = isDark ? "#f8fafc" : "#0f172a";
  const forceColor = isDark ? "#22d3ee" : "#0284c7";
  const gravityColor = isDark ? "#fbbf24" : "#d97706";
  const textColor = isDark ? "#e2e8f0" : "#334155";

  return (
    <svg viewBox="0 0 320 220" className="h-56 w-full" role="img" aria-label="Free-body diagram at the bottom of a dip">
      <circle cx="160" cy="106" r="72" fill="none" stroke={circleColor} strokeWidth="3" opacity="0.65" />
      <circle cx="160" cy="178" r="10" fill={bodyFill} />

      <line x1="160" y1="168" x2="160" y2="128" stroke={forceColor} strokeWidth="5" strokeLinecap="round" />
      <polygon points="160,116 150,134 170,134" fill={forceColor} />
      <text x="176" y="132" fill={textColor} fontSize="18" fontWeight="600">
        N
      </text>

      <line x1="160" y1="188" x2="160" y2="210" stroke={gravityColor} strokeWidth="5" strokeLinecap="round" />
      <polygon points="160,218 150,200 170,200" fill={gravityColor} />
      <text x="176" y="210" fill={textColor} fontSize="18" fontWeight="600">
        mg
      </text>
    </svg>
  );
};

const HillForceDiagram = ({ isDark }) => {
  const circleColor = isDark ? "#94a3b8" : "#94a3b8";
  const bodyFill = isDark ? "#f8fafc" : "#0f172a";
  const forceColor = isDark ? "#22d3ee" : "#0284c7";
  const gravityColor = isDark ? "#fbbf24" : "#d97706";
  const textColor = isDark ? "#e2e8f0" : "#334155";

  return (
    <svg viewBox="0 0 320 220" className="h-56 w-full" role="img" aria-label="Free-body diagram at the top of a hill">
      <circle cx="160" cy="114" r="72" fill="none" stroke={circleColor} strokeWidth="3" opacity="0.65" />
      <circle cx="160" cy="42" r="10" fill={bodyFill} />

      <line x1="160" y1="32" x2="160" y2="10" stroke={forceColor} strokeWidth="5" strokeLinecap="round" />
      <polygon points="160,0 150,18 170,18" fill={forceColor} />
      <text x="176" y="18" fill={textColor} fontSize="18" fontWeight="600">
        N
      </text>

      <line x1="160" y1="52" x2="160" y2="92" stroke={gravityColor} strokeWidth="5" strokeLinecap="round" />
      <polygon points="160,104 150,86 170,86" fill={gravityColor} />
      <text x="176" y="88" fill={textColor} fontSize="18" fontWeight="600">
        mg
      </text>
    </svg>
  );
};

const LoopTopForceDiagram = ({ isDark }) => {
  const circleColor = isDark ? "#94a3b8" : "#94a3b8";
  const bodyFill = isDark ? "#f8fafc" : "#0f172a";
  const gravityColor = isDark ? "#fbbf24" : "#d97706";
  const textColor = isDark ? "#e2e8f0" : "#334155";

  return (
    <svg viewBox="0 0 320 220" className="h-56 w-full" role="img" aria-label="Free-body diagram at the top of a loop">
      <circle cx="160" cy="114" r="72" fill="none" stroke={circleColor} strokeWidth="3" opacity="0.65" />
      <circle cx="160" cy="42" r="10" fill={bodyFill} />

      <line x1="160" y1="52" x2="160" y2="86" stroke={gravityColor} strokeWidth="5" strokeLinecap="round" />
      <polygon points="160,98 150,80 170,80" fill={gravityColor} />
      <text x="178" y="88" fill={textColor} fontSize="18" fontWeight="600">
        mg
      </text>
    </svg>
  );
};

const practiceQuestion = (
  prompt,
  choices,
  correctChoice,
  correctExplanation,
  incorrectExplanation,
  extras = {},
) => ({
  prompt,
  choices,
  correctChoice,
  correctExplanation,
  incorrectExplanation,
  ...extras,
});

const practiceSet = (...questions) => ({
  questions,
});

const quizQuestion = (
  question,
  choices,
  correctChoice,
  correctExplanation,
  incorrectExplanation,
) => ({
  question,
  choices,
  correctChoice,
  correctExplanation,
  incorrectExplanation,
});

const createStep = (id, label, title, config = {}) => ({
  id,
  label,
  title,
  ...config,
});

const getChapterName = (lessonTitle) =>
  lessonTitle.replace(/^Lesson\s+\d+:\s*/, "");

const createLesson = (title, subtitle, goal, steps) => {
  const chapterName = getChapterName(title);

  return {
    title,
    subtitle,
    goal,
    chapterName,
    steps: steps
      .filter((step) => step.id !== "next-lesson" && step.id !== "practice")
      .map((step) =>
        step.id === "quiz"
          ? {
              ...step,
              label: "Quiz",
              title: `${chapterName}: Quiz`,
            }
          : step,
      ),
  };
};

const sections = [
  {
    id: "kinematics",
    number: "1",
    title: "Kinematics",
    subtitle: "Describing Motion on the Track",
    topics: [
      "position, velocity, acceleration",
      "motion graphs",
      "projectile motion and airtime",
      "constant-acceleration equations",
    ],
  },
  {
    id: "forces",
    number: "2",
    title: "Forces and Newton's Laws",
    subtitle: "Explaining Why Motion Changes",
    topics: [
      "free-body diagrams",
      "weight and normal force",
      "Newton's laws",
      "force components on slopes",
    ],
  },
  {
    id: "energy",
    number: "3",
    title: "Energy",
    subtitle: "Height, Speed, and Conversion",
    topics: [
      "kinetic and potential energy",
      "energy conservation",
      "speed from height",
      "friction and real losses",
    ],
  },
  {
    id: "circular-motion",
    number: "4",
    title: "Circular Motion",
    subtitle: "Loops, Hills, and Inward Force",
    topics: [
      "centripetal acceleration",
      "hill and valley forces",
      "loop minimum speed",
      "g-force and ride feel",
    ],
  },
  {
    id: "work",
    number: "5",
    title: "Work, Friction, and Power",
    subtitle: "Where Coaster Energy Goes",
    topics: [
      "positive and negative work",
      "friction and braking",
      "work-energy theorem",
      "launch power",
    ],
  },
  {
    id: "momentum",
    number: "6",
    title: "Momentum and Impulse",
    subtitle: "Launches, Brakes, and Short Interactions",
    topics: [
      "momentum and direction",
      "impulse",
      "launch speed changes",
      "braking force and time",
    ],
  },
  {
    id: "rotation",
    number: "7",
    title: "Rotation and Torque",
    subtitle: "Wheels, Axles, and Rolling Motion",
    topics: [
      "angular speed",
      "torque",
      "rotational inertia",
      "rolling energy",
    ],
  },
  {
    id: "design-safety",
    number: "8",
    title: "Real-World Coaster Design and Safety",
    subtitle: "Putting Mechanics Together",
    topics: [
      "banking and comfort",
      "energy budgets",
      "jerk and smooth transitions",
      "brakes and safety systems",
    ],
  },
  {
    id: "final-quiz",
    number: "9",
    title: "Final Course Quiz",
    subtitle: "50-Question Review Across Every Unit",
    topics: [
      "mixed concepts",
      "new calculation numbers",
      "all eight units",
      "full-course review",
    ],
  },
];

const kinematicsLesson = createLesson(
  "Lesson 1: Kinematics",
  "Describing Motion Before Explaining It",
  "Students learn how to describe roller coaster motion with position, displacement, velocity, speed, acceleration, and graphs before later lessons explain what causes that motion.",
  [
    createStep("goal", "Big Idea", "Kinematics Is the Language of Motion", {
      body: [
        "Before a physicist asks why a coaster speeds up, slows down, or changes direction, the first job is to describe exactly what the train is doing. Kinematics is the branch of mechanics that gives us that descriptive language.",
        "A roller coaster may feel like one continuous ride, but it becomes easier to analyze when we break it into smaller segments: a straight drop, a curved valley, a hill crest, a launch track, or a braking zone. Each segment can be described using motion variables, and that description becomes the foundation for every later lesson.",
      ],
      bullets: [
        "Track the coaster's position and how far it has moved from a starting point.",
        "Separate total path length from displacement so the geometry of the ride stays clear.",
        "Treat velocity and acceleration as quantities that include direction, not just size.",
        "Use graphs as a second language for motion instead of treating them as a separate topic.",
      ],
    }),
    createStep(
      "core-concepts",
      "Core Concepts",
      "Position, Velocity, and Acceleration",
      {
        body: [
          "Position tells where the coaster is. Distance is the total path length traveled. Displacement is the change in position from start to finish. On a winding ride, distance and displacement can be dramatically different, because the train may travel a long track length while ending only a short distance from where it began.",
          "Speed tells how fast the coaster moves, while velocity tells both speed and direction. That distinction matters immediately on a roller coaster because the train often moves through turns, hills, and loops where direction changes constantly.",
          "Acceleration is the rate at which velocity changes. A coaster can accelerate by speeding up, slowing down, or changing direction. That last case is easy to miss, but it is exactly what happens when a coaster moves through a curve at constant speed.",
        ],
        bullets: [
          "Scalars have magnitude only: speed and distance are scalars.",
          "Vectors have magnitude and direction: velocity, displacement, and acceleration are vectors.",
          "A flat velocity-time graph means constant velocity, not zero motion.",
          "A coaster can have constant speed and still accelerate if the direction changes.",
        ],
        callout:
          "If a coaster moves at 18 m/s through a turnaround, the speed can stay 18 m/s while the velocity keeps changing because the train keeps pointing in a new direction.",
        practice: practiceQuestion(
          "A coaster moves through a curve at a constant speed, but its direction keeps changing. Which statement best describes the motion?",
          [
            "A. Its velocity stays constant because its speed stays constant.",
            "B. It is accelerating because its velocity changes direction.",
            "C. It has zero acceleration because it is not speeding up.",
            "D. Its displacement must equal the full distance traveled.",
          ],
          1,
          "Correct. Velocity includes both speed and direction. If the direction changes, the velocity changes, so the coaster is accelerating even at constant speed.",
          "Not quite. Speed can stay constant while velocity changes direction. A changing velocity means the coaster is accelerating.",
        ),
      },
    ),
    createStep("equations", "Equations", "Key Equations", {
      body: [
        "These constant-acceleration equations are useful when a coaster section can be approximated as straight and the acceleration is roughly constant over the interval. They are not universal formulas for every part of the ride.",
        "Kinematics also depends on graph relationships. Students should not memorize slope and area as isolated facts; they should connect them directly to what the coaster is physically doing.",
      ],
      equations: [
        equation(
          "Velocity update",
          <>
            v = <Initial symbol="v" /> + at
          </>,
        ),
        equation(
          "Position with constant acceleration",
          <>
            x = <Initial symbol="x" /> + <Initial symbol="v" />
            t + <Fraction numerator="1" denominator="2" />
            at²
          </>,
        ),
        equation(
          "Velocity-position relation",
          <>
            v² = <Initial symbol="v" />² + 2aΔx
          </>,
        ),
        equation(
          "Average-velocity displacement",
          <>
            Δx = <Fraction numerator="1" denominator="2" />
            (<Initial symbol="v" /> + v)t
          </>,
        ),
      ],
      variables: [
        {
          symbol: "v",
          meaning: "final velocity",
          note: "The velocity at the end of the motion interval.",
        },
        {
          symbol: "v0",
          meaning: "initial velocity",
          note: "The velocity at the beginning of the motion interval.",
        },
        {
          symbol: "x",
          meaning: "final position",
          note: "The position at the end of the segment being analyzed.",
        },
        {
          symbol: "x0",
          display: <Initial symbol="x" />,
          meaning: "initial position",
          note: "The starting position before the motion segment begins.",
        },
        {
          symbol: "Δx",
          meaning: "displacement",
          note: "The change in position from start to finish.",
        },
        {
          symbol: "a",
          meaning: "acceleration",
          note: "The rate at which velocity changes during the interval.",
        },
        {
          symbol: "t",
          meaning: "time",
          note: "The elapsed time for the motion interval.",
        },
      ],
      bullets: [
        "Slope of position-time graph = velocity.",
        "Slope of velocity-time graph = acceleration.",
        "Area under velocity-time graph = displacement.",
        "Area under acceleration-time graph = change in velocity.",
      ],
      callout:
        "The moment a section of track becomes strongly curved or the forces start changing significantly, these constant-acceleration equations stop being the right model.",
      practice: practiceSet(
        practiceQuestion(
          "A coaster starts from rest and accelerates at 4.0 m/s² for 3.0 s on a straight section of track. What is its final velocity?",
          [
            "A. 7.0 m/s",
            "B. 12 m/s",
            "C. 16 m/s",
            "D. 24 m/s",
          ],
          1,
          "Correct. Use v = v0 + at. Since the coaster starts from rest, v0 = 0, so v = (4.0)(3.0) = 12 m/s.",
          "Not quite. Use v = v0 + at. Because the coaster starts from rest, v0 = 0, so the final velocity is (4.0)(3.0) = 12 m/s.",
        ),
        practiceQuestion(
          "A coaster speeds up from 4.0 m/s to 14 m/s in 5.0 s with constant acceleration. How far does it travel during that time?",
          [
            "A. 25 m",
            "B. 35 m",
            "C. 45 m",
            "D. 70 m",
          ],
          2,
          "Correct. Use Δx = one-half(v0 + v)t = one-half(4.0 + 14)(5.0) = 45 m.",
          "Not quite. Use the average-velocity displacement equation: Δx = one-half(v0 + v)t = one-half(18)(5.0) = 45 m.",
        ),
        practiceQuestion(
          "A coaster starts from rest and accelerates at 3.0 m/s² for 4.0 s on a straight launch track. How far does it travel?",
          [
            "A. 12 m",
            "B. 24 m",
            "C. 36 m",
            "D. 48 m",
          ],
          1,
          "Correct. Use x = x0 + v0t + one-half at². With x0 = 0 and v0 = 0, x = one-half(3.0)(4.0²) = 24 m.",
          "Not quite. Since the coaster starts from rest, use x = one-half at² = one-half(3.0)(4.0²) = 24 m.",
        ),
      ),
    }),
    createStep(
      "projectile-motion",
      "Projectile Motion",
      "Forward Motion and Downward Acceleration",
      {
        body: [
          "Projectile motion is a two-dimensional kind of kinematics. The object keeps moving horizontally while gravity accelerates it downward. Those two motions happen at the same time, but they can be analyzed separately.",
          "In the ideal model, horizontal motion has constant velocity because there is no horizontal acceleration. Vertical motion has constant downward acceleration from gravity. That is why a launched ball can move forward while also falling.",
          "A rider on a coaster is not actually flying freely off the track, but airtime hills can be compared to projectile motion because the rider continues forward while gravity pulls downward. The feeling comes from the support force getting very small for a short moment.",
        ],
        bullets: [
          "Horizontal motion: forward velocity continues if no horizontal force changes it.",
          "Vertical motion: gravity creates downward acceleration of about 9.8 m/s².",
          "The two directions happen at the same time, so projectile motion is still kinematics.",
          "On a coaster, restraints and the track keep riders with the train, so projectile motion is a useful comparison rather than a complete model.",
        ],
        equations: [
          equation("Horizontal velocity", <>v<sub>x</sub> = constant</>),
          equation("Vertical acceleration", <>a<sub>y</sub> = -g</>),
          equation(
            "Horizontal position",
            <>
              x = v<sub>x</sub>t
            </>,
          ),
          equation(
            "Vertical position",
            <>
              y = <Initial symbol="y" /> + v<sub>y0</sub>t -{" "}
              <Fraction numerator="1" denominator="2" />
              gt²
            </>,
          ),
        ],
        realWorldExample: {
          position: "bottom",
          eyebrow: "Real-World Example",
          title: "El Toro Airtime Hills",
          goal: "This example shows how airtime connects to projectile motion: riders keep moving forward while gravity accelerates them downward.",
          imageSrc: "/el-toro-airtime.png",
          imageAlt: "El Toro wooden roller coaster train cresting an airtime hill.",
          stats: [
            {
              label: "Coaster",
              value: "El Toro",
            },
            {
              label: "Park",
              value: "Six Flags Great Adventure",
            },
            {
              label: "Max speed",
              value: "70 mph",
            },
            {
              label: "Height",
              value: "181 ft",
            },
          ],
          paragraphs: [
            "El Toro's airtime hills are a strong real-world example of this idea. When the train moves quickly over the top of a hill, the rider's body wants to keep moving forward because of inertia while gravity pulls the rider downward.",
            "This creates a short feeling of weightlessness, called airtime. It connects to projectile motion because the rider has forward motion and downward acceleration at the same time, similar to how a ball moves through the air after being launched.",
            "The coaster train, track, and restraints still control the actual motion, so this is not a perfect free-projectile situation. It is a useful kinematics comparison: forward motion continues while gravity supplies the downward acceleration.",
          ],
        },
        practice: practiceSet(
          practiceQuestion(
            "In an idealized airtime model, a rider moves horizontally at 16 m/s for 0.75 s. How far forward does the rider move?",
            [
              "A. 7.5 m",
              "B. 12 m",
              "C. 16 m",
              "D. 21 m",
            ],
            1,
            "Correct. Use x = vx t = (16)(0.75) = 12 m.",
            "Not quite. Horizontal velocity stays constant in the ideal model, so x = vx t = (16)(0.75) = 12 m.",
          ),
          practiceQuestion(
            "In an idealized airtime model, a rider has horizontal velocity 18 m/s, zero initial vertical velocity, and is modeled for 0.50 s. About how far forward and downward would the rider move?",
            [
              "A. 4.5 m forward and 0.50 m downward",
              "B. 9.0 m forward and 1.2 m downward",
              "C. 18 m forward and 4.9 m downward",
              "D. 36 m forward and 9.8 m downward",
            ],
            1,
            "Correct. Horizontally, x = vxt = (18)(0.50) = 9.0 m. Vertically, Δy = one-half gt² = 0.5(9.8)(0.50²) ≈ 1.2 m downward.",
            "Not quite. Treat the directions separately: x = vxt = (18)(0.50) = 9.0 m, and Δy = one-half gt² = 0.5(9.8)(0.50²) ≈ 1.2 m downward.",
          ),
          practiceQuestion(
            "In the same idealized model, a rider has zero initial vertical velocity and is modeled for 0.80 s. How far downward does gravity move the rider?",
            [
              "A. 0.80 m",
              "B. 1.6 m",
              "C. 3.1 m",
              "D. 6.3 m",
            ],
            2,
            "Correct. Use Δy = one-half gt² downward = 0.5(9.8)(0.80²) ≈ 3.1 m.",
            "Not quite. With zero initial vertical velocity, the downward displacement is one-half gt² = 0.5(9.8)(0.80²) ≈ 3.1 m.",
          ),
        ),
      },
    ),
    createStep(
      "coaster-explanation",
      "Explain",
      "How These Ideas Show Up on a Coaster",
      {
        body: [
          "Imagine a coaster car at the top of a straight first drop. If it starts from rest and the track is approximately straight over a short interval, we can model the motion with constant acceleration. The train's velocity points down the track, and the magnitude of that velocity grows as time passes.",
          "Now compare that to a turn or a hill crest. Even if the numerical speed is nearly constant, the train's direction is changing, so the velocity vector is changing. That means the coaster is accelerating even when a rider's speedometer reading barely changes.",
          "Real coaster motion is rarely perfectly constant acceleration for long. The track slope changes, the curvature changes, friction acts, and air resistance grows with speed. That is why kinematics is a starting point rather than the whole story: it tells us what the motion looks like before later lessons explain why it happens.",
        ],
        bullets: [
          "On a position-time graph, a steeper slope means a greater velocity.",
          "On a velocity-time graph, a positive slope means positive acceleration.",
          "A horizontal velocity-time line means the train keeps moving with constant velocity.",
          "The area under a velocity-time graph tells how far the coaster has displaced from its starting point.",
        ],
      },
    ),
    createStep(
      "common-mistakes",
      "Common Mistakes",
      "Where Students Usually Get Tripped Up",
      {
        body: [
          "Kinematics mistakes are often not algebra mistakes at first. They are meaning mistakes: using the wrong quantity, forgetting direction, or applying an equation in a situation where the assumptions are not valid.",
        ],
        bullets: [
          "Thinking speed and velocity are the same quantity.",
          "Thinking acceleration only means getting faster.",
          "Forgetting that direction matters for velocity.",
          "Using constant-acceleration equations on a section where acceleration is changing significantly.",
          "Confusing slope and area when reading motion graphs.",
          "Thinking a flat velocity graph means the object is stopped when it only means the velocity is constant.",
        ],
        practice: practiceQuestion(
          "A coaster moves through a turn at constant speed, but its direction keeps changing. Which statement avoids the common kinematics mistake?",
          [
            "A. Its velocity is constant because its speed is constant.",
            "B. Its acceleration is zero because it is not speeding up.",
            "C. Its velocity changes because direction changes, so it is accelerating.",
            "D. Its displacement must equal the full track distance.",
          ],
          2,
          "Correct. Velocity includes direction, so changing direction means changing velocity. That means the coaster is accelerating even if its speed stays constant.",
          "Not quite. Speed can stay constant while velocity changes direction. A changing velocity means acceleration.",
        ),
      },
    ),
    createStep("quiz", "Answer Explanations", "More Multiple Choice and Explanations", {
      body: [
        "These seven questions start with graph reading, then shift into direct equation use and projectile-motion calculations. Each answer explanation is meant to model the kind of reasoning you should write out when solving problems on your own.",
      ],
      quiz: [
        quizQuestion(
          "A velocity-time graph for a coaster is a straight line with positive slope. What does this mean?",
          [
            "A. The coaster is moving at constant velocity.",
            "B. The coaster is moving backward.",
            "C. The coaster has constant positive acceleration.",
            "D. The coaster has zero displacement.",
          ],
          2,
          "Correct. The slope of a velocity-time graph is acceleration, so a straight line with positive slope represents constant positive acceleration.",
          "Not quite. Focus on what slope means on a velocity-time graph. A positive constant slope means constant positive acceleration.",
        ),
        quizQuestion(
          "A coaster starts from rest and accelerates at 2.5 m/s² for 6.0 s. What is its final velocity?",
          [
            "A. 6.0 m/s",
            "B. 8.5 m/s",
            "C. 15 m/s",
            "D. 30 m/s",
          ],
          2,
          "Correct. Use v = v0 + at. Since v0 = 0, the final velocity is (2.5)(6.0) = 15 m/s.",
          "Not quite. Start with v = v0 + at. Because the coaster starts from rest, v0 = 0, so v = (2.5)(6.0) = 15 m/s.",
        ),
        quizQuestion(
          "A coaster starts from rest and accelerates at 2.0 m/s² for 4.0 s. How far does it travel during that time?",
          [
            "A. 8.0 m",
            "B. 16 m",
            "C. 32 m",
            "D. 64 m",
          ],
          1,
          "Correct. Use x = x0 + v0t + one-half at². Here x0 = 0 and v0 = 0, so the displacement is one-half times 2.0 times 4.0² = 16 m.",
          "Not quite. Use x = x0 + v0t + one-half at². Because the coaster starts from rest, the displacement is one-half times 2.0 times 4.0² = 16 m.",
        ),
        quizQuestion(
          "A coaster speeds up from 6.0 m/s to 14 m/s over a displacement of 40 m. What is its acceleration?",
          [
            "A. 1.0 m/s²",
            "B. 2.0 m/s²",
            "C. 4.0 m/s²",
            "D. 6.0 m/s²",
          ],
          1,
          "Correct. Use v² = v0² + 2aΔx. Substituting gives 14² = 6.0² + 2a(40), so 196 = 36 + 80a and a = 2.0 m/s².",
          "Not quite. Start with v² = v0² + 2aΔx. Using 14 m/s, 6.0 m/s, and 40 m gives 196 = 36 + 80a, so a = 2.0 m/s².",
        ),
        quizQuestion(
          "A coaster speeds up from 8.0 m/s to 12 m/s in 5.0 s with constant acceleration. What is its displacement during that interval?",
          [
            "A. 20 m",
            "B. 40 m",
            "C. 50 m",
            "D. 60 m",
          ],
          2,
          "Correct. Use Δx = one-half (v0 + v)t. The average velocity is 10 m/s, so the displacement is (10)(5.0) = 50 m.",
          "Not quite. Use Δx = one-half (v0 + v)t. The average of 8.0 m/s and 12 m/s is 10 m/s, so over 5.0 s the displacement is 50 m.",
        ),
        quizQuestion(
          "In an ideal projectile-motion model, a rider continues forward at 20 m/s for 0.80 s. How far forward does the rider move?",
          [
            "A. 8.0 m",
            "B. 16 m",
            "C. 20 m",
            "D. 25 m",
          ],
          1,
          "Correct. Horizontal velocity stays constant in the ideal model, so x = vxt = (20)(0.80) = 16 m.",
          "Not quite. Separate the horizontal motion from the vertical motion. Horizontally, x = vxt = (20)(0.80) = 16 m.",
        ),
        quizQuestion(
          "During that same 0.80 s, assume the rider's initial vertical velocity is zero. About how far downward does gravity pull the rider?",
          [
            "A. 0.80 m",
            "B. 1.6 m",
            "C. 3.1 m",
            "D. 7.8 m",
          ],
          2,
          "Correct. Use Δy = one-half gt² = 0.5(9.8)(0.80²) ≈ 3.1 m downward.",
          "Not quite. The vertical motion uses gravity: Δy = one-half gt² = 0.5(9.8)(0.80²) ≈ 3.1 m downward.",
        ),
      ],
    }),
    createStep(
      "next-lesson",
      "Next Lesson",
      "Connection to the Next Lesson",
      {
        body: [
          "Kinematics tells us what the motion looks like. It can tell us that a coaster speeds up, slows down, or changes direction, but it does not explain the cause of those changes.",
          "The next lesson adds forces and Newton's laws so we can move from description to explanation.",
        ],
      },
    ),
  ],
);

const forcesLesson = createLesson(
  "Lesson 2: Forces and Newton's Laws",
  "Explaining Why Motion Changes",
  "Students learn how forces cause changes in roller coaster motion and how Newton's laws connect force, mass, and acceleration.",
  [
    createStep("goal", "Big Idea", "Forces Explain Motion Changes", {
      body: [
        "Once kinematics tells us what a coaster is doing, the next question is why the motion changes. If the train speeds up, slows down, or turns, there must be a net force responsible for that acceleration.",
        "Newton's laws turn coaster sensations into precise mechanics. They explain why riders feel thrown forward in a brake run, why a train accelerates down a slope, and why the seat pushes differently at the bottom and top of a hill.",
      ],
      bullets: [
        "Use Newton's First Law to connect inertia to rider experience.",
        "Use Newton's Second Law to connect net force to acceleration.",
        "Use Newton's Third Law to separate interaction pairs on different objects.",
        "Model sloped track sections with force components instead of guessing directions.",
      ],
    }),
    createStep(
      "core-concepts",
      "Core Concepts",
      "Inertia, Net Force, and Free-Body Diagrams",
      {
        body: [
          "Newton's First Law says an object keeps its state of motion unless acted on by a net external force. This is inertia. Riders feel inertia during launches, drops, turns, and braking because their bodies resist changes in motion.",
          "Newton's Second Law says Fnet = ma. The important word is net. A coaster can experience gravity, normal force, friction, air resistance, and a chain or launch force all at once, but acceleration depends on the vector sum of those forces.",
          "Newton's Third Law says forces come in equal and opposite pairs acting on different objects. If the seat pushes up on a rider, the rider pushes down on the seat with equal magnitude. Those two forces do not cancel because they act on different bodies.",
        ],
        bullets: [
          "A free-body diagram should show only the real forces on the chosen object.",
          "Motion direction is not a force and should not be drawn as one.",
          "Weight is the gravitational force on an object, not the same thing as mass.",
          "The normal force is not automatically equal to mg.",
        ],
        callout:
          "Students often draw the third-law partner force on the same free-body diagram. That is one of the fastest ways to lose the physical meaning of Newton's laws.",
        figures: [
          figure(
            "Coaster Cart on a Flat Track",
            (isDark) => <FlatTrackCartDiagram isDark={isDark} />,
            "Start with the physical situation before stripping the diagram down to only the forces.",
          ),
          figure(
            "Free-Body Diagram",
            (isDark) => <FlatTrackFreeBodyDiagram isDark={isDark} />,
            "For a cart resting on a flat track, the free-body diagram keeps only the upward normal force and the downward weight.",
          ),
        ],
        realWorldExample: {
          position: "afterFigures",
          eyebrow: "Real-World Example",
          title: "Copperhead Strike Car Mass Example",
          goal: "This example calculates the weight and normal force for one empty Copperhead Strike car, then repeats the calculation with riders added.",
          imageSrc: "/copperhead-strike-train.png",
          imageAlt: "Copperhead Strike roller coaster train banking through orange track.",
          stats: [
            {
              label: "Coaster",
              value: "Copperhead Strike",
            },
            {
              label: "Park",
              value: "Carowinds",
            },
            {
              label: "Max speed",
              value: "50 mph",
            },
            {
              label: "Height",
              value: "82 ft",
            },
          ],
          rightFigure: {
            title: "Level-Track FBD",
            description: "For one car at rest on level track, draw N upward and mg downward. Since the vertical forces balance, N = mg.",
            render: (isDark) => <FlatTrackFreeBodyDiagram isDark={isDark} />,
          },
          paragraphs: [
            "Copperhead Strike uses trains with 4 cars, and each car carries 4 riders. The exact empty mass is not publicly listed, so this lesson uses an engineering estimate of about 1,600 kg for one empty car.",
            "The free-body diagram tells us what to calculate. On level track at rest, the vertical forces balance, so after finding the weight mg, set the normal force equal to that same size.",
          ],
          calculationSteps: [
            {
              label: "1. Find the empty car weight",
              equation: (
                <>
                  F<sub>g</sub> = mg = (1,600)(9.8) ≈ 15,700 N downward
                </>
              ),
              note: "Weight is the gravitational force on the car, not the same thing as mass.",
            },
            {
              label: "2. Use vertical force balance",
              equation: (
                <>
                  ΣF<sub>y</sub> = 0, so N - mg = 0 and N ≈ 15,700 N upward
                </>
              ),
              note: "Because the empty car is at rest on level track, the track's upward normal force balances the downward weight.",
            },
            {
              label: "3. Add the riders",
              equation: (
                <>
                  rider mass = 4(75 kg) = 300 kg
                  <br />
                  loaded car mass = 1,600 kg + 300 kg = 1,900 kg
                </>
              ),
              note: "This uses 75 kg as a reasonable classroom estimate for each rider.",
            },
            {
              label: "4. Find the loaded car weight",
              equation: (
                <>
                  F<sub>g</sub> = mg = (1,900)(9.8) ≈ 18,600 N downward
                </>
              ),
              note: "Adding riders increases the weight because the loaded mass is larger.",
            },
            {
              label: "5. Find the loaded normal force",
              equation: "N = mg ≈ 18,600 N upward",
              note: "On level track at rest, the normal force again balances the weight.",
            },
            {
              label: "6. Find the full-train masses",
              equation: (
                <>
                  empty train mass = 4(1,600 kg) = 6,400 kg
                  <br />
                  loaded train mass = 4(1,900 kg) = 7,600 kg
                </>
              ),
              note: "Using N = mg on level track, that gives about 62,700 N empty and 74,500 N loaded for the full-train normal force.",
            },
          ],
        },
        practice: practiceQuestion(
          "A rider sits in a coaster seat. The seat pushes upward on the rider. What is the Newton's Third Law partner to that force?",
          [
            "A. Earth pulling downward on the rider.",
            "B. The rider pushing downward on the seat.",
            "C. The coaster's acceleration upward.",
            "D. The normal force from the track on the car.",
          ],
          1,
          "Correct. Newton's Third Law pairs act on different objects. If the seat pushes up on the rider, the rider pushes down on the seat with equal magnitude.",
          "Not quite. The Third Law partner must act on a different object. The seat pushes up on the rider, and the rider pushes down on the seat.",
        ),
      },
    ),
    createStep("equations", "Equations", "Key Equations", {
      body: [
        "These equations let us translate a track shape into a net force and then into acceleration. On an incline, splitting gravity into components is the key step that makes the rest of the analysis straightforward.",
      ],
      equations: [
        equation("Newton's Second Law", <>F<sub>net</sub> = ma</>),
        equation("Weight", <>F<sub>g</sub> = mg</>),
        equation("Kinetic friction", <>f<sub>k</sub> = μ<sub>k</sub>N</>),
        equation("Parallel gravity component", <>mg sinθ</>),
        equation("Perpendicular gravity component", <>mg cosθ</>),
      ],
      variables: [
        {
          symbol: "Fnet",
          display: (
            <>
              F<sub>net</sub>
            </>
          ),
          meaning: "net force",
          note: "The vector sum of all forces acting on the coaster or rider.",
        },
        {
          symbol: "Fg",
          display: (
            <>
              F<sub>g</sub>
            </>
          ),
          meaning: "weight",
          note: "The gravitational force acting downward on the object.",
        },
        {
          symbol: "m",
          meaning: "mass",
          note: "The amount of matter in the coaster car or rider.",
        },
        {
          symbol: "a",
          meaning: "acceleration",
          note: "How quickly the coaster's velocity changes.",
        },
        {
          symbol: "g",
          meaning: "gravitational field strength",
          note: "Near Earth, g is approximately 9.8 m/s².",
        },
        {
          symbol: "fk",
          display: (
            <>
              f<sub>k</sub>
            </>
          ),
          meaning: "kinetic friction",
          note: "A contact force that acts opposite sliding or rolling motion in the simple model.",
        },
        {
          symbol: "μk",
          display: (
            <>
              μ<sub>k</sub>
            </>
          ),
          meaning: "coefficient of kinetic friction",
          note: "A number that describes how strongly the surfaces resist motion in the simple friction model.",
        },
        {
          symbol: "θ",
          meaning: "track angle",
          note: "The angle the slope makes relative to the horizontal.",
        },
      ],
      bullets: [
        "The parallel component changes motion along the track.",
        "The perpendicular component helps determine the normal force.",
        "Friction acts opposite the relative motion and depends on the normal force in the simple model.",
        "You should solve for the net force before solving for acceleration.",
      ],
      callout:
        "On a sloped track, writing the full weight mg as the force along the track is almost always the wrong first step.",
      practice: practiceSet(
        practiceQuestion(
          "A coaster car has a net force of 1800 N acting on it along the track and a mass of 600 kg. What is its acceleration?",
          [
            "A. 0.33 m/s²",
            "B. 3.0 m/s²",
            "C. 600 m/s²",
            "D. 2400 m/s²",
          ],
          1,
          "Correct. Use Fnet = ma, so a = Fnet/m = 1800/600 = 3.0 m/s².",
          "Not quite. Apply Newton's Second Law directly: a = Fnet/m = 1800/600 = 3.0 m/s².",
        ),
        practiceQuestion(
          "A wheel assembly has a normal force of 500 N and a kinetic-friction coefficient of 0.04. What is the friction force in the simple model?",
          [
            "A. 0.08 N",
            "B. 20 N",
            "C. 500 N",
            "D. 12,500 N",
          ],
          1,
          "Correct. Use fk = μkN = (0.04)(500) = 20 N, acting opposite the motion.",
          "Not quite. In the simple model, kinetic friction is fk = μkN. Multiply 0.04 by 500 N to get 20 N.",
        ),
        practiceQuestion(
          "A 700 kg coaster car is on a frictionless 30° incline. What component of gravity pulls it down the track?",
          [
            "A. 700 N",
            "B. 3430 N",
            "C. 6860 N",
            "D. 13,720 N",
          ],
          1,
          "Correct. The parallel component is mg sinθ = (700)(9.8) sin 30° = (700)(9.8)(0.5) = 3430 N.",
          "Not quite. Use the component along the track: mg sinθ. With 700 kg and 30°, that is 3430 N.",
        ),
      ),
    }),
    createStep(
      "coaster-explanation",
      "Explain",
      "Forces on Lift Hills, Drops, and Valleys",
      {
        body: [
          "On a lift hill, a chain or launch system applies a force that moves the coaster upward. On a drop, gravity pulls downward and the component of gravity along the track causes the train to accelerate.",
          "On a slope, the parallel component mg sinθ pulls the coaster down the track while the perpendicular component mg cosθ presses the train into the track. That is why incline problems become much cleaner once you align your axes with the slope.",
          "When you draw the actual free-body diagram, keep only the real forces like weight and normal force. Break weight into components afterward as a math step instead of mixing both versions onto the same diagram.",
          "The normal force matters especially because it connects the math to what riders feel. At the bottom of a valley, the track pushes strongly upward to bend the rider's motion. At the top of a hill, the normal force may be smaller, so riders feel lighter even though their true weight has not changed.",
        ],
        bullets: [
          "Main forces on a coaster: gravity, normal force, friction, air resistance, and chain or launch force.",
          "A larger normal force feels heavier to a rider.",
          "A smaller normal force feels lighter to a rider.",
          "On a true free-body diagram, draw the real forces first. Resolve them into components afterward instead of drawing both the full force and its components as separate applied forces.",
        ],
        figures: [
          figure(
            "Coaster Cart on a Slope",
            (isDark) => <SlopeCartDiagram isDark={isDark} />,
            "Start with the cart on an incline so the track angle is clear before you decide how to break gravity into components.",
          ),
          figure(
            "Slope Force Analysis with Components",
            (isDark) => <SlopeComponentsDiagram isDark={isDark} />,
            "The component arrows help with the math, but on an actual free-body diagram you draw only the real forces such as N and mg, then resolve them separately.",
          ),
        ],
        practice: practiceQuestion(
          "A car rests on a frictionless 30° slope. Which force component pulls the car down the slope?",
          [
            "A. The normal force, N",
            "B. The full weight, mg",
            "C. The parallel component, mg sinθ",
            "D. The perpendicular component, mg cosθ",
          ],
          2,
          "Correct. Along a slope, the component of gravity parallel to the track is **mg sinθ**, and that is the part that pulls the car downhill.",
          "Not quite. The force component along the slope is **mg sinθ**. The normal force points perpendicular to the track, and **mg cosθ** is the perpendicular component of weight.",
        ),
      },
    ),
    createStep(
      "common-mistakes",
      "Common Mistakes",
      "Force Errors That Break the Model",
      {
        body: [
          "Most force mistakes come from misidentifying what actually acts on the coaster. If the free-body diagram is wrong, the algebra can look clean and still produce nonsense.",
        ],
        bullets: [
          "Thinking an object needs a force to keep moving at constant velocity.",
          "Forgetting that acceleration comes from net force, not from any one force alone.",
          "Confusing mass and weight.",
          "Assuming the normal force always equals mg.",
          "Drawing Newton's Third Law force pairs on the same object.",
          "Forgetting to split gravity into components on a slope.",
        ],
        practice: practiceQuestion(
          "Which choice belongs on a free-body diagram for a rider sitting in a coaster seat?",
          [
            "A. A velocity arrow showing the rider's motion.",
            "B. The rider pushing downward on the seat.",
            "C. The seat's normal force on the rider and the rider's weight.",
            "D. A forward arrow labeled as the force of motion.",
          ],
          2,
          "Correct. A free-body diagram shows real forces on the chosen object. For the rider, those include weight downward and the seat's normal force upward.",
          "Not quite. Draw only real forces acting on the chosen object. Motion arrows and third-law partner forces do not belong on that object's free-body diagram.",
        ),
      },
    ),
    createStep("practice", "Practice", "Multiple Choice Practice", {
      body: [
        "This first question checks whether you can identify which part of gravity actually accelerates a coaster along an incline.",
      ],
      practice: practiceQuestion(
        "A coaster car moves down a frictionless incline. Which force component causes it to accelerate down the track?",
        [
          "A. mg cosθ",
          "B. mg sinθ",
          "C. The normal force",
          "D. The full weight mg only",
        ],
        1,
        "Correct. The component of gravity parallel to the track, mg sinθ, is what accelerates the coaster along the slope.",
        "Not quite. On an incline, the component parallel to the track is mg sinθ, and that is the part of gravity that changes the coaster's motion along the slope.",
      ),
    }),
    createStep("quiz", "Answer Explanations", "More Multiple Choice and Explanations", {
      body: [
        "These seven questions focus on apparent weight, force components, and Newton's Second Law. Use them to practice turning a physical description into a force statement before you calculate.",
      ],
      quiz: [
        quizQuestion(
          "Why do riders feel heavier at the bottom of a dip?",
          [
            "A. Their actual weight increases.",
            "B. Their mass increases.",
            "C. The normal force from the seat increases.",
            "D. Gravity becomes stronger.",
          ],
          2,
          "Correct. Riders feel heavier because the seat pushes on them harder, which means the normal force is larger at the bottom of the dip.",
          "Not quite. The rider's mass and true gravitational weight do not suddenly change. The seat's normal force increases, and that larger support force feels heavier.",
        ),
        quizQuestion(
          "A coaster car has a net force of 4000 N acting on it and a mass of 800 kg. What is its acceleration?",
          [
            "A. 0.2 m/s²",
            "B. 5.0 m/s²",
            "C. 3200 m/s²",
            "D. 4800 m/s²",
          ],
          1,
          "Correct. Use Fnet = ma, so a = Fnet/m = 4000/800 = 5.0 m/s².",
          "Not quite. Apply Newton's Second Law directly: a = Fnet/m = 4000/800 = 5.0 m/s².",
        ),
        quizQuestion(
          "A 500 kg coaster car moves down a frictionless 30° incline. What is the component of gravity parallel to the track?",
          [
            "A. 245 N",
            "B. 980 N",
            "C. 2450 N",
            "D. 4900 N",
          ],
          2,
          "Correct. The parallel component is mg sinθ = (500)(9.8) sin 30° = (500)(9.8)(0.5) = 2450 N.",
          "Not quite. On an incline, the force along the track is mg sinθ. With m = 500 kg and θ = 30°, the result is 2450 N.",
        ),
        quizQuestion(
          "If the net force on a coaster car is zero, which motion is possible?",
          [
            "A. Moving in a straight line at constant velocity",
            "B. Speeding up in the forward direction",
            "C. Turning through a curve",
            "D. Rising acceleration with zero velocity",
          ],
          0,
          "Correct. Zero net force means zero acceleration, so the coaster can move with constant velocity in a straight line.",
          "Not quite. If the net force is zero, then the acceleration is zero. That allows constant velocity motion in a straight line.",
        ),
        quizQuestion(
          "A frictionless coaster car is released from rest on a 30° incline. What is its acceleration down the track?",
          [
            "A. 4.9 m/s²",
            "B. 9.8 m/s²",
            "C. 15 m/s²",
            "D. 30 m/s²",
          ],
          0,
          "Correct. On a frictionless incline, a = g sinθ = (9.8) sin 30° = 4.9 m/s².",
          "Not quite. Use the component of gravity along the track. On a frictionless 30° incline, a = g sin 30° = 4.9 m/s².",
        ),
        quizQuestion(
          "A 60 kg rider is sitting still on a flat, level track section. What is the rider's weight?",
          [
            "A. 60 N",
            "B. 98 N",
            "C. 588 N",
            "D. 6000 N",
          ],
          2,
          "Correct. Weight is the gravitational force mg = (60)(9.8) = 588 N downward.",
          "Not quite. Weight is not the same as mass. Use mg = (60)(9.8) = 588 N downward.",
        ),
        quizQuestion(
          "A 500 kg coaster car has a 2400 N force down the track and 400 N of friction up the track. What is its acceleration down the track?",
          [
            "A. 2.0 m/s²",
            "B. 4.0 m/s²",
            "C. 4.8 m/s²",
            "D. 5.6 m/s²",
          ],
          1,
          "Correct. The net force is 2400 N - 400 N = 2000 N down the track, so a = Fnet/m = 2000/500 = 4.0 m/s².",
          "Not quite. First find the net force: 2400 N - 400 N = 2000 N. Then use a = Fnet/m = 2000/500 = 4.0 m/s².",
        ),
      ],
    }),
    createStep(
      "next-lesson",
      "Next Lesson",
      "Connection to the Next Lesson",
      {
        body: [
          "Forces are powerful because they explain acceleration directly, but many coaster problems become easier if we step back and track how height and speed exchange energy.",
          "The next lesson uses energy to predict coaster speed without solving the force at every point on the track.",
        ],
      },
    ),
  ],
);

const energyLesson = createLesson(
  "Lesson 3: Energy",
  "Height, Speed, and Conversion",
  "Students learn how gravitational potential energy and kinetic energy explain coaster speed, height, and the repeating flow of motion around the track.",
  [
    createStep("goal", "Big Idea", "Energy Makes the Whole Ride Coherent", {
      body: [
        "Energy is one of the clearest ways to understand a roller coaster because the ride constantly trades height for speed and speed for height. Instead of following every force moment by moment, we can compare the energy at one point on the track to the energy at another.",
        "This is why roller coasters are such a strong introduction to energy methods in mechanics. The first hill acts like an energy budget, and the rest of the ride shows that budget being transformed, redistributed, and gradually reduced by losses.",
      ],
      bullets: [
        "Use height to reason about stored gravitational potential energy.",
        "Use speed to reason about kinetic energy.",
        "Treat mechanical energy as the sum of potential and kinetic energy.",
        "Recognize when energy is conserved and when real losses matter.",
      ],
    }),
    createStep(
      "core-concepts",
      "Core Concepts",
      "Potential Energy, Kinetic Energy, and Conservation",
      {
        body: [
          "Gravitational potential energy depends on how high the coaster is above a chosen reference level. Kinetic energy depends on speed, and it depends on speed squared, which means a modest increase in speed can represent a large increase in kinetic energy.",
          "Mechanical energy is the sum of kinetic and gravitational potential energy. If friction and air resistance are ignored, that mechanical energy stays constant. In that ideal model, the train does not need a different equation at every point on the track. It only needs a comparison between the start and the finish.",
          "One of the most important coaster results is that mass cancels out in many ideal energy problems. That is why a heavier coaster car does not automatically go faster than a lighter one if both start from the same height and friction is ignored.",
        ],
        bullets: [
          "At the top of the first hill, the coaster has mostly gravitational potential energy.",
          "At the bottom of the first drop, the coaster has mostly kinetic energy.",
          "Only changes in height matter, so the zero level for height is a choice, not a law.",
          "Later hills are usually lower because real coasters lose mechanical energy.",
        ],
        callout:
          "Students often think bigger mass means bigger speed. In ideal energy problems, the mass factor appears on both sides and cancels.",
        practice: practiceQuestion(
          "A coaster rolls from the top of a hill to the bottom of a frictionless drop. Which statement is true?",
          [
            "A. Gravitational potential energy increases while kinetic energy decreases.",
            "B. Mechanical energy stays constant while gravitational potential energy changes into kinetic energy.",
            "C. Mechanical energy decreases to zero at the bottom.",
            "D. The coaster must slow down because potential energy is lost.",
          ],
          1,
          "Correct. If friction is ignored, the coaster's mechanical energy stays constant while gravitational potential energy is converted into kinetic energy.",
          "Not quite. In a frictionless drop, mechanical energy is conserved. The coaster loses gravitational potential energy and gains kinetic energy.",
        ),
      },
    ),
    createStep("equations", "Equations", "Key Equations", {
      body: [
        "These equations let us treat the coaster as an energy story rather than a point-by-point force story. They are especially useful when the train moves along a complex path but the start and finish points are clear.",
      ],
      equations: [
        equation("Gravitational potential energy", <>U<sub>g</sub> = mgh</>),
        equation(
          "Kinetic energy",
          <>
            K = <Fraction numerator="1" denominator="2" />
            mv²
          </>,
        ),
        equation(
          "Mechanical energy",
          <>
            E<sub>mech</sub> = K + U<sub>g</sub>
          </>,
        ),
        equation(
          "Conservation of mechanical energy",
          <>
            K<sub>i</sub> + U<sub>gi</sub> = K<sub>f</sub> + U<sub>gf</sub>
          </>,
        ),
        equation(
          "Drop-speed relation",
          <>
            v = <Radical>2gh</Radical>
          </>,
        ),
      ],
      variables: [
        {
          symbol: "Ug",
          display: (
            <>
              U<sub>g</sub>
            </>
          ),
          meaning: "gravitational potential energy",
          note: "Stored energy due to height in the gravitational field.",
        },
        {
          symbol: "K",
          meaning: "kinetic energy",
          note: "Energy associated with motion.",
        },
        {
          symbol: "Emech",
          display: (
            <>
              E<sub>mech</sub>
            </>
          ),
          meaning: "mechanical energy",
          note: "The total of kinetic energy and gravitational potential energy.",
        },
        {
          symbol: "m",
          meaning: "mass",
          note: "The amount of matter in the coaster car or rider.",
        },
        {
          symbol: "g",
          meaning: "gravitational field strength",
          note: "Near Earth, g is approximately 9.8 m/s².",
        },
        {
          symbol: "h",
          meaning: "height",
          note: "Vertical position measured relative to a chosen reference level.",
        },
        {
          symbol: "v",
          meaning: "speed",
          note: "The magnitude of the coaster's velocity at a given point.",
        },
        {
          symbol: "i/f",
          meaning: "initial and final labels",
          note: "Subscript i means initial, and subscript f means final.",
        },
      ],
      bullets: [
        "The drop-speed relation comes from setting gravitational potential energy equal to kinetic energy for a drop from rest.",
        "Reference height can be chosen wherever it makes the algebra easiest.",
        "If friction is present, mechanical energy is no longer constant by itself.",
      ],
      practice: practiceSet(
        practiceQuestion(
          "A coaster drops 20 m from rest with friction ignored. What is its speed at the bottom?",
          [
            "A. 9.9 m/s",
            "B. 14.0 m/s",
            "C. 19.8 m/s",
            "D. 28.0 m/s",
          ],
          2,
          "Correct. Use v = √(2gh) = √((2)(9.8)(20)) ≈ 19.8 m/s.",
          "Not quite. Set the lost gravitational potential energy equal to the gained kinetic energy, or use v = √(2gh). For h = 20 m, the speed is about 19.8 m/s.",
        ),
        practiceQuestion(
          "A 600 kg coaster car is moving at 12 m/s. What is its kinetic energy?",
          [
            "A. 7200 J",
            "B. 36,000 J",
            "C. 43,200 J",
            "D. 86,400 J",
          ],
          2,
          "Correct. Use K = one-half mv² = 0.5(600)(12²) = 43,200 J.",
          "Not quite. Kinetic energy depends on speed squared: K = one-half mv² = 0.5(600)(12²) = 43,200 J.",
        ),
        practiceQuestion(
          "A coaster has 20,000 J of kinetic energy and 120,000 J of gravitational potential energy. If mechanical energy is conserved, what is K when Ug is 50,000 J?",
          [
            "A. 50,000 J",
            "B. 70,000 J",
            "C. 90,000 J",
            "D. 140,000 J",
          ],
          2,
          "Correct. Total mechanical energy is 20,000 + 120,000 = 140,000 J. If Ug becomes 50,000 J, then K = 140,000 - 50,000 = 90,000 J.",
          "Not quite. First find total mechanical energy: 140,000 J. Then subtract the new potential energy: K = 90,000 J.",
        ),
      ),
    }),
    createStep(
      "coaster-explanation",
      "Explain",
      "How a Coaster Trades Height for Speed",
      {
        body: [
          "At the top of the lift hill, the coaster has been given a large amount of gravitational potential energy. As the train descends, that stored energy changes into kinetic energy, which is why the first big drop produces the ride's fastest motion on many coasters.",
          "At the bottom of the drop, the train may be moving very quickly but it no longer has as much height available to convert. When it climbs the next hill, kinetic energy changes back into gravitational potential energy, so the speed falls as the height rises.",
          "This repeating exchange explains the rhythm of a coaster. It also explains why the first hill is usually the tallest on a traditional coaster. Without an additional launch or lift, the ride cannot give itself back the mechanical energy it has already lost.",
        ],
        realWorldExample: {
          eyebrow: "Real-World Example",
          title: "Mako Coaster Example",
          goal: "This example estimates Mako's ideal bottom speed from its height, then compares that estimate with the published top speed.",
          imageSrc: "/mako-drop.png",
          imageAlt: "Mako roller coaster train descending a steep drop.",
          stats: [
            {
              label: "Coaster",
              value: "Mako",
            },
            {
              label: "Park",
              value: "SeaWorld Orlando",
            },
            {
              label: "Max speed",
              value: "73 mph",
            },
            {
              label: "Height",
              value: "200 ft",
            },
          ],
          paragraphs: [
            "Using published stats for Mako at SeaWorld Orlando, the ideal energy model gives a quick estimate for how fast the train could be moving near the bottom of the first drop.",
            "The calculation below assumes the train starts from rest and ignores friction and air resistance. That makes it an ideal estimate, not an exact real ride measurement.",
          ],
          calculationSteps: [
            {
              label: "1. Convert the height",
              equation: "200 ft × 0.3048 ≈ 61.0 m",
              note: "Energy equations use SI units, so the height needs to be in meters.",
            },
            {
              label: "2. Set height energy equal to kinetic energy",
              equation: (
                <>
                  mgh = <Fraction numerator="1" denominator="2" />
                  mv²
                </>
              ),
              note: "In the ideal model, gravitational potential energy turns into kinetic energy.",
            },
            {
              label: "3. Solve for speed",
              equation: (
                <>
                  v = <Radical>2gh</Radical> = <Radical>(2)(9.8)(61.0)</Radical> ≈ 34.6 m/s
                </>
              ),
              note: "The mass cancels, so the ideal bottom speed depends on height, not train mass.",
            },
            {
              label: "4. Convert to miles per hour",
              equation: "34.6 m/s × 2.237 ≈ 77.4 mph",
              note: "This lets us compare the ideal estimate to Mako's published top speed of 73 mph.",
            },
          ],
          afterParagraphs: [
            "That ideal estimate is a little higher than the published 73 mph top speed because a real coaster is not frictionless. Wheels, bearings, and track contact create friction, air resistance removes energy, and some energy is also dissipated as sound and heat.",
            "So the energy equation is still very useful, but in real life it gives an estimate rather than a perfect exact speed.",
          ],
        },
        bullets: [
          "Energy methods can compare two points even if the track shape between them is complicated.",
          "Energy bar charts help students track K, Ug, and total mechanical energy visually.",
          "Real coasters lose energy to friction, air resistance, sound, and heat.",
        ],
      },
    ),
    createStep(
      "common-mistakes",
      "Common Mistakes",
      "Where Energy Reasoning Breaks Down",
      {
        body: [
          "Energy problems usually look shorter than force problems, so students often rush them. The most common errors come from using the wrong height change or forgetting which terms belong at each point.",
        ],
        bullets: [
          "Using total height instead of change in height.",
          "Forgetting that speed is squared in kinetic energy.",
          "Thinking mass determines final speed in ideal energy problems.",
          "Mixing up conservation of energy with Newton's Second Law.",
          "Ignoring energy losses when the problem clearly describes a real coaster section.",
        ],
        practice: practiceQuestion(
          "In an energy problem for a coaster drop, which height should you usually use?",
          [
            "A. The total height of the coaster structure.",
            "B. The change in height between the starting and ending points.",
            "C. The length of the track section.",
            "D. The rider's height above the seat.",
          ],
          1,
          "Correct. Gravitational potential energy depends on height change, so use the vertical difference between the two points being compared.",
          "Not quite. Energy reasoning needs the change in gravitational potential energy, which depends on vertical height change, not track length or total structure height.",
        ),
      },
    ),
    createStep("practice", "Practice", "Multiple Choice Practice", {
      body: [
        "This question checks the mass-cancellation idea because that is one of the most important conceptual results in coaster energy analysis.",
      ],
      practice: practiceQuestion(
        "Two coaster cars with different masses start from the same height and roll down the same frictionless track. Which statement is true at the bottom?",
        [
          "A. The heavier car must be faster because it has more weight.",
          "B. The lighter car must be faster because it has less inertia.",
          "C. They have the same speed if friction is ignored.",
          "D. Their speeds cannot be compared without knowing the radius of the track.",
        ],
        2,
        "Correct. In an ideal energy problem, mass cancels from both sides of the energy equation, so the final speed depends on the height change, not on the mass.",
        "Not quite. In ideal energy analysis, the mass factor cancels. If both cars start from the same height on a frictionless track, they reach the bottom with the same speed.",
      ),
    }),
    createStep("quiz", "Answer Explanations", "More Multiple Choice and Explanations", {
      body: [
        "These seven questions reinforce both calculation and interpretation, from bottom speed to energy conservation and later-hill design.",
      ],
      quiz: [
        quizQuestion(
          "A coaster starts from rest at a height of 40 m. Ignoring friction, what is its speed at the bottom?",
          [
            "A. 14.0 m/s",
            "B. 19.8 m/s",
            "C. 28.0 m/s",
            "D. 39.6 m/s",
          ],
          2,
          "Correct. Use v = √(2gh) = √((2)(9.8)(40)) ≈ 28.0 m/s.",
          "Not quite. Set gravitational potential energy equal to kinetic energy and solve for v. For h = 40 m, the speed is about 28.0 m/s.",
        ),
        quizQuestion(
          "Why are later hills on a traditional coaster usually lower than the first hill?",
          [
            "A. Gravity gets weaker as the ride continues.",
            "B. The train loses mechanical energy to friction and air resistance.",
            "C. The mass of the train decreases during the ride.",
            "D. The normal force removes all of the train's speed.",
          ],
          1,
          "Correct. Real coasters lose mechanical energy to friction, drag, sound, and thermal effects, so later hills must generally be lower.",
          "Not quite. The key idea is mechanical-energy loss. Friction and air resistance remove some of the energy that was available after the first hill.",
        ),
        quizQuestion(
          "Ignoring friction, a coaster reaches the bottom of a drop at 14 m/s. How high can it climb before momentarily stopping?",
          [
            "A. 5.0 m",
            "B. 10.0 m",
            "C. 14.0 m",
            "D. 19.6 m",
          ],
          1,
          "Correct. Set kinetic energy equal to gravitational potential energy: one-half mv² = mgh, so h = v²/(2g) = 14²/(2 x 9.8) = 10.0 m.",
          "Not quite. Use one-half mv² = mgh. With v = 14 m/s, the coaster can rise to 10.0 m before stopping.",
        ),
        quizQuestion(
          "A coaster has 250,000 J of mechanical energy at one point. If its gravitational potential energy there is 90,000 J, what is its kinetic energy?",
          [
            "A. 90,000 J",
            "B. 160,000 J",
            "C. 250,000 J",
            "D. 340,000 J",
          ],
          1,
          "Correct. Mechanical energy is the sum of kinetic and potential energy, so K = 250,000 - 90,000 = 160,000 J.",
          "Not quite. Use Emech = K + Ug. If the total is 250,000 J and the potential energy is 90,000 J, the kinetic energy is 160,000 J.",
        ),
        quizQuestion(
          "If a coaster's speed doubles, how does its kinetic energy change?",
          [
            "A. It doubles.",
            "B. It triples.",
            "C. It quadruples.",
            "D. It stays the same.",
          ],
          2,
          "Correct. Kinetic energy depends on v², so doubling the speed multiplies the kinetic energy by 4.",
          "Not quite. Because kinetic energy is proportional to v², doubling speed makes the kinetic energy four times as large.",
        ),
        quizQuestion(
          "A 600 kg coaster train is moving at 10 m/s. What is its kinetic energy?",
          [
            "A. 3000 J",
            "B. 30,000 J",
            "C. 60,000 J",
            "D. 300,000 J",
          ],
          1,
          "Correct. K = one-half mv² = 0.5(600)(10²) = 30,000 J.",
          "Not quite. Use kinetic energy, K = one-half mv². Substituting 600 kg and 10 m/s gives 30,000 J.",
        ),
        quizQuestion(
          "A coaster has 200,000 J of mechanical energy, then loses 20,000 J to friction and air resistance. How much mechanical energy remains?",
          [
            "A. 20,000 J",
            "B. 180,000 J",
            "C. 200,000 J",
            "D. 220,000 J",
          ],
          1,
          "Correct. Nonconservative losses reduce the mechanical energy, so 200,000 J - 20,000 J = 180,000 J remains.",
          "Not quite. Friction and air resistance remove mechanical energy from the coaster's usable energy budget. The remaining mechanical energy is 180,000 J.",
        ),
      ],
    }),
    createStep(
      "next-lesson",
      "Next Lesson",
      "Connection to the Next Lesson",
      {
        body: [
          "Energy predicts speed very efficiently, but it does not automatically tell us the force a rider feels on a curved track. For that, we need circular motion.",
          "The next lesson uses the speeds found from energy analysis and turns them into inward acceleration and radial force conditions for hills, dips, and loops.",
        ],
      },
    ),
  ],
);

const circularMotionLesson = createLesson(
  "Lesson 4: Circular Motion",
  "Loops, Hills, and Inward Force",
  "Students learn how curved motion creates inward acceleration and how that acceleration changes the forces riders feel in hills, valleys, turns, and loops.",
  [
    createStep("goal", "Big Idea", "Curves Create a New Kind of Question", {
      body: [
        "A coaster rarely moves in a straight line for long. Hills, valleys, loops, and turns all require the train's direction to change, and that means the train must have an inward acceleration toward the center of curvature.",
        "Circular-motion ideas are where coaster physics starts to feel especially distinctive. This is the lesson that explains why riders feel heavy at the bottom of a dip, light at the top of a hill, and secure inside a loop even while upside down.",
      ],
      bullets: [
        "Changing direction is acceleration even when speed stays constant.",
        "The inward net force creates the inward acceleration.",
        "Gravity and the normal force can either work together or oppose each other depending on location.",
        "Apparent weight changes because the normal force changes.",
      ],
    }),
    createStep(
      "core-concepts",
      "Core Concepts",
      "Centripetal Acceleration and Net Inward Force",
      {
        body: [
          "Centripetal acceleration points inward, toward the center of curvature. Its job is to change the direction of the velocity vector so the train follows the track instead of continuing in a straight line.",
          "Centripetal force is not a separate physical force like gravity or friction. It is the name we give to the net inward force that results from the real forces acting on the train or rider.",
          "Location matters. At the bottom of a valley, inward is upward. At the top of a hill, inward is downward. At the top of a loop, inward is also downward. Students who identify inward direction first usually avoid most sign mistakes.",
        ],
        bullets: [
          "At the bottom of a dip, riders feel heavier because the normal force is large.",
          "At the top of a hill, riders feel lighter because the normal force is smaller.",
          "At the top of a loop, gravity helps provide the inward force.",
          "The tighter the radius or the larger the speed, the larger the inward acceleration.",
        ],
        callout:
          "One of the most common errors in circular motion is saying the force points outward because the rider feels pushed outward. The real acceleration and net force point inward.",
        practice: practiceQuestion(
          "A coaster is at the bottom of a dip. Which direction is inward for the circular-motion analysis?",
          [
            "A. Downward",
            "B. Upward",
            "C. Forward along the track",
            "D. Outward away from the center",
          ],
          1,
          "Correct. At the bottom of a dip, the center of curvature is above the coaster, so the inward direction is upward.",
          "Not quite. First identify where the center of curvature is. At the bottom of a dip, it is above the coaster, so inward is upward.",
        ),
      },
    ),
    createStep("equations", "Equations", "Key Equations", {
      body: [
        "These are the two core circular-motion relationships. Once you know the speed and radius, the next section shows how a free-body diagram turns them into valley, hill, and loop equations.",
      ],
      equations: [
        equation(
          "Centripetal acceleration",
          <>
            a<sub>c</sub> = <Fraction numerator="v²" denominator="r" />
          </>,
        ),
        equation(
          "Centripetal force",
          <>
            F<sub>c</sub> = m
            <Fraction numerator="v²" denominator="r" />
          </>,
        ),
      ],
      bullets: [
        "At the top of a loop, the limiting case occurs when N = 0.",
        "You cannot use mg = mv²/r in every circular-motion problem. It only fits a very specific case.",
      ],
      practice: practiceSet(
        practiceQuestion(
          "A coaster moves at 15 m/s through a curve with radius 30 m. What is its centripetal acceleration?",
          [
            "A. 0.50 m/s²",
            "B. 7.5 m/s²",
            "C. 15 m/s²",
            "D. 30 m/s²",
          ],
          1,
          "Correct. Use a_c = v²/r = 15²/30 = 225/30 = 7.5 m/s².",
          "Not quite. Apply a_c = v²/r. With v = 15 m/s and r = 30 m, the centripetal acceleration is 7.5 m/s².",
        ),
        practiceQuestion(
          "An 800 kg coaster car moves at 20 m/s through a curve with radius 40 m. What inward net force is required?",
          [
            "A. 4000 N",
            "B. 8000 N",
            "C. 16,000 N",
            "D. 32,000 N",
          ],
          1,
          "Correct. Use Fc = mv²/r = (800)(20²)/40 = 8000 N inward.",
          "Not quite. First square the speed, then use Fc = mv²/r. The required inward force is 8000 N.",
        ),
        practiceQuestion(
          "A coaster moving at 18 m/s needs a centripetal acceleration of 9.0 m/s². What radius does the curve need?",
          [
            "A. 18 m",
            "B. 24 m",
            "C. 36 m",
            "D. 81 m",
          ],
          2,
          "Correct. Rearrange ac = v²/r to r = v²/ac. Then r = 18²/9.0 = 36 m.",
          "Not quite. Use r = v²/ac. With v = 18 m/s and ac = 9.0 m/s², the radius is 36 m.",
        ),
      ),
    }),
    createStep(
      "derivations",
      "Derive",
      "How the Valley, Hill, and Loop Equations Are Built",
      {
        body: [
          "Start every derivation by choosing the inward direction first. Then draw only the real forces on the dot, add them along the inward axis, and set that net force equal to Fc = m(v²/r).",
          "The sign changes from one location to another because inward changes from upward at the bottom of a dip to downward at the top of a hill or loop.",
        ],
        derivations: [
          {
            title: "Bottom of a Dip",
            equation: (
              <>
                N - mg = m
                <Fraction numerator="v²" denominator="r" />
              </>
            ),
            render: (isDark) => <DipForceDiagram isDark={isDark} />,
            paragraphs: [
              "At the bottom of the dip, the center of curvature is above the coaster, so inward is upward.",
              "The normal force points upward and weight points downward, so the inward net force is N - mg.",
              "Set that equal to Fc = m(v²/r) to get N - mg = m(v²/r).",
            ],
          },
          {
            title: "Top of a Hill",
            equation: (
              <>
                mg - N = m
                <Fraction numerator="v²" denominator="r" />
              </>
            ),
            render: (isDark) => <HillForceDiagram isDark={isDark} />,
            paragraphs: [
              "At the top of a hill, the center of curvature is below the coaster, so inward is downward.",
              "Weight points inward while the normal force points away from the center, so the inward net force is mg - N.",
              "That gives mg - N = m(v²/r). A smaller N here is why riders feel lighter at the crest.",
            ],
          },
          {
            title: "Top of a Loop, Minimum-Speed Case",
            equation: (
              <div className="space-y-3">
                <div>
                  mg = m
                  <Fraction numerator="v²" denominator="r" />
                </div>
                <div>
                  v = <Radical>gr</Radical>
                </div>
              </div>
            ),
            render: (isDark) => <LoopTopForceDiagram isDark={isDark} />,
            paragraphs: [
              "At the top of a loop, both N and mg point inward, which is downward toward the center of the loop.",
              "For the minimum-speed idea, use the limiting case N = 0. Then gravity alone provides the centripetal force.",
              "That leaves mg = m(v²/r), and solving for v gives v = √(gr).",
            ],
          },
        ],
      },
    ),
    createStep(
      "g-force",
      "G-Force",
      "How Roller Coasters Create G-Force",
      {
        body: [
          "On a roller coaster, g-force is a way to compare what the rider feels to ordinary gravity. The most useful rider version comes from the normal force: how hard the seat or restraint pushes on you.",
          "At rest on flat ground, N = mg, so the ratio is 1 g. If the seat pushes less than mg, the rider feels lighter than normal. If it pushes more than mg, the rider feels heavier than normal.",
          "This section stays with that basic rider idea first. It does not yet use the bottom-of-loop case; it only explains how to read g-force from the seat force compared with weight.",
        ],
        equations: [
          equation(
            "Rider g-force",
            <>
              g-force = <Fraction numerator="N" denominator="mg" />
            </>,
          ),
        ],
        cards: [
          card(
            "What N Means",
            "N is the normal force: the push from the seat or restraint on the rider.",
          ),
          card(
            "How to Read the Ratio",
            "If N = mg, the rider feels 1 g. If N is half of mg, the rider feels 0.5 g. If N is twice mg, the rider feels 2 g.",
          ),
        ],
        cardStyle: "plain",
        realWorldExample: {
          position: "bottom",
          eyebrow: "Ride Feel",
          title: "Skyrush G-Force Example",
          goal: "This example uses a crest and a valley to show how normal force changes the g-force a rider feels.",
          imageSrc: "/circular-gforce-example.png",
          imageAlt: "Roller coaster crest showing a place where riders can feel light.",
          stats: [
            {
              label: "Coaster",
              value: "Skyrush",
            },
            {
              label: "Park",
              value: "Hersheypark",
            },
            {
              label: "Max speed",
              value: "75 mph",
            },
            {
              label: "Height",
              value: "200 ft",
            },
          ],
          paragraphs: [
            "Near the top of a crest, the normal force can drop below the rider's usual weight. That makes the felt g-force less than 1 g, which is why riders often describe the moment as light or floaty.",
            "At the bottom of a tight valley or dip, the opposite can happen. The steps below show how the normal-force ratio turns into the felt g-force.",
          ],
          calculationSteps: [
            {
              label: "1. Start with the g-force ratio",
              equation: (
                <>
                  felt g-force = <Fraction numerator="N" denominator="mg" />
                </>
              ),
              note: "The normal force N is the seat or restraint force on the rider. The weight mg is the rider's ordinary gravitational force.",
            },
            {
              label: "2. For a light-feeling crest",
              equation: (
                <>
                  If N = 0.5mg, then <Fraction numerator="N" denominator="mg" /> ={" "}
                  <Fraction numerator="0.5mg" denominator="mg" /> = 0.5 g
                </>
              ),
              note: "The seat pushes with less force than usual, so the rider feels lighter than normal.",
            },
            {
              label: "3. For a heavy-feeling valley",
              equation: (
                <>
                  If N = 5mg, then <Fraction numerator="N" denominator="mg" /> ={" "}
                  <Fraction numerator="5mg" denominator="mg" /> = 5 g
                </>
              ),
              note: "That does not mean gravity became five times stronger. It means the seat pushes five times harder than the rider's ordinary weight.",
            },
            {
              label: "4. Use a 600 N rider weight example",
              equation: "N = 5(600 N) = 3000 N",
              note: "A rider who usually weighs 600 N would feel a 3000 N seat force during a 5 g moment.",
            },
          ],
          afterParagraphs: [
            "This is why the same coaster can feel floaty over a crest and extremely heavy at the bottom of a valley. The rider's mass did not change; the normal force changed.",
          ],
        },
        practice: practiceQuestion(
          "A rider's ordinary weight is 600 N. At the bottom of a valley, the seat pushes upward on the rider with a normal force of 1800 N. What g-force does the rider feel?",
          [
            "A. 0.33 g",
            "B. 1 g",
            "C. 3 g",
            "D. 1800 g",
          ],
          2,
          "Correct. Felt g-force is N/(mg). Here the ordinary weight mg is 600 N, so 1800/600 = 3 g.",
          "Not quite. Divide the normal force by the rider's ordinary weight: g-force = N/(mg) = 1800/600 = 3 g.",
        ),
      },
    ),
    createStep(
      "coaster-explanation",
      "Explain",
      "Why Riders Feel Heavy in Valleys and Light on Crests",
      {
        body: [
          "At the bottom of a valley, the track must bend the rider's motion upward. Gravity still points downward, so the seat must push upward with enough force not only to support the rider's weight but also to provide the extra upward net force needed for the turn. That is why the normal force is large there.",
          "At the top of a hill, gravity already points toward the center of curvature, so the seat does not need to push as hard. The normal force becomes smaller, and riders feel light. If the normal force falls all the way to zero, the rider experiences weightlessness relative to the seat.",
          "Loops use the same logic. At the top of the loop, gravity helps provide the inward force. That is why the coaster can keep riders in contact with the track as long as the speed is high enough and the loop is designed with a safe radius profile.",
        ],
        bullets: [
          "Real loops are not perfect circles because changing radius helps control g-forces.",
          "Banked turns reduce reliance on sideways friction by redirecting the normal force.",
          "Energy and circular motion often work together: energy finds the speed, then circular motion finds the force.",
        ],
      },
    ),
    createStep(
      "common-mistakes",
      "Common Mistakes",
      "How Circular-Motion Problems Go Wrong",
      {
        body: [
          "Circular-motion equations are short enough that students can get an answer quickly even when the setup is wrong. That makes conceptual discipline especially important here.",
        ],
        bullets: [
          "Thinking centripetal force points outward.",
          "Treating centripetal force as a separate force instead of a net force.",
          "Using mg = mv²/r in every curved-motion problem regardless of location.",
          "Forgetting that the inward direction changes from place to place on the track.",
          "Confusing actual weight with apparent weight.",
        ],
        practice: practiceQuestion(
          "Why is it a mistake to draw a separate outward centripetal force on a coaster in a curve?",
          [
            "A. The net force and acceleration point inward toward the center of curvature.",
            "B. Curved motion never requires acceleration.",
            "C. Gravity disappears whenever the track curves.",
            "D. The normal force always points outward and cancels motion.",
          ],
          0,
          "Correct. In circular motion, the acceleration and net force point inward. Centripetal force names the net inward force, not a new outward force.",
          "Not quite. The outward feeling riders notice is not a real outward force on the free-body diagram. The required net force points inward.",
        ),
      },
    ),
    createStep("practice", "Practice", "Multiple Choice Practice", {
      body: [
        "This question checks whether you can connect the algebra to rider sensation rather than treating the equations as symbols only.",
      ],
      practice: practiceQuestion(
        "Why do riders usually feel lighter at the top of a hill?",
        [
          "A. Their mass decreases at the top.",
          "B. Gravity disappears briefly at the crest.",
          "C. The normal force from the seat is smaller there.",
          "D. The centripetal force points outward at the top.",
        ],
        2,
        "Correct. At the top of a hill, gravity helps provide the inward acceleration, so the seat's normal force can be smaller and riders feel lighter.",
        "Not quite. The rider feels lighter because the seat pushes less strongly on the rider, which means the normal force is smaller at the crest.",
      ),
    }),
    createStep("quiz", "Answer Explanations", "More Multiple Choice and Explanations", {
      body: [
        "These seven questions target the minimum-speed condition, inward direction, and the force calculations riders feel in hills and dips.",
      ],
      quiz: [
        quizQuestion(
          "At the top of a loop, what condition gives the minimum speed needed to maintain contact?",
          [
            "A. N = mg",
            "B. N = 0",
            "C. v = 0",
            "D. r = 0",
          ],
          1,
          "Correct. The minimum-speed case occurs when the normal force just drops to zero. Gravity alone then provides the needed inward force.",
          "Not quite. The limiting case is when the track no longer needs to push on the train at the top, so the normal force becomes zero.",
        ),
        quizQuestion(
          "A coaster moves through a curve at constant speed. Which direction does its acceleration point?",
          [
            "A. In the direction of motion",
            "B. Opposite the motion",
            "C. Toward the center of curvature",
            "D. Straight upward only",
          ],
          2,
          "Correct. The acceleration is centripetal, so it points inward toward the center of curvature.",
          "Not quite. In curved motion at constant speed, the acceleration changes the direction of velocity, so it points toward the center of curvature.",
        ),
        quizQuestion(
          "A coaster moves at 20 m/s through a curve of radius 40 m. What is its centripetal acceleration?",
          [
            "A. 5.0 m/s²",
            "B. 10.0 m/s²",
            "C. 20.0 m/s²",
            "D. 40.0 m/s²",
          ],
          1,
          "Correct. Use a_c = v²/r = 20²/40 = 400/40 = 10.0 m/s².",
          "Not quite. Apply a_c = v²/r. With v = 20 m/s and r = 40 m, the centripetal acceleration is 10.0 m/s².",
        ),
        quizQuestion(
          "A 50 kg rider passes through the bottom of a dip at 20 m/s on a 40 m radius curve. What normal force does the seat exert?",
          [
            "A. 490 N",
            "B. 750 N",
            "C. 990 N",
            "D. 1490 N",
          ],
          2,
          "Correct. At the bottom of a dip, N - mg = mv²/r. So N = mg + mv²/r = 490 + 500 = 990 N.",
          "Not quite. At the bottom of the dip, the seat must support weight and provide extra upward force: N = mg + mv²/r = 990 N.",
        ),
        quizQuestion(
          "A 50 kg rider passes over the top of a hill at 12 m/s on a 30 m radius curve. What normal force does the seat exert?",
          [
            "A. 250 N",
            "B. 490 N",
            "C. 730 N",
            "D. 970 N",
          ],
          0,
          "Correct. At the top of a hill, mg - N = mv²/r. So N = mg - mv²/r = 490 - 240 = 250 N.",
          "Not quite. At the top of the hill, gravity helps provide the inward force, so use mg - N = mv²/r. That gives N = 250 N.",
        ),
        quizQuestion(
          "What is the minimum speed for a coaster to maintain contact at the top of a loop with radius 25 m?",
          [
            "A. 4.9 m/s",
            "B. 9.8 m/s",
            "C. 16 m/s",
            "D. 25 m/s",
          ],
          2,
          "Correct. At the minimum-contact condition, v = √(gr) = √((9.8)(25)) ≈ 16 m/s.",
          "Not quite. At the top of the loop, the minimum-contact condition is v = √(gr). With r = 25 m, that is about 16 m/s.",
        ),
        quizQuestion(
          "If a coaster's speed doubles while the curve radius stays the same, what happens to its centripetal acceleration?",
          [
            "A. It is cut in half.",
            "B. It stays the same.",
            "C. It doubles.",
            "D. It quadruples.",
          ],
          3,
          "Correct. Centripetal acceleration is a_c = v²/r, so doubling v makes v² four times larger.",
          "Not quite. The speed is squared in a_c = v²/r. Doubling speed makes the centripetal acceleration four times as large.",
        ),
      ],
    }),
    createStep(
      "next-lesson",
      "Next Lesson",
      "Connection to the Next Lesson",
      {
        body: [
          "Circular motion explains curved-track forces, but it still assumes we can talk about the coaster's energy budget clearly. Real coasters do not keep all of their mechanical energy.",
          "The next lesson studies work, friction, and power so we can explain where energy goes and how launches, lifts, and brakes transfer it.",
        ],
      },
    ),
  ],
);

const workLesson = createLesson(
  "Lesson 5: Work, Friction, and Power",
  "Where Coaster Energy Goes",
  "Students learn how work transfers energy, why friction and air resistance reduce mechanical energy, and how power describes the rate at which a coaster system adds or removes energy.",
  [
    createStep("goal", "Big Idea", "Real Coasters Need Energy Transfers", {
      body: [
        "If energy is so powerful for analyzing coasters, why does a train not simply keep returning to the same height forever? The answer is that mechanical energy is not isolated from the rest of the world. Forces can add energy, remove energy, and convert it into other forms.",
        "Work, friction, and power give us the language for those transfers. They explain how a lift hill adds energy, why later hills are lower, and how a braking section can stop a fast-moving train safely instead of violently.",
      ],
      bullets: [
        "Work measures energy transfer by a force acting through a displacement.",
        "Friction and drag usually do negative work on the coaster's mechanical energy.",
        "Power measures how quickly energy is transferred.",
        "Brakes are controlled negative-work devices, not just 'things that stop motion.'",
      ],
    }),
    createStep(
      "core-concepts",
      "Core Concepts",
      "Positive Work, Negative Work, and Power",
      {
        body: [
          "Work is defined by both force and displacement. A force can do positive work, negative work, or zero work depending on how it points relative to the motion. That is why gravity can add kinetic energy on a drop but remove it on an uphill segment.",
          "The work-energy theorem says net work changes kinetic energy. A related idea is that nonconservative work changes mechanical energy. Friction and air resistance are the central nonconservative forces in coaster analysis because they convert organized mechanical energy into thermal energy, sound, and vibration.",
          "Power is the rate of doing work. A chain lift may add a large amount of energy gradually, while a launch system may add a similar amount of energy in just a few seconds. The faster process requires more power.",
        ],
        bullets: [
          "Positive work adds mechanical energy to the coaster.",
          "Negative work removes mechanical energy from the coaster model.",
          "Zero work can occur when a force is perpendicular to the motion.",
          "Total energy is still conserved even when mechanical energy is not.",
        ],
        callout:
          "Friction does not destroy energy. It changes the form of the energy so that less of it remains available as useful coaster motion.",
        practice: practiceQuestion(
          "A coaster moves horizontally while the track's normal force acts straight upward. How much work does the normal force do at that instant?",
          [
            "A. Positive work",
            "B. Negative work",
            "C. Zero work",
            "D. Maximum possible work",
          ],
          2,
          "Correct. Work depends on the angle between force and displacement. When the force is perpendicular to the motion, the work is zero.",
          "Not quite. The normal force is perpendicular to the coaster's motion here, so W = Fd cos 90°, which gives zero work.",
        ),
      },
    ),
    createStep("equations", "Equations", "Key Equations", {
      body: [
        "These equations connect force, distance, time, and energy transfer. They are especially useful for lifts, launches, drag losses, and braking zones.",
      ],
      equations: [
        equation("Work by a constant force", <>W = Fd cosθ</>),
        equation(
          "Work-energy theorem",
          <>
            W<sub>net</sub> = ΔK
          </>,
        ),
        equation(
          "Nonconservative work",
          <>
            W<sub>nc</sub> = ΔE<sub>mech</sub>
          </>,
        ),
        equation(
          "Average power",
          <>
            P = <Fraction numerator="W" denominator="t" />
          </>,
        ),
        equation("Power from force and speed", <>P = Fv</>),
      ],
      variables: [
        {
          symbol: "W",
          meaning: "work",
          note: "The energy transferred by a force acting through a displacement.",
        },
        {
          symbol: "F",
          meaning: "force",
          note: "The force doing the work or producing the power transfer.",
        },
        {
          symbol: "d",
          meaning: "displacement",
          note: "The distance over which the force acts.",
        },
        {
          symbol: "θ",
          meaning: "angle",
          note: "The angle between the force direction and the displacement direction.",
        },
        {
          symbol: "Wnet",
          display: (
            <>
              W<sub>net</sub>
            </>
          ),
          meaning: "net work",
          note: "The total work done by all forces combined.",
        },
        {
          symbol: "ΔK",
          meaning: "change in kinetic energy",
          note: "The difference between final and initial kinetic energy.",
        },
        {
          symbol: "Wnc",
          display: (
            <>
              W<sub>nc</sub>
            </>
          ),
          meaning: "nonconservative work",
          note: "Work done by forces such as friction, drag, brakes, or launches.",
        },
        {
          symbol: "Emech",
          display: (
            <>
              E<sub>mech</sub>
            </>
          ),
          meaning: "mechanical energy",
          note: "The energy stored in kinetic and potential forms in the coaster model.",
        },
        {
          symbol: "P",
          meaning: "power",
          note: "The rate at which work is done or energy is transferred.",
        },
        {
          symbol: "t",
          meaning: "time",
          note: "The time interval over which work is done.",
        },
        {
          symbol: "v",
          meaning: "speed",
          note: "The speed of the object when using P = Fv.",
        },
      ],
      bullets: [
        "If the force points opposite the displacement, the work is negative.",
        "A launch can do large work in little time, which means large power.",
        "A brake run removes kinetic energy by doing negative work over a controlled distance.",
      ],
      practice: practiceSet(
        practiceQuestion(
          "A braking system does -24,000 J of work on a coaster over 8.0 s. What is its average power?",
          [
            "A. -300 W",
            "B. -3000 W",
            "C. 3000 W",
            "D. 192,000 W",
          ],
          1,
          "Correct. Use P = W/t = -24,000/8.0 = -3000 W. The negative sign shows the brakes are removing energy.",
          "Not quite. Average power is work divided by time. Here P = -24,000/8.0 = -3000 W, and the negative sign matters because energy is being removed.",
        ),
        practiceQuestion(
          "A launch motor pulls a coaster with a forward force of 5000 N over 12 m. If the force points in the same direction as the motion, how much work is done?",
          [
            "A. 417 J",
            "B. 5000 J",
            "C. 60,000 J",
            "D. 120,000 J",
          ],
          2,
          "Correct. When force and displacement point the same way, cosθ = 1, so W = Fd = (5000)(12) = 60,000 J.",
          "Not quite. The force is in the same direction as the motion, so use W = Fd = 60,000 J.",
        ),
        practiceQuestion(
          "A coaster has 30,000 J of kinetic energy. A launch does 45,000 J of net work on it. What is the final kinetic energy?",
          [
            "A. 15,000 J",
            "B. 30,000 J",
            "C. 45,000 J",
            "D. 75,000 J",
          ],
          3,
          "Correct. The work-energy theorem says Wnet = ΔK, so the final kinetic energy is 30,000 + 45,000 = 75,000 J.",
          "Not quite. Positive net work increases kinetic energy, so add 45,000 J to the starting 30,000 J.",
        ),
      ),
    }),
    createStep(
      "coaster-explanation",
      "Explain",
      "Launches, Lifts, Losses, and Brakes",
      {
        body: [
          "A chain lift does positive work on the train by pulling it upward and increasing its gravitational potential energy. A launch system does positive work more directly by increasing the train's kinetic energy over a short distance and time.",
          "During the ride, friction at the wheels and bearings plus air resistance do negative work on the coaster's mechanical energy. That is why a real train gradually loses some of its ability to climb back to its original height.",
          "At the end of the ride, brakes deliberately remove energy. A good braking zone is not just strong. It is controlled. Engineers want enough negative work to stop the train while keeping the force change tolerable for riders and hardware.",
        ],
        realWorldExample: {
          eyebrow: "Real-World Example",
          title: "Maverick Second Launch Energy Example",
          goal: "This example calculates the kinetic energy added by Maverick's second launch and the average power of that launch.",
          imageSrc: "/maverick-second-launch.png",
          imageAlt: "Maverick roller coaster train banking on red track at Cedar Point.",
          stats: [
            {
              label: "Coaster",
              value: "Maverick",
            },
            {
              label: "Park",
              value: "Cedar Point",
            },
            {
              label: "Max speed",
              value: "70 mph",
            },
            {
              label: "Height",
              value: "105 ft",
            },
          ],
          paragraphs: [
            "Maverick uses a second LSM launch in a tunnel. Cedar Point describes this launch as sending riders through a 400 ft tunnel and reaching 70 mph in 3 s.",
            "The launch adds kinetic energy very quickly. To keep the work clear, convert the speed, find the kinetic energy added, and then divide by time to estimate power.",
          ],
          calculationSteps: [
            {
              label: "1. Convert the launch speed",
              equation: "70 mph × 0.447 ≈ 31.3 m/s",
              note: "Use meters per second before substituting into energy equations.",
            },
            {
              label: "2. Set the launch speed and time",
              equation: (
                <>
                  v<sub>i</sub> = 0, v<sub>f</sub> = 31.3 m/s, and Δt = 3.0 s
                </>
              ),
              note: "This simplified calculation treats the launch as speeding the train from rest to 70 mph in 3.0 s.",
            },
            {
              label: "3. Use the work-energy theorem",
              equation: (
                <>
                  W<sub>net</sub> = ΔK = <Fraction numerator="1" denominator="2" />
                  mv<sub>f</sub>² - <Fraction numerator="1" denominator="2" />
                  mv<sub>i</sub>²
                </>
              ),
              note: "The launch does positive work because it increases kinetic energy.",
            },
            {
              label: "4. Find the energy added for 1 kg of train mass",
              equation: (
                <>
                  For 1 kg: W<sub>net</sub> ≈{" "}
                  <Fraction numerator="1" denominator="2" />
                  (31.3² - 0²) ≈ 490 J
                </>
              ),
              note: "Each kilogram of train mass gains about 490 J of kinetic energy in this estimate.",
            },
            {
              label: "5. Use a 75 kg sample mass",
              equation: (
                <>
                  ΔK = <Fraction numerator="1" denominator="2" />
                  (75)(31.3²) ≈ 36,700 J
                </>
              ),
              note: "A 75 kg mass is about the size of one rider, so this shows the scale of the energy change. The actual train has much more mass, so the full-train energy would be much larger.",
            },
            {
              label: "6. Find the average power for 1 kg",
              equation: (
                <>
                  For 1 kg: P ≈{" "}
                  <Fraction numerator="490 J" denominator="3 s" /> ≈ 160 W
                </>
              ),
              note: "Adding that energy in only 3 s means the launch has a large power output.",
            },
          ],
          afterParagraphs: [
            "After the launch, kinetic energy K and gravitational potential energy Ug trade back and forth as the train rises and drops. Friction and air resistance do negative nonconservative work, so W_nc = ΔE_mech is negative over the ride.",
            "At the end, the brakes do negative work to remove the remaining kinetic energy safely.",
          ],
        },
        bullets: [
          "Gravity does positive work on a drop and negative work on an uphill segment.",
          "Friction and drag become more significant as speed increases.",
          "Power tells how quickly an energy transfer happens, not just how much energy changes.",
        ],
      },
    ),
    createStep(
      "common-mistakes",
      "Common Mistakes",
      "Common Misreadings of Work and Power",
      {
        body: [
          "Students often mix up the size of a force with the amount of work, or the amount of energy with the rate at which it is transferred. This lesson requires keeping those ideas separate.",
        ],
        bullets: [
          "Thinking friction destroys energy instead of converting it.",
          "Confusing work with force.",
          "Forgetting the cosine factor in W = Fd cosθ.",
          "Confusing energy and power.",
          "Assuming mechanical energy is always conserved in real coaster motion.",
        ],
        practice: practiceQuestion(
          "A friction force acts opposite a coaster's motion through a brake run. What kind of work does friction do on the coaster's mechanical energy?",
          [
            "A. Positive work that adds mechanical energy.",
            "B. Negative work that converts mechanical energy into thermal energy and sound.",
            "C. Zero work because friction is not a real force.",
            "D. Positive power but no work.",
          ],
          1,
          "Correct. Friction acts opposite the motion, so it does negative work on the coaster's mechanical energy and converts that energy into other forms.",
          "Not quite. Friction does not destroy energy, but it does remove mechanical energy from the coaster model by converting it into heat, sound, and vibration.",
        ),
      },
    ),
    createStep("practice", "Practice", "Multiple Choice Practice", {
      body: [
        "This question targets one of the most important conceptual distinctions in the lesson: total energy is conserved, but mechanical energy may not be.",
      ],
      practice: practiceQuestion(
        "Why does friction make later hills lower even though total energy is still conserved?",
        [
          "A. Friction destroys some of the universe's energy.",
          "B. Friction converts mechanical energy into thermal energy and sound.",
          "C. Friction removes the coaster's mass.",
          "D. Friction makes gravity weaker.",
        ],
        1,
        "Correct. Friction changes mechanical energy into other forms such as heat and sound, so the coaster has less mechanical energy available to climb later hills.",
        "Not quite. Total energy is still conserved. The important point is that friction converts mechanical energy into forms that are not useful for climbing the next hill.",
      ),
    }),
    createStep("quiz", "Answer Explanations", "More Multiple Choice and Explanations", {
      body: [
        "These seven questions check whether you can interpret the physical setup and then calculate work, energy change, and power.",
      ],
      quiz: [
        quizQuestion(
          "A 500 N force pulls a coaster 20 m in the same direction as its motion. How much work is done?",
          [
            "A. 1000 J",
            "B. 5000 J",
            "C. 10,000 J",
            "D. 20,000 J",
          ],
          2,
          "Correct. Because the force is in the direction of motion, W = Fd cos0° = (500)(20) = 10,000 J.",
          "Not quite. Since the force and displacement point in the same direction, cosθ = 1, so W = (500)(20) = 10,000 J.",
        ),
        quizQuestion(
          "A chain lift does 120,000 J of work in 10 s. What is its average power?",
          [
            "A. 1200 W",
            "B. 12,000 W",
            "C. 120,000 W",
            "D. 1,200,000 W",
          ],
          1,
          "Correct. Use P = W/t = 120,000/10 = 12,000 W.",
          "Not quite. Power is work divided by time, so 120,000 J over 10 s gives 12,000 W.",
        ),
        quizQuestion(
          "A 400 N friction force acts opposite a coaster's motion over 25 m. How much work does friction do?",
          [
            "A. -10,000 J",
            "B. -1600 J",
            "C. 10,000 J",
            "D. 1600 J",
          ],
          0,
          "Correct. Because the force points opposite the motion, W = Fd cos 180° = (400)(25)(-1) = -10,000 J.",
          "Not quite. Friction does negative work when it opposes the motion. Here the result is -10,000 J.",
        ),
        quizQuestion(
          "A brake run does -50,000 J of net work on a coaster car that initially has 140,000 J of kinetic energy. How much kinetic energy remains?",
          [
            "A. 50,000 J",
            "B. 90,000 J",
            "C. 140,000 J",
            "D. 190,000 J",
          ],
          1,
          "Correct. The work-energy theorem gives Wnet = ΔK, so the final kinetic energy is 140,000 J - 50,000 J = 90,000 J.",
          "Not quite. Net work changes kinetic energy. A negative 50,000 J change means the car's kinetic energy drops from 140,000 J to 90,000 J.",
        ),
        quizQuestion(
          "A launch system pushes with a force of 3000 N while the coaster is moving at 20 m/s. What power is being delivered at that instant?",
          [
            "A. 600 W",
            "B. 6000 W",
            "C. 60,000 W",
            "D. 600,000 W",
          ],
          2,
          "Correct. Use P = Fv = (3000)(20) = 60,000 W.",
          "Not quite. Instantaneous power from force and speed is P = Fv. Here that gives 60,000 W.",
        ),
        quizQuestion(
          "A 500 N force acts at a 60° angle to the coaster's motion over a 10 m displacement. How much work does the force do?",
          [
            "A. 2500 J",
            "B. 5000 J",
            "C. 8660 J",
            "D. 10,000 J",
          ],
          0,
          "Correct. Work uses the component of force along the displacement: W = Fd cosθ = (500)(10)cos60° = 2500 J.",
          "Not quite. Only the force component along the motion does work. Use W = Fd cosθ = (500)(10)(0.5) = 2500 J.",
        ),
        quizQuestion(
          "A launch adds 80,000 J of energy while friction removes 20,000 J. What is the net change in the coaster's kinetic energy?",
          [
            "A. -100,000 J",
            "B. -60,000 J",
            "C. 60,000 J",
            "D. 100,000 J",
          ],
          2,
          "Correct. Net work is 80,000 J - 20,000 J = 60,000 J, so the kinetic energy increases by 60,000 J.",
          "Not quite. Add positive and negative work together. The net work is +60,000 J, so ΔK = +60,000 J.",
        ),
      ],
    }),
    createStep(
      "next-lesson",
      "Next Lesson",
      "Connection to the Next Lesson",
      {
        body: [
          "Work and power describe energy transfer over distance and time, but some coaster events are best described as very short interactions instead of long motion segments.",
          "The next lesson studies momentum and impulse, which are especially useful for launches, braking, and sudden changes over short time intervals.",
        ],
      },
    ),
  ],
);

const momentumLesson = createLesson(
  "Lesson 6: Momentum and Impulse",
  "Launches, Brakes, and Short Interactions",
  "Students learn how momentum and impulse describe short, intense coaster interactions such as launches, braking, and rapid safety-critical changes in motion.",
  [
    createStep("goal", "Big Idea", "Short Time Intervals Need a Different Lens", {
      body: [
        "Energy is powerful for analyzing large sections of a coaster, but some ride events are best understood through the change in momentum over a short time. Launches, emergency stops, and braking zones are the clearest examples.",
        "Momentum and impulse give us a way to connect force, time, and motion change directly. They are especially valuable in safety reasoning because they explain why a longer stopping time can dramatically reduce the average force on riders.",
      ],
      bullets: [
        "Momentum combines mass and velocity into one motion quantity.",
        "Impulse measures the effect of a force acting over a time interval.",
        "The same momentum change can happen through a large force over short time or a smaller force over long time.",
        "Longer stopping times usually mean smaller average forces on riders.",
      ],
    }),
    createStep(
      "core-concepts",
      "Core Concepts",
      "Momentum, Impulse, and Safety",
      {
        body: [
          "Momentum is defined as mass times velocity, so it is a vector. That means direction matters. A heavy train moving slowly can have as much momentum as a lighter train moving quickly, and a braking problem must account for the sign of the velocity change rather than just its magnitude.",
          "Impulse is the change in momentum. It can also be written as force times time for an average-force model. This is the key link between motion change and rider safety: if the same change in momentum happens over a longer time, the average force can be smaller.",
          "Conservation of momentum is important in some systems, but ordinary coaster motion along a track is not the best place to emphasize it because the track and brakes can apply substantial external forces. The most useful coaster applications are launches, braking, and connected-car interactions.",
        ],
        bullets: [
          "Momentum is a vector, so direction matters.",
          "Impulse can increase momentum, decrease momentum, or reverse it.",
          "Brakes work by applying an impulse opposite the train's motion.",
          "Smoother restraints and brake profiles reduce sudden force spikes on riders.",
        ],
        callout:
          "Students often treat impulse as if it were just force with a new name. It is not. Impulse measures the total effect of force acting over time.",
        practice: practiceQuestion(
          "A coaster car moving east is brought to rest by the brakes. What is the direction of the car's change in momentum?",
          [
            "A. East",
            "B. West",
            "C. Upward",
            "D. Zero, because the car ends at rest",
          ],
          1,
          "Correct. The initial momentum points east and the final momentum is zero, so Δp = pf - pi points west.",
          "Not quite. Change in momentum means final minus initial. If the car starts moving east and ends at rest, the change in momentum points west.",
        ),
      },
    ),
    createStep("equations", "Equations", "Key Equations", {
      body: [
        "These equations make short-time problems manageable. They are especially effective when a launch or brake run produces a clear before-and-after change in velocity.",
      ],
      equations: [
        equation("Momentum", <>p = mv</>),
        equation("Impulse as momentum change", <>J = Δp</>),
        equation("Impulse from force and time", <>J = FΔt</>),
        equation(
          "Momentum conservation",
          <>
            p<sub>total,i</sub> = p<sub>total,f</sub>
          </>,
        ),
      ],
      variables: [
        {
          symbol: "p",
          meaning: "momentum",
          note: "The product of mass and velocity.",
        },
        {
          symbol: "m",
          meaning: "mass",
          note: "The amount of matter in the coaster car or train.",
        },
        {
          symbol: "v",
          meaning: "velocity",
          note: "The coaster's speed with direction included.",
        },
        {
          symbol: "J",
          meaning: "impulse",
          note: "The total effect of force acting over a time interval.",
        },
        {
          symbol: "Δp",
          meaning: "change in momentum",
          note: "The difference between final and initial momentum.",
        },
        {
          symbol: "F",
          meaning: "average force",
          note: "The average force applied during the interaction.",
        },
        {
          symbol: "Δt",
          meaning: "time interval",
          note: "The duration over which the force acts.",
        },
      ],
      bullets: [
        "Use direction carefully. A negative momentum change means the final momentum points opposite the initial direction.",
        "If the stopping time increases while the momentum change stays the same, the average force decreases.",
        "Use momentum conservation only for a system with little external impulse during the short interaction.",
      ],
      practice: practiceSet(
        practiceQuestion(
          "A 500 kg coaster car speeds up from 4.0 m/s to 14 m/s in a launch section. What impulse does the launch deliver?",
          [
            "A. 900 N·s",
            "B. 5000 N·s",
            "C. 7000 N·s",
            "D. 9000 N·s",
          ],
          1,
          "Correct. Use J = Δp = m(vf - vi) = 500(14 - 4) = 5000 N·s.",
          "Not quite. Impulse equals change in momentum. Here J = 500(14 - 4) = 5000 N·s.",
        ),
        practiceQuestion(
          "A 300 kg coaster car moving at 6.0 m/s connects with a 200 kg car at rest. If they move together afterward and outside impulse is small, what is their final speed?",
          [
            "A. 2.4 m/s",
            "B. 3.6 m/s",
            "C. 6.0 m/s",
            "D. 10 m/s",
          ],
          1,
          "Correct. Use momentum conservation: p_i = (300)(6.0) + (200)(0) = 1800 kg·m/s. After they connect, v = 1800/(300 + 200) = 3.6 m/s.",
          "Not quite. Set total momentum before equal to total momentum after. The combined mass is 500 kg, so v = 1800/500 = 3.6 m/s.",
        ),
        practiceQuestion(
          "A brake applies an average force of 4000 N opposite a coaster's motion for 3.0 s. What is the impulse from the brake?",
          [
            "A. 1300 N·s opposite the motion",
            "B. 4000 N·s opposite the motion",
            "C. 12,000 N·s opposite the motion",
            "D. 24,000 N·s opposite the motion",
          ],
          2,
          "Correct. Use J = FΔt = (4000)(3.0) = 12,000 N·s, directed opposite the motion because the braking force points backward.",
          "Not quite. Impulse from average force is J = FΔt. The magnitude is 12,000 N·s, and the direction is opposite the motion.",
        ),
      ),
    }),
    createStep(
      "coaster-explanation",
      "Explain",
      "Why Launches and Brakes Belong Here",
      {
        body: [
          "A launch system applies a force over a short interval to increase the train's momentum rapidly. The same idea works in reverse for brakes, which apply a force over time to reduce the train's momentum to zero before the station.",
          "From a rider-safety perspective, the time interval is as important as the speed change. A harsh stop and a smooth stop can produce the same total momentum change, but the harsh stop does it in much less time and therefore requires a larger average force.",
          "Momentum also helps us reason about coaster trains as connected systems. Internal forces between cars can be large even when the overall train is treated as one system from the outside.",
        ],
        realWorldExample: {
          eyebrow: "Real-World Example",
          title: "VelociCoaster Launch Impulse Example",
          goal: "This example calculates the impulse delivered during VelociCoaster's second launch from the change in speed.",
          imageSrc: "/velocicoaster-momentum.png",
          imageAlt: "Jurassic World VelociCoaster train twisting through an inversion.",
          stats: [
            { label: "Coaster", value: "VelociCoaster" },
            { label: "Park", value: "Universal Islands of Adventure" },
            { label: "Max speed", value: "70 mph" },
            { label: "Height", value: "155 ft" },
          ],
          paragraphs: [
            "VelociCoaster is a strong momentum example because its launch system changes the train's velocity over a short time. A change in velocity means a change in momentum, so the launch delivers an impulse.",
            "For this calculation, use the second launch speed change from about 40 mph to 70 mph. The exact train mass is not needed if we first find the impulse for 1 kg of train mass.",
          ],
          calculationSteps: [
            {
              label: "1. Convert the two speeds",
              equation: "40 mph × 0.447 ≈ 17.9 m/s and 70 mph × 0.447 ≈ 31.3 m/s",
              note: "Convert both launch speeds to meters per second before using momentum.",
            },
            {
              label: "2. Find the change in velocity",
              equation: (
                <>
                  Δv = v<sub>f</sub> - v<sub>i</sub> = 31.3 - 17.9 ≈ 13.4 m/s
                </>
              ),
              note: "The launch increases the train's speed by about 13.4 m/s.",
            },
            {
              label: "3. Use impulse as momentum change",
              equation: "J = Δp = mΔv",
              note: "The launch impulse equals the train's change in momentum.",
            },
            {
              label: "4. Find the impulse for 1 kg of train mass",
              equation: (
                <>
                  J = (1 kg)(13.4 m/s) ≈ 13.4 N·s
                </>
              ),
              note: "This means each kilogram of train mass gains about 13.4 N·s of impulse. For a full train, multiply 13.4 N·s by the train's mass in kilograms.",
            },
          ],
          afterParagraphs: [
            "This is why launches belong in the momentum chapter: they are not just energy transfers. They are short-time force events that rapidly change the train's momentum.",
            "The same idea works in reverse during braking. A brake run gives the train an impulse opposite its motion, which reduces the train's momentum.",
          ],
        },
        bullets: [
          "Launches increase momentum.",
          "Brakes decrease momentum.",
          "Longer stopping times reduce average force for the same change in momentum.",
        ],
      },
    ),
    createStep(
      "common-mistakes",
      "Common Mistakes",
      "Errors in Short-Time Reasoning",
      {
        body: [
          "Momentum problems often look simple, but they become misleading very quickly if direction is ignored or if impulse is mistaken for force by itself.",
        ],
        bullets: [
          "Treating momentum as a scalar instead of a vector.",
          "Forgetting that impulse equals change in momentum, not just final momentum.",
          "Confusing impulse with force.",
          "Ignoring direction when the coaster stops or reverses.",
          "Assuming momentum is automatically conserved even when strong external forces act.",
        ],
        practice: practiceQuestion(
          "During braking, what does the impulse from the brakes equal?",
          [
            "A. The train's final momentum only.",
            "B. The train's change in momentum, including direction.",
            "C. The train's mass only.",
            "D. The braking force without considering time.",
          ],
          1,
          "Correct. Impulse equals change in momentum, J = Δp. Direction matters because momentum is a vector.",
          "Not quite. Impulse is not the same thing as force by itself. It is the effect of force over time, and it equals the change in momentum.",
        ),
      },
    ),
    createStep("practice", "Practice", "Multiple Choice Practice", {
      body: [
        "This first question checks the main safety insight of the lesson: why engineers care so much about stopping time and not just stopping distance.",
      ],
      practice: practiceQuestion(
        "Why does increasing stopping time reduce the average force on riders during braking?",
        [
          "A. Because the train loses less momentum overall.",
          "B. Because the same momentum change is spread over a longer time.",
          "C. Because gravity disappears during braking.",
          "D. Because the rider's mass becomes smaller.",
        ],
        1,
        "Correct. For a fixed momentum change, a longer time interval means a smaller average force because Favg = Δp/Δt.",
        "Not quite. The key idea is that the same change in momentum spread over more time requires a smaller average force.",
      ),
    }),
    createStep("quiz", "Answer Explanations", "More Multiple Choice and Explanations", {
      body: [
        "These seven questions cover braking, launches, direction, and the force-time tradeoff that matters for rider safety.",
      ],
      quiz: [
        quizQuestion(
          "A 700 kg coaster car moving at 18 m/s is brought to rest in 6.0 s. What is the magnitude of the average braking force?",
          [
            "A. 300 N",
            "B. 1200 N",
            "C. 2100 N",
            "D. 12,600 N",
          ],
          2,
          "Correct. The momentum change is 12,600 kg·m/s in magnitude, and dividing by 6.0 s gives 2100 N.",
          "Not quite. Use Δp = mΔv = 700(18) = 12,600 kg·m/s in magnitude, then divide by 6.0 s to get 2100 N.",
        ),
        quizQuestion(
          "A launch system accelerates a 600 kg car from rest to 25 m/s. What impulse does the launch deliver?",
          [
            "A. 24 N·s",
            "B. 600 N·s",
            "C. 15,000 N·s",
            "D. 25,000 N·s",
          ],
          2,
          "Correct. Impulse equals change in momentum: J = mΔv = 600(25) = 15,000 N·s.",
          "Not quite. Because the car starts from rest, the impulse is J = m(vf - vi) = 600(25) = 15,000 N·s.",
        ),
        quizQuestion(
          "A 500 kg coaster car moves east at 12 m/s. What is its momentum?",
          [
            "A. 6000 kg·m/s east",
            "B. 6000 kg·m/s west",
            "C. 41.7 kg·m/s east",
            "D. 12 kg·m/s east",
          ],
          0,
          "Correct. Momentum is p = mv = (500)(12) = 6000 kg·m/s, and it points east because the car is moving east.",
          "Not quite. Momentum equals mass times velocity. Here p = (500)(12) = 6000 kg·m/s east.",
        ),
        quizQuestion(
          "If the same momentum change happens over twice as much time, what happens to the average force?",
          [
            "A. It doubles.",
            "B. It is cut in half.",
            "C. It stays the same.",
            "D. It becomes zero.",
          ],
          1,
          "Correct. Since Favg = Δp/Δt, doubling the time while keeping the same momentum change cuts the average force in half.",
          "Not quite. Average force depends on how quickly the momentum changes. For the same Δp, twice the time means half the average force.",
        ),
        quizQuestion(
          "A 800 kg coaster car slows from 10 m/s east to 5 m/s east. What is the magnitude of the impulse during braking?",
          [
            "A. 4000 N·s",
            "B. 8000 N·s",
            "C. 12,000 N·s",
            "D. 15,000 N·s",
          ],
          0,
          "Correct. The change in momentum has magnitude m times the change in speed: 800 times 5 = 4000 N·s.",
          "Not quite. Use impulse equals change in momentum. The car loses 5 m/s of speed, so the impulse magnitude is (800)(5) = 4000 N·s.",
        ),
        quizQuestion(
          "A 700 kg coaster car moving east at 10 m/s couples with an identical car at rest. If outside impulse is negligible, what is their shared speed afterward?",
          [
            "A. 2.5 m/s east",
            "B. 5.0 m/s east",
            "C. 10 m/s east",
            "D. 20 m/s east",
          ],
          1,
          "Correct. Initial momentum is (700)(10) = 7000 kg·m/s east. The combined mass is 1400 kg, so v = 7000/1400 = 5.0 m/s east.",
          "Not quite. Conserve total momentum for the short coupling event: (700)(10) = (1400)v, so v = 5.0 m/s east.",
        ),
        quizQuestion(
          "Brakes apply an average force of 3000 N opposite the train's motion for 4.0 s. What impulse do the brakes deliver?",
          [
            "A. 750 N·s opposite the motion",
            "B. 3000 N·s opposite the motion",
            "C. 12,000 N·s opposite the motion",
            "D. 24,000 N·s opposite the motion",
          ],
          2,
          "Correct. Impulse from average force is J = FΔt = (3000)(4.0) = 12,000 N·s, directed opposite the motion.",
          "Not quite. Use J = FΔt. The impulse magnitude is (3000)(4.0) = 12,000 N·s, and its direction is opposite the train's motion.",
        ),
      ],
    }),
    createStep(
      "next-lesson",
      "Next Lesson",
      "Connection to the Next Lesson",
      {
        body: [
          "So far we have mostly treated the coaster car as a translating object. Real coasters also have rotating parts that store energy and respond to torque.",
          "The next lesson extends the mechanics story to wheels, axles, and rolling motion through rotation and torque.",
        ],
      },
    ),
  ],
);

const rotationLesson = createLesson(
  "Lesson 7: Rotation and Torque",
  "Wheels, Axles, and Rolling Motion",
  "Students learn how rotational motion, torque, rotational inertia, and rolling energy apply to coaster wheels, axles, and real engineering decisions.",
  [
    createStep("goal", "Big Idea", "Coasters Translate and Rotate at the Same Time", {
      body: [
        "A coaster train does not move like a single featureless block. Its wheels spin, axles experience torques, and some of the ride's energy goes into rotational motion instead of pure translation.",
        "This lesson expands the mechanics picture from 'where is the train going?' to 'how are the moving parts turning?' That shift matters for efficiency, wear, stability, and realistic engineering decisions.",
      ],
      bullets: [
        "Connect linear motion to angular motion through the wheel radius.",
        "Use torque as the rotational analog of force.",
        "Recognize that mass distribution matters through rotational inertia.",
        "Account for rotational kinetic energy in rolling systems.",
      ],
    }),
    createStep(
      "core-concepts",
      "Core Concepts",
      "Angular Motion, Torque, and Rotational Inertia",
      {
        body: [
          "Angular position, angular velocity, and angular acceleration describe rotational motion the way position, velocity, and acceleration describe translational motion. For a wheel rolling without slipping, those two descriptions are connected rather than separate.",
          "Torque measures the rotational effect of a force. A force applied farther from an axle generally produces a larger turning effect than the same force applied near the center. This is why lever arm matters as much as force magnitude.",
          "Rotational inertia is the resistance to changes in rotational motion. It depends on how the mass is distributed. Mass concentrated farther from the axis makes an object harder to spin up or slow down, which is why wheel design matters physically and not just aesthetically.",
        ],
        bullets: [
          "Rolling without slipping links linear speed and angular speed.",
          "Torque depends on force, lever arm, and angle.",
          "Rotational inertia depends on mass distribution, not only total mass.",
          "Rolling objects can have both translational and rotational kinetic energy.",
        ],
        callout:
          "Students often treat rotational inertia like ordinary mass. It plays a similar role, but it depends on where the mass is relative to the axis, not just how much mass there is.",
        practice: practiceQuestion(
          "Two coaster wheels rotate at the same angular speed. Which wheel has the greater linear speed at its rim?",
          [
            "A. The smaller-radius wheel",
            "B. Both have the same linear speed",
            "C. The larger-radius wheel",
            "D. The heavier wheel",
          ],
          2,
          "Correct. For rolling motion, v = rω. If angular speed is the same, the wheel with the larger radius has the larger linear speed at the rim.",
          "Not quite. Use the rolling connection v = rω. With the same angular speed, a larger radius gives a larger linear speed.",
        ),
      },
    ),
    createStep("equations", "Equations", "Key Equations", {
      body: [
        "These equations connect wheel motion, turning effect, and energy storage in rotating parts. They matter most when the coaster's forward motion is being transferred into spinning motion at the wheels.",
      ],
      equations: [
        equation("Linear and angular speed", <>v = rω</>),
        equation("Linear and angular acceleration", <>a = rα</>),
        equation("Torque", <>τ = rF sinθ</>),
        equation("Rotational Newton's Second Law", <>τ<sub>net</sub> = Iα</>),
        equation(
          "Rotational kinetic energy",
          <>
            K<sub>rot</sub> = <Fraction numerator="1" denominator="2" />
            Iω²
          </>,
        ),
        equation(
          "Total kinetic energy for rolling motion",
          <>
            K<sub>total</sub> = <Fraction numerator="1" denominator="2" />
            mv² + <Fraction numerator="1" denominator="2" />
            Iω²
          </>,
        ),
      ],
      variables: [
        {
          symbol: "v",
          meaning: "linear speed",
          note: "The forward speed of the coaster or wheel rim.",
        },
        {
          symbol: "r",
          meaning: "radius",
          note: "The distance from the rotation axis to the point of interest.",
        },
        {
          symbol: "ω",
          meaning: "angular speed",
          note: "How fast the object rotates.",
        },
        {
          symbol: "a",
          meaning: "linear acceleration",
          note: "The rate of change of linear velocity.",
        },
        {
          symbol: "α",
          meaning: "angular acceleration",
          note: "The rate of change of angular velocity.",
        },
        {
          symbol: "τ",
          meaning: "torque",
          note: "The turning effect of a force about an axis.",
        },
        {
          symbol: "τnet",
          display: (
            <>
              τ<sub>net</sub>
            </>
          ),
          meaning: "net torque",
          note: "The combined turning effect that changes angular motion.",
        },
        {
          symbol: "F",
          meaning: "force",
          note: "The force producing the torque.",
        },
        {
          symbol: "θ",
          meaning: "angle",
          note: "The angle between the lever arm and the force direction.",
        },
        {
          symbol: "I",
          meaning: "rotational inertia",
          note: "The rotational resistance to changes in motion.",
        },
        {
          symbol: "Krot",
          display: (
            <>
              K<sub>rot</sub>
            </>
          ),
          meaning: "rotational kinetic energy",
          note: "Energy stored in spinning motion.",
        },
        {
          symbol: "Ktotal",
          display: (
            <>
              K<sub>total</sub>
            </>
          ),
          meaning: "total kinetic energy",
          note: "The combined translational and rotational kinetic energy.",
        },
        {
          symbol: "m",
          meaning: "mass",
          note: "The mass of the moving object.",
        },
      ],
      bullets: [
        "If the wheel rolls without slipping, v = rω is the key bridge between translation and rotation.",
        "Net torque changes angular motion the way net force changes linear motion.",
        "The same force can create very different torques depending on where it is applied.",
      ],
      practice: practiceSet(
        practiceQuestion(
          "A 40 N force is applied perpendicularly 0.25 m from a wheel's axle. What torque is produced?",
          [
            "A. 1.6 N·m",
            "B. 10 N·m",
            "C. 40 N·m",
            "D. 160 N·m",
          ],
          1,
          "Correct. Use τ = rF sinθ. With a perpendicular force, sin 90° = 1, so τ = (0.25)(40) = 10 N·m.",
          "Not quite. Use τ = rF sinθ. Because the force is perpendicular, the torque is (0.25)(40) = 10 N·m.",
        ),
        practiceQuestion(
          "A wheel has rotational inertia 2.0 kg·m² and a net torque of 6.0 N·m. What is its angular acceleration?",
          [
            "A. 0.33 rad/s²",
            "B. 3.0 rad/s²",
            "C. 8.0 rad/s²",
            "D. 12 rad/s²",
          ],
          1,
          "Correct. Use τnet = Iα, so α = τnet/I = 6.0/2.0 = 3.0 rad/s².",
          "Not quite. Net torque causes angular acceleration. Rearrange τnet = Iα to get α = 6.0/2.0 = 3.0 rad/s².",
        ),
        practiceQuestion(
          "A coaster wheel has radius 0.25 m and angular speed 48 rad/s. What is the linear speed at the rim?",
          [
            "A. 4.8 m/s",
            "B. 12 m/s",
            "C. 24 m/s",
            "D. 192 m/s",
          ],
          1,
          "Correct. Use v = rω = (0.25)(48) = 12 m/s.",
          "Not quite. Linear rim speed is radius times angular speed: v = rω = 12 m/s.",
        ),
      ),
    }),
    createStep(
      "coaster-explanation",
      "Explain",
      "Why Wheels and Axles Matter on Real Rides",
      {
        body: [
          "As the train moves forward, each wheel rotates. That means part of the ride's energy is stored in wheel spin rather than only in the translation of the train's center of mass. In many classroom problems this effect is small enough to ignore, but in engineering it is real.",
          "Torque matters because forces from the track and axle can twist components, and the wheel geometry determines how forward motion and rotation stay linked. Bearings, wheel materials, and alignment all matter because they influence both energy loss and mechanical stress.",
          "This is also where students see that the simplified 'particle model' of earlier lessons has limits. The full train is a system of translating and rotating parts, and realistic design decisions have to respect both.",
        ],
        bullets: [
          "Wheel design affects efficiency because rotational kinetic energy is part of the total energy budget.",
          "Poor bearings increase unwanted friction and energy loss.",
          "Mass farther from the axle makes a wheel harder to spin up and slow down.",
        ],
      },
    ),
    createStep(
      "common-mistakes",
      "Common Mistakes",
      "What Students Mix Up in Rotation",
      {
        body: [
          "Rotation introduces new symbols, but the deeper difficulty is conceptual. Students often know the formula and still miss what is actually harder to rotate or why a larger lever arm matters.",
        ],
        bullets: [
          "Confusing torque with force.",
          "Forgetting torque depends on lever arm and angle.",
          "Mixing up linear velocity and angular velocity.",
          "Ignoring rotational kinetic energy in rolling systems.",
          "Assuming all wheels respond the same way regardless of rotational inertia.",
        ],
        practice: practiceQuestion(
          "Two coaster wheels have the same mass, but one has more of its mass near the rim. Which wheel is harder to spin up?",
          [
            "A. The wheel with more mass near the rim, because its rotational inertia is larger.",
            "B. The wheel with more mass near the axle, because its radius disappears.",
            "C. They are always equally hard to spin because mass is the only factor.",
            "D. Neither wheel can have rotational kinetic energy.",
          ],
          0,
          "Correct. Rotational inertia depends on how mass is distributed. Mass farther from the axle makes the wheel harder to spin up or slow down.",
          "Not quite. Mass distribution matters in rotation. Putting more mass near the rim increases rotational inertia.",
        ),
      },
    ),
    createStep("practice", "Practice", "Multiple Choice Practice", {
      body: [
        "This first question checks the most fundamental translation-rotation connection before moving on to torque and inertia.",
      ],
      practice: practiceQuestion(
        "A wheel of radius 0.20 m rotates at 50 rad/s. What is the linear speed at the rim?",
        [
          "A. 2.5 m/s",
          "B. 10 m/s",
          "C. 25 m/s",
          "D. 250 m/s",
        ],
        1,
        "Correct. Use v = rω = (0.20)(50) = 10 m/s.",
        "Not quite. Multiply radius by angular speed: v = rω = (0.20)(50) = 10 m/s.",
      ),
    }),
    createStep("quiz", "Answer Explanations", "More Multiple Choice and Explanations", {
      body: [
        "These seven questions target the most important extensions beyond v = rω: torque, rotational inertia, and rolling-speed calculations.",
      ],
      quiz: [
        quizQuestion(
          "Why does applying the same force farther from the axle create a larger torque?",
          [
            "A. Because the mass automatically increases.",
            "B. Because the lever arm is larger.",
            "C. Because gravity is stronger at the rim.",
            "D. Because angular velocity must already be zero.",
          ],
          1,
          "Correct. Torque depends on the lever arm, so the same force produces a larger turning effect when applied farther from the axis.",
          "Not quite. The key factor is the larger lever arm, which increases the turning effect of the force.",
        ),
        quizQuestion(
          "Why is an object with more mass farther from the axis harder to spin?",
          [
            "A. Because its rotational inertia is larger.",
            "B. Because its weight disappears.",
            "C. Because torque becomes impossible.",
            "D. Because linear velocity becomes zero.",
          ],
          0,
          "Correct. Rotational inertia increases when mass is distributed farther from the axis, so changes in rotational motion become harder to produce.",
          "Not quite. The mass distribution raises the rotational inertia, which is the rotational analog of resistance to acceleration.",
        ),
        quizQuestion(
          "A wheel of radius 0.30 m rotates at 40 rad/s. What is the linear speed at the rim?",
          [
            "A. 3.0 m/s",
            "B. 12 m/s",
            "C. 40 m/s",
            "D. 120 m/s",
          ],
          1,
          "Correct. Use v = rω = (0.30)(40) = 12 m/s.",
          "Not quite. Multiply radius by angular speed. With r = 0.30 m and ω = 40 rad/s, the rim speed is 12 m/s.",
        ),
        quizQuestion(
          "A 50 N force is applied perpendicular to a lever arm 0.20 m from an axle. What torque is produced?",
          [
            "A. 2.5 N·m",
            "B. 5.0 N·m",
            "C. 10 N·m",
            "D. 50 N·m",
          ],
          2,
          "Correct. For a perpendicular force, τ = rF = (0.20)(50) = 10 N·m.",
          "Not quite. Use τ = rF sinθ. Because the force is perpendicular, sin 90° = 1, so the torque is 10 N·m.",
        ),
        quizQuestion(
          "Why does a rolling wheel have more total kinetic energy than just one-half mv²?",
          [
            "A. Because gravity adds extra kinetic energy automatically",
            "B. Because some of the energy is stored in rotational motion",
            "C. Because torque and force are the same quantity",
            "D. Because rolling removes translational kinetic energy entirely",
          ],
          1,
          "Correct. A rolling object can store energy in both translation and rotation, so the total kinetic energy includes a rotational term as well as one-half mv².",
          "Not quite. Rolling motion includes spinning, so the total kinetic energy must include rotational kinetic energy in addition to translational kinetic energy.",
        ),
        quizQuestion(
          "A wheel has rotational inertia 3.0 kg·m² and experiences a net torque of 12 N·m. What is its angular acceleration?",
          [
            "A. 0.25 rad/s²",
            "B. 4.0 rad/s²",
            "C. 9.0 rad/s²",
            "D. 36 rad/s²",
          ],
          1,
          "Correct. Use τnet = Iα, so α = τnet/I = 12/3.0 = 4.0 rad/s².",
          "Not quite. Net torque changes angular motion. Rearrange τnet = Iα to get α = 12/3.0 = 4.0 rad/s².",
        ),
        quizQuestion(
          "A rotating wheel has I = 4.0 kg·m² and angular speed 5.0 rad/s. What is its rotational kinetic energy?",
          [
            "A. 10 J",
            "B. 20 J",
            "C. 50 J",
            "D. 100 J",
          ],
          2,
          "Correct. Krot = one-half Iω² = 0.5(4.0)(5.0²) = 50 J.",
          "Not quite. Use Krot = one-half Iω². Substituting I = 4.0 kg·m² and ω = 5.0 rad/s gives 50 J.",
        ),
      ],
    }),
    createStep(
      "next-lesson",
      "Next Lesson",
      "Connection to the Next Lesson",
      {
        body: [
          "By this point the course has built motion, forces, energy, curved motion, losses, impulse, and rotation as separate tools. Real coaster engineering uses them together.",
          "The final lesson synthesizes those ideas into full-track design and safety reasoning.",
        ],
      },
    ),
  ],
);

const designSafetyLesson = createLesson(
  "Lesson 8: Real-World Coaster Design and Safety",
  "Putting Mechanics Together",
  "Students synthesize the entire mechanics sequence into a realistic view of coaster engineering, where speed, force, comfort, and safety all have to work at the same time.",
  [
    createStep("goal", "Big Idea", "A Real Coaster Is Applied Mechanics", {
      body: [
        "A roller coaster is not just a collection of separate textbook problems. It is a tightly connected engineering system in which motion, forces, energy, circular motion, work, impulse, and rotation all have to agree with one another.",
        "The final lesson asks students to think like designers. The question is no longer only 'can I solve for the speed?' It becomes 'is this layout physically plausible, exciting, comfortable, and safe?'",
      ],
      bullets: [
        "Use mechanics to judge whether a layout is physically consistent.",
        "Balance thrill with rider comfort and safety limits.",
        "Plan where energy is added, converted, lost, and removed.",
        "Treat safety systems as part of the physics story rather than as an afterthought.",
      ],
    }),
    createStep(
      "core-concepts",
      "Core Concepts",
      "Design Constraints and Safety Thinking",
      {
        body: [
          "Real coaster design is constrained by maximum height, maximum speed, track length, rider comfort, g-force limits, available land, materials, and cost. A design can be mathematically interesting and still be a poor coaster if it ignores these realities.",
          "G-forces matter in several ways. Positive g-forces can make riders feel very heavy, negative g-forces can create airtime, and lateral forces can become uncomfortable or unsafe if turns are not designed carefully. That is why smooth transitions, proper banking, and changing-radius elements matter so much.",
          "Engineers also care about jerk, which is the rate at which acceleration changes. A force can be within a safe range and still feel rough if it changes too suddenly, so smooth transitions are about controlling both acceleration and how quickly acceleration changes.",
          "Safety also depends on systems beyond the track shape itself. Restraints, block zones, sensors, control systems, and emergency brakes are all examples of layered design thinking. Excitement and control have to coexist.",
        ],
        bullets: [
          "A safe coaster needs enough speed to complete elements but not so much that forces exceed acceptable limits.",
          "Clothoid loops are safer than simple circular loops because the radius changes with position.",
          "Longer braking distances usually reduce stopping force.",
          "Good design manages both the size of forces and how quickly those forces change.",
        ],
        callout:
          "The most common beginner design mistake is assuming that 'faster' automatically means 'better.' In real ride design, faster without control can quickly become uncomfortable or unsafe.",
        practice: practiceQuestion(
          "Why do engineers prefer smooth transitions between track elements instead of abrupt shape changes?",
          [
            "A. They make gravity stronger during the ride.",
            "B. They reduce rapid changes in rider force and improve comfort.",
            "C. They remove the need for brakes.",
            "D. They guarantee the coaster never loses energy.",
          ],
          1,
          "Correct. Smooth transitions help control how quickly the forces on riders change, which improves both comfort and safety.",
          "Not quite. The key reason is rider force management. Smooth transitions reduce sudden changes in acceleration and force.",
        ),
      },
    ),
    createStep("equations", "Equations", "Key Equations", {
      body: [
        "A real design lesson does not introduce many new equations. Instead, it combines the earlier equations and asks which one governs each part of the track.",
      ],
      equations: [
        equation(
          "Energy comparison",
          <>
            K<sub>i</sub> + U<sub>gi</sub> = K<sub>f</sub> + U<sub>gf</sub>
          </>,
        ),
        equation("Newton's Second Law", <>F<sub>net</sub> = ma</>),
        equation(
          "Curved-motion force condition",
          <>
            F<sub>c</sub> = m
            <Fraction numerator="v²" denominator="r" />
          </>,
        ),
        equation(
          "Mechanical-energy loss",
          <>
            W<sub>nc</sub> = ΔE<sub>mech</sub>
          </>,
        ),
        equation("Impulse", <>J = Δp</>),
        equation(
          "Jerk",
          <>
            j = <Fraction numerator="Δa" denominator="Δt" />
          </>,
        ),
        equation(
          "Rolling kinetic energy",
          <>
            K<sub>total</sub> = <Fraction numerator="1" denominator="2" />
            mv² + <Fraction numerator="1" denominator="2" />
            Iω²
          </>,
        ),
      ],
      variables: [
        {
          symbol: "Ki",
          display: (
            <>
              K<sub>i</sub>
            </>
          ),
          meaning: "initial kinetic energy",
          note: "The kinetic energy before the motion segment or event.",
        },
        {
          symbol: "Ugi",
          display: (
            <>
              U<sub>gi</sub>
            </>
          ),
          meaning: "initial gravitational potential energy",
          note: "The gravitational potential energy at the starting point.",
        },
        {
          symbol: "Kf",
          display: (
            <>
              K<sub>f</sub>
            </>
          ),
          meaning: "final kinetic energy",
          note: "The kinetic energy after the motion segment or event.",
        },
        {
          symbol: "Ugf",
          display: (
            <>
              U<sub>gf</sub>
            </>
          ),
          meaning: "final gravitational potential energy",
          note: "The gravitational potential energy at the ending point.",
        },
        {
          symbol: "Fnet",
          display: (
            <>
              F<sub>net</sub>
            </>
          ),
          meaning: "net force",
          note: "The vector sum of all forces acting on the coaster or rider.",
        },
        {
          symbol: "a",
          meaning: "acceleration",
          note: "The rate at which velocity changes.",
        },
        {
          symbol: "Fc",
          display: (
            <>
              F<sub>c</sub>
            </>
          ),
          meaning: "centripetal force",
          note: "The net inward force required to keep the coaster following a curved path.",
        },
        {
          symbol: "m",
          meaning: "mass",
          note: "The mass of the coaster car, train, or rider being analyzed.",
        },
        {
          symbol: "v",
          meaning: "speed",
          note: "The magnitude of the coaster's velocity.",
        },
        {
          symbol: "r",
          meaning: "radius of curvature",
          note: "How tight the hill, dip, loop, or turn is.",
        },
        {
          symbol: "Wnc",
          display: (
            <>
              W<sub>nc</sub>
            </>
          ),
          meaning: "nonconservative work",
          note: "Work done by friction, drag, brakes, or other nonconservative forces.",
        },
        {
          symbol: "Emech",
          display: (
            <>
              E<sub>mech</sub>
            </>
          ),
          meaning: "mechanical energy",
          note: "The total kinetic-plus-potential energy in the idealized coaster model.",
        },
        {
          symbol: "J",
          meaning: "impulse",
          note: "The total effect of force acting over time during a short interaction.",
        },
        {
          symbol: "j",
          meaning: "jerk",
          note: "The rate at which acceleration changes; lower jerk usually feels smoother to riders.",
        },
        {
          symbol: "Δp",
          meaning: "change in momentum",
          note: "The difference between final and initial momentum.",
        },
        {
          symbol: "Ktotal",
          display: (
            <>
              K<sub>total</sub>
            </>
          ),
          meaning: "total kinetic energy",
          note: "The combined translational and rotational kinetic energy.",
        },
        {
          symbol: "I",
          meaning: "rotational inertia",
          note: "The rotational resistance to changes in spinning motion.",
        },
        {
          symbol: "ω",
          meaning: "angular speed",
          note: "How quickly a rotating part spins.",
        },
      ],
      bullets: [
        "A full ride uses different equations in different places, but the physics still has to agree from start to finish.",
        "Design work often means choosing the right model at the right location, not using one formula everywhere.",
        "A comfortable layout controls jerk, not just maximum speed or maximum acceleration.",
      ],
      practice: practiceSet(
        practiceQuestion(
          "A coaster enters a brake run with 90,000 J of kinetic energy and comes to rest at the same height. How much nonconservative work must the brakes do?",
          [
            "A. -90,000 J",
            "B. 0 J",
            "C. 90,000 J",
            "D. 180,000 J",
          ],
          0,
          "Correct. Since the coaster stops at the same height, its mechanical energy decreases by 90,000 J, so the brakes must do -90,000 J of nonconservative work.",
          "Not quite. At the same height, the lost kinetic energy must be removed by the brakes. That means W_nc = ΔE_mech = -90,000 J.",
        ),
        practiceQuestion(
          "A 700 kg coaster car moves through a turn at 16 m/s with radius 32 m. What inward force is required?",
          [
            "A. 350 N",
            "B. 2800 N",
            "C. 5600 N",
            "D. 11,200 N",
          ],
          2,
          "Correct. Use Fc = mv²/r = (700)(16²)/32 = (700)(8) = 5600 N inward.",
          "Not quite. Use the curved-motion force equation Fc = mv²/r. Square the speed first: 16²/32 = 8, so Fc = 5600 N.",
        ),
        practiceQuestion(
          "A transition changes rider acceleration from 3.0 m/s² to 9.0 m/s² in 2.0 s. What is the average jerk?",
          [
            "A. 2.0 m/s³",
            "B. 3.0 m/s³",
            "C. 6.0 m/s³",
            "D. 12 m/s³",
          ],
          1,
          "Correct. Use j = Δa/Δt. The acceleration changes by 6.0 m/s² over 2.0 s, so j = 3.0 m/s³.",
          "Not quite. Jerk is acceleration change divided by time: (9.0 - 3.0)/2.0 = 3.0 m/s³.",
        ),
      ),
    }),
    createStep(
      "coaster-explanation",
      "Explain",
      "How Engineers Read a Full Layout",
      {
        body: [
          "The first hill sets the initial energy budget. The first drop often creates the maximum speed, which means it also strongly influences later g-forces in valleys, loops, and turns. If the early energy budget is misjudged, the rest of the ride will be inconsistent.",
          "Curved elements must be designed so the required inward acceleration does not create unacceptable normal forces on riders. That is why engineers care deeply about radius, transition smoothness, and the precise sequence of hills, valleys, and banking.",
          "Brake runs and block zones are just as important as the thrill elements. A ride is only successful if it can remove energy as deliberately as it adds and redistributes it. In that sense, safety design is not separate from mechanics. It is mechanics applied responsibly.",
        ],
        bullets: [
          "Identify where energy is highest, where speed is highest, and where riders feel the largest normal force.",
          "Check whether later hills are consistent with losses from friction and drag.",
          "Use banking and smooth transitions to reduce unwanted lateral and jerking forces.",
        ],
      },
    ),
    createStep(
      "common-mistakes",
      "Common Mistakes",
      "Design Errors That Ignore the Physics",
      {
        body: [
          "The easiest way to make an unrealistic coaster is to forget that every exciting feature has to be paid for by energy and constrained by force limits.",
        ],
        bullets: [
          "Designing later hills too tall without accounting for energy loss.",
          "Ignoring g-forces in loops, dips, and tight turns.",
          "Assuming faster is always better.",
          "Forgetting rider comfort and smooth transitions.",
          "Treating idealized classroom physics as if it were identical to real engineering practice.",
        ],
        practice: practiceQuestion(
          "Why is it a design mistake to judge a coaster only by maximum speed?",
          [
            "A. Speed is unrelated to physics.",
            "B. A safe design also has to manage forces, energy loss, braking, and smooth transitions.",
            "C. Faster trains always have smaller g-forces.",
            "D. Maximum speed guarantees every later hill is reachable.",
          ],
          1,
          "Correct. A good design balances speed with force limits, energy budget, braking, and rider comfort.",
          "Not quite. Speed matters, but it is only one constraint. A realistic coaster also has to control forces, losses, transitions, and stopping.",
        ),
      },
    ),
    createStep("practice", "Practice", "Multiple Choice Practice", {
      body: [
        "This first question checks whether you are treating energy loss realistically instead of drawing a ride that would stall or require impossible behavior later on.",
      ],
      practice: practiceQuestion(
        "Why is it usually a design mistake to make a later hill taller than the first hill on a traditional non-launched coaster?",
        [
          "A. The second hill receives less sunlight.",
          "B. The train has already lost some mechanical energy to friction and drag.",
          "C. The normal force disappears after the first drop.",
          "D. The mass of the train must be smaller on later hills.",
        ],
        1,
        "Correct. After the first drop, the train has already lost some mechanical energy, so a later hill that is too tall may be physically unreachable.",
        "Not quite. The key problem is the energy budget. Friction and drag reduce the mechanical energy available after the first hill.",
      ),
    }),
    createStep("quiz", "Answer Explanations", "More Multiple Choice and Explanations", {
      body: [
        "These seven questions focus on design judgments about banking, force limits, energy budgeting, and rider comfort.",
      ],
      quiz: [
        quizQuestion(
          "Why are banked turns important on a real coaster?",
          [
            "A. They remove the need for gravity entirely.",
            "B. They help redirect the normal force and reduce uncomfortable lateral force.",
            "C. They make the train's mass smaller in the turn.",
            "D. They guarantee the speed is constant.",
          ],
          1,
          "Correct. Banking lets the normal force help provide the needed inward acceleration, which reduces reliance on sideways friction and improves rider comfort.",
          "Not quite. The point of banking is to redirect the support force so that the turn feels smoother and safer.",
        ),
        quizQuestion(
          "If a braking section increases the stopping time for the same arriving train speed, what happens to the average force on riders?",
          [
            "A. It increases.",
            "B. It stays exactly the same.",
            "C. It decreases.",
            "D. It becomes impossible to determine.",
          ],
          2,
          "Correct. For the same momentum change, a longer stopping time means a smaller average force.",
          "Not quite. Use the impulse idea: the same change in momentum spread over more time reduces the average force.",
        ),
        quizQuestion(
          "Why are clothoid loops safer than simple circular loops?",
          [
            "A. Their changing radius helps control g-forces through the loop.",
            "B. They remove the need for centripetal acceleration.",
            "C. They make the train mass smaller at the top.",
            "D. They prevent gravity from acting inside the loop.",
          ],
          0,
          "Correct. A clothoid loop changes radius from place to place, which helps manage the forces riders feel instead of keeping the same tight curvature everywhere.",
          "Not quite. The key safety advantage is the changing radius, which helps control g-forces around the loop.",
        ),
        quizQuestion(
          "If friction and drag losses increase on a coaster design, what is the safest response for later non-launched hills?",
          [
            "A. Make the later hills taller",
            "B. Keep the same hill heights and ignore the losses",
            "C. Lower later hills or add more energy earlier in the ride",
            "D. Remove all banking from the turns",
          ],
          2,
          "Correct. If more mechanical energy is lost, later elements must demand less energy or the ride must receive more energy earlier.",
          "Not quite. A coaster with larger losses needs a safer energy budget, which usually means lower later hills or additional energy input earlier.",
        ),
        quizQuestion(
          "A high-speed turn with too small a radius most directly risks what?",
          [
            "A. Lower kinetic energy than expected",
            "B. Excessive g-forces on riders",
            "C. Zero normal force everywhere on the train",
            "D. Perfect mechanical-energy conservation",
          ],
          1,
          "Correct. A small radius at high speed requires a large inward acceleration, which can create excessive forces on riders.",
          "Not quite. Tight turns at high speed require large centripetal acceleration, which is why they can create unsafe or uncomfortable g-forces.",
        ),
        quizQuestion(
          "A transition changes a rider's acceleration from 2.0 m/s² to 8.0 m/s² in 3.0 s. What is the average jerk?",
          [
            "A. 2.0 m/s³",
            "B. 3.0 m/s³",
            "C. 6.0 m/s³",
            "D. 10 m/s³",
          ],
          0,
          "Correct. Jerk is change in acceleration divided by time: j = Δa/Δt = (8.0 - 2.0)/3.0 = 2.0 m/s³.",
          "Not quite. Use j = Δa/Δt. The acceleration changes by 6.0 m/s² over 3.0 s, so the average jerk is 2.0 m/s³.",
        ),
        quizQuestion(
          "A brake run removes 60,000 J of kinetic energy over 30 m. What average braking force magnitude does this represent?",
          [
            "A. 500 N",
            "B. 1000 N",
            "C. 2000 N",
            "D. 30,000 N",
          ],
          2,
          "Correct. Work magnitude is force times distance, so F = W/d = 60,000/30 = 2000 N.",
          "Not quite. Brakes remove energy by doing negative work. The force magnitude is |W|/d = 60,000/30 = 2000 N.",
        ),
      ],
    }),
    createStep(
      "next-lesson",
      "Next Lesson",
      "Connection to the Next Lesson",
      {
        body: [
          "This final lesson closes the sequence by showing that roller coasters are not a collection of disconnected formulas. They are a full mechanics system.",
          "When students can move fluidly between motion, forces, energy, circular motion, work, momentum, rotation, and safety reasoning, they are thinking about coasters the way an engineer or physicist does.",
        ],
      },
    ),
  ],
);

const finalQuizLesson = createLesson(
  "Full Course Review",
  "50-Question Final Mechanics Quiz",
  "Students review the full roller coaster physics course with new calculation values and mixed conceptual questions across every unit.",
  [
    createStep("quiz", "Final Quiz", "Full Course Review: 50 Questions", {
      body: [
        "This final quiz mixes concepts and calculations from the full course: kinematics, projectile motion, Newton's laws, energy, circular motion, work, momentum, rotation, and coaster safety design.",
      ],
      quiz: [
        quizQuestion(
          "A coaster moving at 3.0 m/s accelerates uniformly at 2.0 m/s² for 5.0 s. What is its final velocity?",
          [
            "A. 7.0 m/s",
            "B. 10 m/s",
            "C. 13 m/s",
            "D. 15 m/s",
          ],
          2,
          "Correct. Use v = v0 + at = 3.0 + (2.0)(5.0) = 13 m/s.",
          "Not quite. Add the change in velocity to the starting velocity: v = 3.0 + (2.0)(5.0) = 13 m/s.",
        ),
        quizQuestion(
          "A train starts from rest and accelerates at 1.8 m/s² for 10 s. How far does it travel?",
          [
            "A. 18 m",
            "B. 45 m",
            "C. 90 m",
            "D. 180 m",
          ],
          2,
          "Correct. From rest, Δx = one-half at² = 0.5(1.8)(10²) = 90 m.",
          "Not quite. Because the train starts from rest, use Δx = one-half at² = 90 m.",
        ),
        quizQuestion(
          "A coaster's velocity changes from 5.0 m/s to 17 m/s in 4.0 s. What is its average acceleration?",
          [
            "A. 2.0 m/s²",
            "B. 3.0 m/s²",
            "C. 4.0 m/s²",
            "D. 12 m/s²",
          ],
          1,
          "Correct. Average acceleration is Δv/Δt = (17 - 5.0)/4.0 = 3.0 m/s².",
          "Not quite. Find the velocity change first: 12 m/s over 4.0 s gives 3.0 m/s².",
        ),
        quizQuestion(
          "In an ideal projectile model, a rider moves forward at 24 m/s for 0.75 s. How far forward does the rider move?",
          [
            "A. 12 m",
            "B. 16 m",
            "C. 18 m",
            "D. 24 m",
          ],
          2,
          "Correct. Horizontal velocity is constant, so x = vxt = (24)(0.75) = 18 m.",
          "Not quite. Use horizontal motion only here: x = vxt = (24)(0.75) = 18 m.",
        ),
        quizQuestion(
          "A rider has zero initial vertical velocity in an idealized airtime model. About how far downward does gravity pull the rider in 0.60 s?",
          [
            "A. 0.60 m",
            "B. 1.8 m",
            "C. 3.5 m",
            "D. 5.9 m",
          ],
          1,
          "Correct. Vertical drop is Δy = one-half gt² = 0.5(9.8)(0.60²) ≈ 1.8 m.",
          "Not quite. The vertical motion uses gravity: Δy = 0.5(9.8)(0.60²), which is about 1.8 m.",
        ),
        quizQuestion(
          "A coaster keeps the same speed while moving through a curved turn. Which statement best describes its motion?",
          [
            "A. It has no acceleration because the speed is constant.",
            "B. Its acceleration points outward from the curve.",
            "C. Its velocity changes because direction changes.",
            "D. Its displacement must equal the full track length.",
          ],
          2,
          "Correct. Velocity includes direction, so changing direction means the velocity is changing even if speed is constant.",
          "Not quite. Constant speed does not mean constant velocity when the path curves.",
        ),
        quizQuestion(
          "A coaster covers 96 m in 8.0 s at constant velocity. What is its velocity magnitude?",
          [
            "A. 8.0 m/s",
            "B. 10 m/s",
            "C. 12 m/s",
            "D. 16 m/s",
          ],
          2,
          "Correct. Use v = Δx/t = 96/8.0 = 12 m/s.",
          "Not quite. Divide displacement by time: 96 m over 8.0 s is 12 m/s.",
        ),
        quizQuestion(
          "What is the weight of a 72 kg rider?",
          [
            "A. 72 N",
            "B. 353 N",
            "C. 706 N",
            "D. 7200 N",
          ],
          2,
          "Correct. Weight is mg = (72)(9.8) ≈ 706 N.",
          "Not quite. Mass is measured in kilograms, but weight is a force: mg ≈ 706 N.",
        ),
        quizQuestion(
          "A 900 kg coaster car has a net force of 3600 N. What is its acceleration?",
          [
            "A. 2.0 m/s²",
            "B. 4.0 m/s²",
            "C. 6.0 m/s²",
            "D. 9.0 m/s²",
          ],
          1,
          "Correct. Newton's Second Law gives a = Fnet/m = 3600/900 = 4.0 m/s².",
          "Not quite. Use a = Fnet/m. The acceleration is 4.0 m/s².",
        ),
        quizQuestion(
          "A 400 kg coaster car is on a 37° frictionless incline. Using sin 37° ≈ 0.60, what is the component of gravity parallel to the track?",
          [
            "A. 400 N",
            "B. 1600 N",
            "C. 2400 N",
            "D. 3920 N",
          ],
          2,
          "Correct. The parallel component is mg sinθ = (400)(9.8)(0.60) ≈ 2400 N.",
          "Not quite. The along-track component is mg sinθ, not the full weight.",
        ),
        quizQuestion(
          "A 55 kg rider is at rest on a flat, level section of track. What normal force does the seat exert on the rider?",
          [
            "A. 55 N",
            "B. 539 N",
            "C. 980 N",
            "D. 5390 N",
          ],
          1,
          "Correct. On a level track at rest, N = mg = (55)(9.8) ≈ 539 N.",
          "Not quite. With no vertical acceleration, the normal force balances the rider's weight.",
        ),
        quizQuestion(
          "A 750 kg train segment has 3000 N down the track and 450 N of friction up the track. What is its acceleration down the track?",
          [
            "A. 2.6 m/s²",
            "B. 3.4 m/s²",
            "C. 4.0 m/s²",
            "D. 4.6 m/s²",
          ],
          1,
          "Correct. The net force is 3000 - 450 = 2550 N, so a = 2550/750 = 3.4 m/s².",
          "Not quite. First subtract friction to get the net force, then divide by mass.",
        ),
        quizQuestion(
          "A 70 kg rider feels 2.5 g at the bottom of a valley. About how large is the seat's normal force?",
          [
            "A. 690 N",
            "B. 980 N",
            "C. 1700 N",
            "D. 2500 N",
          ],
          2,
          "Correct. Felt g-force is N/(mg), so N = 2.5mg = 2.5(70)(9.8) ≈ 1700 N.",
          "Not quite. A 2.5 g feeling means the normal force is 2.5 times the rider's weight.",
        ),
        quizQuestion(
          "If the seat pushes upward on a rider, what is the matching Newton's Third Law force?",
          [
            "A. Gravity pulling the rider downward",
            "B. The rider pushing downward on the seat",
            "C. The track pushing sideways on the train",
            "D. Air resistance pushing backward on the rider",
          ],
          1,
          "Correct. The action-reaction pair is the seat pushing on the rider and the rider pushing back on the seat.",
          "Not quite. Third-law pairs act on different objects and have equal size in opposite directions.",
        ),
        quizQuestion(
          "Ignoring friction, a coaster starts from rest 25 m above the bottom of a drop. About how fast is it moving at the bottom?",
          [
            "A. 14 m/s",
            "B. 22 m/s",
            "C. 25 m/s",
            "D. 49 m/s",
          ],
          1,
          "Correct. Use v = √(2gh) = √((2)(9.8)(25)) ≈ 22 m/s.",
          "Not quite. Convert height to speed with v = √(2gh), which gives about 22 m/s.",
        ),
        quizQuestion(
          "A coaster moving at 18 m/s climbs until it momentarily stops. Ignoring friction, about how much height can it gain?",
          [
            "A. 9.2 m",
            "B. 16.5 m",
            "C. 18 m",
            "D. 33 m",
          ],
          1,
          "Correct. Set kinetic energy equal to gravitational potential energy: h = v²/(2g) = 18²/(19.6) ≈ 16.5 m.",
          "Not quite. Use h = v²/(2g). With 18 m/s, the height is about 16.5 m.",
        ),
        quizQuestion(
          "A 750 kg coaster train moves at 12 m/s. What is its kinetic energy?",
          [
            "A. 9000 J",
            "B. 45,000 J",
            "C. 54,000 J",
            "D. 108,000 J",
          ],
          2,
          "Correct. K = one-half mv² = 0.5(750)(12²) = 54,000 J.",
          "Not quite. Kinetic energy depends on speed squared: K = 54,000 J.",
        ),
        quizQuestion(
          "A 500 kg train segment is 20 m above the reference level. What is its gravitational potential energy?",
          [
            "A. 9800 J",
            "B. 49,000 J",
            "C. 98,000 J",
            "D. 500,000 J",
          ],
          2,
          "Correct. Ug = mgh = (500)(9.8)(20) = 98,000 J.",
          "Not quite. Use gravitational potential energy: mgh = 98,000 J.",
        ),
        quizQuestion(
          "At one point, a coaster has 300,000 J of mechanical energy and 120,000 J of gravitational potential energy. What is its kinetic energy?",
          [
            "A. 120,000 J",
            "B. 180,000 J",
            "C. 300,000 J",
            "D. 420,000 J",
          ],
          1,
          "Correct. Mechanical energy is K + Ug, so K = 300,000 - 120,000 = 180,000 J.",
          "Not quite. Subtract potential energy from total mechanical energy.",
        ),
        quizQuestion(
          "If a coaster's speed triples, how does its kinetic energy change?",
          [
            "A. It triples.",
            "B. It becomes six times larger.",
            "C. It becomes nine times larger.",
            "D. It stays the same.",
          ],
          2,
          "Correct. Kinetic energy is proportional to v², so tripling speed multiplies kinetic energy by 9.",
          "Not quite. Because speed is squared in kinetic energy, 3² = 9.",
        ),
        quizQuestion(
          "A coaster has 210,000 J of mechanical energy before losing 15,000 J to friction and drag. How much mechanical energy remains?",
          [
            "A. 15,000 J",
            "B. 195,000 J",
            "C. 210,000 J",
            "D. 225,000 J",
          ],
          1,
          "Correct. Mechanical energy remaining is 210,000 - 15,000 = 195,000 J.",
          "Not quite. Friction and drag remove mechanical energy from the useful ride budget.",
        ),
        quizQuestion(
          "A coaster travels at 18 m/s through a curve with radius 54 m. What is its centripetal acceleration?",
          [
            "A. 3.0 m/s²",
            "B. 6.0 m/s²",
            "C. 18 m/s²",
            "D. 54 m/s²",
          ],
          1,
          "Correct. ac = v²/r = 18²/54 = 324/54 = 6.0 m/s².",
          "Not quite. Use ac = v²/r. The result is 6.0 m/s².",
        ),
        quizQuestion(
          "A coaster moving at 24 m/s needs a centripetal acceleration of 8.0 m/s². What curve radius is required?",
          [
            "A. 24 m",
            "B. 48 m",
            "C. 72 m",
            "D. 192 m",
          ],
          2,
          "Correct. Rearrange ac = v²/r to r = v²/ac = 24²/8.0 = 72 m.",
          "Not quite. Solve for radius: r = v²/ac.",
        ),
        quizQuestion(
          "A 60 kg rider passes through the bottom of a dip at 16 m/s on a 32 m radius curve. What normal force does the seat exert?",
          [
            "A. 480 N",
            "B. 590 N",
            "C. 1070 N",
            "D. 1540 N",
          ],
          2,
          "Correct. At the bottom, N = mg + mv²/r = 588 + 480 ≈ 1070 N.",
          "Not quite. The seat must support weight and provide the inward force at the bottom of the dip.",
        ),
        quizQuestion(
          "A 70 kg rider passes over a hill crest at 14 m/s on a 49 m radius curve. What normal force does the seat exert?",
          [
            "A. 280 N",
            "B. 410 N",
            "C. 690 N",
            "D. 970 N",
          ],
          1,
          "Correct. At the top, N = mg - mv²/r = 686 - 280 ≈ 410 N.",
          "Not quite. Gravity helps provide the inward force at the top, so the normal force is less than weight.",
        ),
        quizQuestion(
          "What is the minimum speed at the top of a loop with radius 36 m if gravity alone provides the needed inward force?",
          [
            "A. 12 m/s",
            "B. 19 m/s",
            "C. 36 m/s",
            "D. 59 m/s",
          ],
          1,
          "Correct. The limiting speed is v = √(gr) = √((9.8)(36)) ≈ 19 m/s.",
          "Not quite. Use the top-of-loop limiting condition v = √(gr).",
        ),
        quizQuestion(
          "At the very top of a vertical loop, which way is inward?",
          [
            "A. Upward",
            "B. Downward",
            "C. Forward along the track only",
            "D. Outward from the loop",
          ],
          1,
          "Correct. At the top of the loop, the center is below the rider, so inward is downward.",
          "Not quite. Always locate the center of curvature first. At the top of a loop, it is below the train.",
        ),
        quizQuestion(
          "If curve radius doubles while speed stays the same, what happens to centripetal acceleration?",
          [
            "A. It is cut in half.",
            "B. It stays the same.",
            "C. It doubles.",
            "D. It quadruples.",
          ],
          0,
          "Correct. Since ac = v²/r, doubling r cuts ac in half when speed is unchanged.",
          "Not quite. Radius is in the denominator of ac = v²/r.",
        ),
        quizQuestion(
          "A 650 N launch force acts over 12 m in the same direction as motion. How much work is done?",
          [
            "A. 650 J",
            "B. 3900 J",
            "C. 7800 J",
            "D. 12,000 J",
          ],
          2,
          "Correct. Work is W = Fd = (650)(12) = 7800 J.",
          "Not quite. Because force and displacement point the same way, W = Fd.",
        ),
        quizQuestion(
          "An 800 N force acts at 60° to the direction of motion over 5.0 m. How much work does it do?",
          [
            "A. 2000 J",
            "B. 4000 J",
            "C. 6900 J",
            "D. 8000 J",
          ],
          0,
          "Correct. W = Fd cosθ = (800)(5.0)cos60° = 2000 J.",
          "Not quite. Only the force component along the displacement does work.",
        ),
        quizQuestion(
          "A 350 N friction force acts opposite a coaster's motion for 18 m. What work does friction do?",
          [
            "A. -6300 J",
            "B. -350 J",
            "C. 350 J",
            "D. 6300 J",
          ],
          0,
          "Correct. Friction points opposite motion, so W = -(350)(18) = -6300 J.",
          "Not quite. Friction does negative work when it opposes the motion.",
        ),
        quizQuestion(
          "A lift system does 45,000 J of work in 15 s. What is its average power?",
          [
            "A. 300 W",
            "B. 3000 W",
            "C. 30,000 W",
            "D. 675,000 W",
          ],
          1,
          "Correct. Power is work divided by time: P = 45,000/15 = 3000 W.",
          "Not quite. Average power measures how quickly work is done.",
        ),
        quizQuestion(
          "A brake run removes 70,000 J from a coaster that initially has 220,000 J of kinetic energy. How much kinetic energy remains?",
          [
            "A. 70,000 J",
            "B. 150,000 J",
            "C. 220,000 J",
            "D. 290,000 J",
          ],
          1,
          "Correct. The remaining kinetic energy is 220,000 - 70,000 = 150,000 J.",
          "Not quite. Negative work from brakes reduces the kinetic energy.",
        ),
        quizQuestion(
          "A launch system pushes with 2500 N while the train moves at 18 m/s. What instantaneous power is delivered?",
          [
            "A. 20,500 W",
            "B. 25,000 W",
            "C. 45,000 W",
            "D. 180,000 W",
          ],
          2,
          "Correct. Instantaneous power from force and speed is P = Fv = (2500)(18) = 45,000 W.",
          "Not quite. Use P = Fv when force acts along the motion.",
        ),
        quizQuestion(
          "A 650 kg coaster car moves at 16 m/s east. What is its momentum?",
          [
            "A. 650 kg·m/s east",
            "B. 4160 kg·m/s east",
            "C. 10,400 kg·m/s east",
            "D. 16,000 kg·m/s east",
          ],
          2,
          "Correct. Momentum is p = mv = (650)(16) = 10,400 kg·m/s east.",
          "Not quite. Momentum equals mass times velocity, including direction.",
        ),
        quizQuestion(
          "A 900 kg coaster car speeds up from 6.0 m/s to 22 m/s. What impulse does the launch deliver?",
          [
            "A. 5400 N·s",
            "B. 14,400 N·s",
            "C. 19,800 N·s",
            "D. 25,200 N·s",
          ],
          1,
          "Correct. J = Δp = mΔv = 900(22 - 6.0) = 14,400 N·s.",
          "Not quite. Impulse equals change in momentum, not final momentum alone.",
        ),
        quizQuestion(
          "An 800 kg car moving at 20 m/s is stopped in 5.0 s. What is the magnitude of the average braking force?",
          [
            "A. 800 N",
            "B. 1600 N",
            "C. 3200 N",
            "D. 16,000 N",
          ],
          2,
          "Correct. The momentum change magnitude is 800(20) = 16,000 kg·m/s, and 16,000/5.0 = 3200 N.",
          "Not quite. Average force is momentum change divided by stopping time.",
        ),
        quizQuestion(
          "Brakes apply a 4200 N average force opposite the motion for 3.5 s. What impulse magnitude do they deliver?",
          [
            "A. 1200 N·s",
            "B. 4200 N·s",
            "C. 14,700 N·s",
            "D. 42,000 N·s",
          ],
          2,
          "Correct. Impulse magnitude is J = FΔt = (4200)(3.5) = 14,700 N·s.",
          "Not quite. Multiply average force by the time interval.",
        ),
        quizQuestion(
          "A 600 kg coaster car moving at 12 m/s couples with an identical car at rest. If outside impulse is negligible, what is their shared speed afterward?",
          [
            "A. 3.0 m/s",
            "B. 6.0 m/s",
            "C. 9.0 m/s",
            "D. 12 m/s",
          ],
          1,
          "Correct. Momentum conservation gives (600)(12) = (1200)v, so v = 6.0 m/s.",
          "Not quite. The moving car's momentum is shared by twice the mass after coupling.",
        ),
        quizQuestion(
          "A coaster car moving west comes to rest. What direction is its change in momentum?",
          [
            "A. West",
            "B. East",
            "C. Upward",
            "D. Zero direction because it stops",
          ],
          1,
          "Correct. Δp = pf - pi. Ending at rest means the change points opposite the original westward momentum, so it points east.",
          "Not quite. A stop requires a momentum change opposite the original motion.",
        ),
        quizQuestion(
          "A coaster wheel with radius 0.25 m rotates at 44 rad/s. What is the rim's linear speed?",
          [
            "A. 5.5 m/s",
            "B. 11 m/s",
            "C. 22 m/s",
            "D. 44 m/s",
          ],
          1,
          "Correct. Use v = rω = (0.25)(44) = 11 m/s.",
          "Not quite. Multiply angular speed by radius to connect rotation to linear speed.",
        ),
        quizQuestion(
          "A 60 N force is applied perpendicularly 0.35 m from an axle. What torque is produced?",
          [
            "A. 17 N·m",
            "B. 21 N·m",
            "C. 60 N·m",
            "D. 171 N·m",
          ],
          1,
          "Correct. For a perpendicular force, τ = rF = (0.35)(60) = 21 N·m.",
          "Not quite. Perpendicular means sinθ = 1, so torque is rF.",
        ),
        quizQuestion(
          "A wheel has rotational inertia 6.0 kg·m² and net torque 18 N·m. What is its angular acceleration?",
          [
            "A. 0.33 rad/s²",
            "B. 3.0 rad/s²",
            "C. 12 rad/s²",
            "D. 108 rad/s²",
          ],
          1,
          "Correct. τnet = Iα, so α = τnet/I = 18/6.0 = 3.0 rad/s².",
          "Not quite. Net torque changes angular motion according to τnet = Iα.",
        ),
        quizQuestion(
          "A rotating wheel has I = 2.5 kg·m² and angular speed 8.0 rad/s. What is its rotational kinetic energy?",
          [
            "A. 20 J",
            "B. 40 J",
            "C. 80 J",
            "D. 160 J",
          ],
          2,
          "Correct. Krot = one-half Iω² = 0.5(2.5)(8.0²) = 80 J.",
          "Not quite. Use the rotational energy equation and square the angular speed.",
        ),
        quizQuestion(
          "Two wheels have the same mass and radius, but one has more mass concentrated near the rim. What is true about that wheel?",
          [
            "A. It has larger rotational inertia.",
            "B. It has no rotational kinetic energy.",
            "C. It is easier to spin up.",
            "D. It cannot exert torque.",
          ],
          0,
          "Correct. Mass farther from the axis increases rotational inertia, making changes in spin harder.",
          "Not quite. Rotational inertia depends on mass distribution, not just total mass.",
        ),
        quizQuestion(
          "A transition changes rider acceleration from 3.0 m/s² to 9.0 m/s² in 2.0 s. What is the average jerk?",
          [
            "A. 2.0 m/s³",
            "B. 3.0 m/s³",
            "C. 6.0 m/s³",
            "D. 12 m/s³",
          ],
          1,
          "Correct. Jerk is Δa/Δt = (9.0 - 3.0)/2.0 = 3.0 m/s³.",
          "Not quite. Divide the acceleration change by the time interval.",
        ),
        quizQuestion(
          "A brake run removes 96,000 J of kinetic energy over 40 m. What average braking force magnitude does that represent?",
          [
            "A. 1200 N",
            "B. 2400 N",
            "C. 4800 N",
            "D. 96,000 N",
          ],
          1,
          "Correct. Work magnitude is force times distance, so F = 96,000/40 = 2400 N.",
          "Not quite. Braking work removes energy over distance. Divide energy removed by distance.",
        ),
        quizQuestion(
          "Why do engineers bank high-speed coaster turns?",
          [
            "A. To make gravity disappear",
            "B. To redirect the normal force so the turn feels smoother",
            "C. To make the train's mass smaller",
            "D. To guarantee zero friction everywhere",
          ],
          1,
          "Correct. Banking lets the normal force help provide inward acceleration, reducing uncomfortable sideways force.",
          "Not quite. Banking is about directing forces more comfortably through the turn.",
        ),
        quizQuestion(
          "A design has later non-launched hills almost as tall as the first hill even though the ride has large friction and drag losses. What is the main concern?",
          [
            "A. The train may not have enough mechanical energy to clear those hills.",
            "B. The train's mass will become zero.",
            "C. Gravity will stop acting after the first drop.",
            "D. The wheels will stop rotating because torque is impossible.",
          ],
          0,
          "Correct. Energy losses reduce the usable mechanical energy available for later hills.",
          "Not quite. Later hills have to fit the remaining energy budget after losses.",
        ),
        quizQuestion(
          "Why is a tight high-speed turn a rider-comfort concern?",
          [
            "A. It always removes all kinetic energy.",
            "B. It requires large centripetal acceleration and can create excessive g-forces.",
            "C. It makes impulse equal zero.",
            "D. It prevents the track from exerting normal force.",
          ],
          1,
          "Correct. Large speed and small radius make v²/r large, which can create uncomfortable or unsafe forces.",
          "Not quite. The key issue is the large inward acceleration required by a tight fast turn.",
        ),
      ],
    }),
  ],
);

const lessonMap = {
  kinematics: kinematicsLesson,
  forces: forcesLesson,
  energy: energyLesson,
  "circular-motion": circularMotionLesson,
  work: workLesson,
  momentum: momentumLesson,
  rotation: rotationLesson,
  "design-safety": designSafetyLesson,
  "final-quiz": finalQuizLesson,
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
  hasNextLesson,
  onNextLesson,
}) => {
  const step = lesson.steps[stepIndex];
  const lessonHeading = lesson.chapterName ?? getChapterName(lesson.title);
  const isQuizStep = step.id === "quiz";
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === lesson.steps.length - 1;
  const isTerminalQuizStep = isQuizStep && isLastStep;
  const [tocOpen, setTocOpen] = useState(true);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [selectedPracticeChoice, setSelectedPracticeChoice] = useState(null);
  const [practiceChecked, setPracticeChecked] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedQuizChoice, setSelectedQuizChoice] = useState(null);
  const [quizChecked, setQuizChecked] = useState(false);

  const practiceQuestions = step.practice?.questions ?? (step.practice ? [step.practice] : []);
  const currentPracticeProblem = practiceQuestions[practiceIndex] ?? null;
  const practiceIsCorrect =
    currentPracticeProblem &&
    selectedPracticeChoice === currentPracticeProblem.correctChoice;
  const practiceComplete =
    practiceQuestions.length > 0 &&
    practiceIndex === practiceQuestions.length - 1 &&
    practiceChecked;
  const currentQuizQuestion = step.quiz?.[quizIndex] ?? null;
  const quizIsCorrect =
    currentQuizQuestion && selectedQuizChoice === currentQuizQuestion.correctChoice;
  const quizComplete =
    step.id === "quiz" && quizIndex === step.quiz.length - 1 && quizChecked;
  const nextButtonDisabled = isTerminalQuizStep
    ? !quizComplete
    : (practiceQuestions.length > 0 && !practiceComplete) ||
      (step.id === "quiz" && !quizComplete) ||
      isLastStep;
  const nextButtonLabel = isTerminalQuizStep
    ? hasNextLesson
      ? "Next Unit"
      : "Finish Course"
    : "Next";

  useEffect(() => {
    setPracticeIndex(0);
    setSelectedPracticeChoice(null);
    setPracticeChecked(false);
  }, [step.id]);

  useEffect(() => {
    setSelectedPracticeChoice(null);
    setPracticeChecked(false);
  }, [practiceIndex]);

  useEffect(() => {
    if (step.id !== "quiz") {
      return;
    }

    setQuizIndex(0);
    setSelectedQuizChoice(null);
    setQuizChecked(false);
  }, [step.id]);

  useEffect(() => {
    setSelectedQuizChoice(null);
    setQuizChecked(false);
  }, [quizIndex]);

  const handlePracticeCheck = () => {
    if (!currentPracticeProblem) {
      return;
    }

    if (!practiceChecked) {
      setPracticeChecked(true);
      return;
    }

    if (practiceIndex < practiceQuestions.length - 1) {
      setPracticeIndex((current) => current + 1);
    }
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

  const equationTextClass = `font-body font-medium tracking-normal ${titleClass}`;
  const realWorldEquationClass = `mt-2 overflow-x-auto pb-1 ${equationTextClass} text-xl leading-relaxed`;
  const renderRealWorldEquation = (equationContent) =>
    typeof equationContent === "string" ? (
      <FormattedPhysicsText
        as="div"
        className={realWorldEquationClass}
        text={equationContent}
      />
    ) : (
      <div className={realWorldEquationClass}>{equationContent}</div>
    );

  const realWorldDividerClass = `my-8 h-px w-full ${isDark ? "bg-white/10" : "bg-slate-300/70"}`;
  const renderRealWorldExample = (example) => (
    <>
      <div className={realWorldDividerClass} />
      <div className={`rounded-[2rem] border p-5 sm:p-6 ${subtlePanelClass}`}>
        <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentLabelClass}`}>
          {example.eyebrow}
        </p>
        <h4 className={`mt-3 text-2xl font-semibold ${titleClass}`}>
          {example.title}
        </h4>

        {example.goal ? (
          <div className={`mt-4 rounded-[1.25rem] border px-4 py-3 text-sm leading-6 ${subtlePanelClass}`}>
            <FormattedPhysicsText
              as="p"
              className={copyClass}
              text={example.goal}
            />
          </div>
        ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        <div className="lg:max-h-[34rem] lg:overflow-y-auto lg:pr-1">
          <img
            src={example.imageSrc}
            alt={example.imageAlt}
            className={`block h-auto w-full rounded-[1.5rem] border ${
              isDark ? "border-white/10" : "border-slate-300/70"
            }`}
          />

          {example.stats?.length ? (
            <div className={`mt-3 rounded-[1.5rem] border p-3 text-sm leading-5 ${subtlePanelClass}`}>
              {example.stats.map((item) => (
                <p key={item.label} className={copyClass}>
                  <span className={`font-semibold ${titleClass}`}>
                    {item.label}:
                  </span>{" "}
                  {item.value}
                </p>
              ))}
            </div>
          ) : null}
        </div>

        <div className="min-h-0">
          <div className={`space-y-4 text-base leading-7 ${copyClass} lg:max-h-[34rem] lg:overflow-y-auto lg:pr-3`}>
            {example.rightFigure ? (
              <div className={`rounded-[1.5rem] border p-4 ${subtlePanelClass}`}>
                <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentLabelClass}`}>
                  {example.rightFigure.title}
                </p>
                {example.rightFigure.description ? (
                  <FormattedPhysicsText
                    as="p"
                    className={`mt-2 text-sm leading-6 ${copyClass}`}
                    text={example.rightFigure.description}
                  />
                ) : null}
                <div className="mt-4">{example.rightFigure.render(isDark)}</div>
              </div>
            ) : null}

            {example.paragraphs?.length ? (
              <div className={example.rightFigure ? "space-y-4" : "space-y-4"}>
                {example.paragraphs.map((paragraph) => (
                  <FormattedPhysicsText key={paragraph} as="p" text={paragraph} />
                ))}
              </div>
            ) : null}

            {example.calculationSteps?.length ? (
              <div className={`rounded-[1.5rem] border p-4 ${subtlePanelClass}`}>
                <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentLabelClass}`}>
                  Calculation Steps
                </p>
                <div className="mt-4 grid gap-3">
                  {example.calculationSteps.map((item) => (
                    <div key={item.label} className={`rounded-2xl border p-4 ${subtlePanelClass}`}>
                      <p className={`text-sm font-semibold ${titleClass}`}>{item.label}</p>
                      {renderRealWorldEquation(item.equation)}
                      {item.note ? (
                        <FormattedPhysicsText
                          as="p"
                          className={`mt-2 text-sm leading-6 ${copyClass}`}
                          text={item.note}
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {example.afterParagraphs?.length ? (
              <div className="space-y-4">
                {example.afterParagraphs.map((paragraph) => (
                  <FormattedPhysicsText key={paragraph} as="p" text={paragraph} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      </div>
      <div className={realWorldDividerClass} />
    </>
  );

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
        className="mt-8 grid items-start gap-4 lg:[grid-template-columns:var(--lesson-columns)] lg:[transition:grid-template-columns_280ms_ease]"
        style={{
          "--lesson-columns": tocOpen
            ? "22rem minmax(0,1fr)"
            : "5.25rem minmax(0,1fr)",
        }}
      >
        <aside className={`${panelClass} lg:sticky lg:top-8 lg:self-start p-4 sm:p-5`}>
          <div className={`flex ${tocOpen ? "items-start justify-between gap-4" : "flex-col items-center gap-4"}`}>
            <div
              className={`transition-all duration-300 ease-out ${
                tocOpen
                  ? "max-h-[20rem] overflow-visible opacity-100"
                  : "max-h-0 overflow-hidden opacity-0 pointer-events-none"
              }`}
            >
              <h2 className={`font-display text-3xl font-semibold ${titleClass}`}>
                {lessonHeading}
              </h2>
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

          <div
            className={`transition-all duration-300 ease-out ${
              tocOpen
                ? "mt-8 opacity-100"
                : "mt-0 max-h-0 overflow-hidden opacity-0 pointer-events-none"
            }`}
          >
            <div className="grid gap-3">
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
                      <div className="min-w-0">
                        <p className={`text-sm font-semibold break-words ${titleClass}`}>{item.label}</p>
                        <p className={`text-sm break-words ${mutedClass}`}>{item.title}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className={`transition-all duration-300 ease-out ${
              tocOpen
                ? "max-h-0 overflow-hidden opacity-0 pointer-events-none"
                : "mt-2 opacity-100"
            }`}
          >
            <div className="flex flex-col items-center gap-3 py-0.5">
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
          </div>
        </aside>

        <article className={`${panelClass} p-7 sm:p-8`}>
          {!isQuizStep ? (
            <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${accentLabelClass}`}>
              {step.label}
            </p>
          ) : null}
          <h3 className={`${isQuizStep ? "" : "mt-4"} font-display text-3xl font-semibold ${titleClass}`}>
            {step.title}
          </h3>

          {step.body ? (
            <div className={`mt-6 space-y-4 text-lg leading-8 ${copyClass}`}>
              {step.body.map((paragraph) => (
                <FormattedPhysicsText key={paragraph} as="p" text={paragraph} />
              ))}
            </div>
          ) : null}

          {step.derivations ? (
            <div className="mt-6 grid gap-5">
              {step.derivations.map((item) => (
                <div key={item.title} className={`rounded-[1.9rem] border p-5 sm:p-6 ${subtlePanelClass}`}>
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:items-center">
                    <div className={`rounded-[1.6rem] border p-4 ${subtlePanelClass}`}>
                      {item.render(isDark)}
                    </div>

                    <div>
                      <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentLabelClass}`}>
                        {item.title}
                      </p>
                      <div
                        className={`mt-4 overflow-x-auto pb-3 ${equationTextClass} text-[1.85rem] leading-[1.45] sm:text-[2.2rem]`}
                      >
                        {item.equation}
                      </div>

                      <div className={`mt-4 space-y-3 text-base leading-7 ${copyClass}`}>
                        {item.paragraphs.map((paragraph) => (
                          <FormattedPhysicsText key={paragraph} as="p" text={paragraph} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {step.realWorldExample &&
          !["afterFigures", "bottom"].includes(step.realWorldExample.position)
            ? renderRealWorldExample(step.realWorldExample)
            : null}

          {step.bullets ? (
            <ul className={`mt-6 space-y-3 text-base leading-7 ${isDark ? "text-slate-200" : "text-slate-700"}`}>
              {step.bullets.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className={`mt-2 h-2 w-2 rounded-full ${listDotClass}`} />
                  <FormattedPhysicsText text={item} />
                </li>
              ))}
            </ul>
          ) : null}

          {step.equations ? (
            <div className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {step.equations.map((item) => (
                  <div key={item.label} className={`rounded-3xl border p-5 ${subtlePanelClass}`}>
                    <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${mutedClass}`}>
                      {item.label}
                    </p>
                    <div
                      className={`mt-4 overflow-x-auto pb-3 ${equationTextClass} text-[1.8rem] leading-[1.5] sm:text-[2.15rem]`}
                    >
                      {item.expression}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {step.variables ? (
            <div className={`mt-10 border-t pt-8 ${isDark ? "border-white/10" : "border-slate-300/70"}`}>
              <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentLabelClass}`}>
                Variable Explanations
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {step.variables.map((item) => (
                  <div key={item.symbol} className={`rounded-3xl border p-5 ${subtlePanelClass}`}>
                    <div className="flex items-start gap-4">
                      <div
                        className={`min-w-[5.5rem] rounded-2xl border px-3 py-3 text-center font-body text-2xl font-medium leading-none ${
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
                          <FormattedPhysicsText text={item.symbol} />
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
            </div>
          ) : null}

          {step.cards ? (
            <div className={`mt-6 grid gap-4 ${step.cardStyle === "plain" ? "gap-6" : ""}`}>
              {step.cards.map((stepCard) => (
                <div
                  key={stepCard.title}
                  className={
                    step.cardStyle === "plain"
                      ? ""
                      : `rounded-3xl border p-5 ${subtlePanelClass}`
                  }
                >
                  <h4 className={`text-lg font-semibold ${titleClass}`}>{stepCard.title}</h4>
                  <FormattedPhysicsText
                    as="p"
                    className={`mt-3 text-base leading-7 ${copyClass}`}
                    text={stepCard.text}
                  />
                </div>
              ))}
            </div>
          ) : null}

          {step.figures ? (
            <div className="mt-6">
              <div className="grid gap-4 lg:grid-cols-2">
                {step.figures.map((item) => (
                  <div key={item.title} className={`rounded-3xl border p-5 ${subtlePanelClass}`}>
                    <h4 className={`text-lg font-semibold ${titleClass}`}>{item.title}</h4>
                    {item.description ? (
                      <FormattedPhysicsText
                        as="p"
                        className={`mt-2 text-sm leading-6 ${copyClass}`}
                        text={item.description}
                      />
                    ) : null}
                    <div className="mt-4">{item.render(isDark)}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {step.realWorldExample && step.realWorldExample.position === "afterFigures"
            ? renderRealWorldExample(step.realWorldExample)
            : null}

          {step.realWorldExample && step.realWorldExample.position === "bottom"
            ? renderRealWorldExample(step.realWorldExample)
            : null}

          {step.practice ? (
            <div className={`mt-6 rounded-3xl border p-6 ${subtlePanelClass}`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className={`text-sm font-semibold uppercase tracking-[0.18em] ${accentLabelClass}`}>
                    Practice Problem
                  </p>
                  <h4 className={`mt-2 text-xl font-semibold ${titleClass}`}>
                    Check Your Understanding
                  </h4>
                </div>
                <div className={`text-sm font-semibold ${mutedClass}`}>
                  {practiceQuestions.length > 1
                    ? `Question ${practiceIndex + 1} of ${practiceQuestions.length}`
                    : "Answer it to unlock the next step"}
                </div>
              </div>

              <FormattedPhysicsText
                as="p"
                className={`mt-6 text-base leading-7 ${copyClass}`}
                text={currentPracticeProblem.prompt}
              />

              {currentPracticeProblem.render ? (
                <div className={`mt-6 rounded-[1.75rem] border p-4 ${subtlePanelClass}`}>
                  {currentPracticeProblem.render(isDark)}
                </div>
              ) : null}

              <div className="mt-6 grid gap-3">
                {currentPracticeProblem.choices.map((choice, index) => {
                  const selected = selectedPracticeChoice === index;

                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => {
                        setSelectedPracticeChoice(index);
                        if (practiceChecked && selectedPracticeChoice !== index) {
                          setPracticeChecked(false);
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
                      <FormattedPhysicsText
                        className={isDark ? "text-slate-100" : "text-slate-800"}
                        text={choice}
                      />
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
                        ? "border-rose-300/20 bg-rose-300/10 text-rose-50"
                        : "border-rose-200 bg-rose-50 text-rose-900"
                  }`}
                >
                  <p className="font-semibold">
                    {practiceIsCorrect ? "Correct" : "Not quite"}
                  </p>
                  <FormattedPhysicsText
                    as="p"
                    className="mt-2"
                    text={
                      practiceIsCorrect
                        ? currentPracticeProblem.correctExplanation
                        : currentPracticeProblem.incorrectExplanation
                    }
                  />
                </div>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handlePracticeCheck}
                  disabled={selectedPracticeChoice === null && !practiceChecked}
                  className={`inline-flex items-center justify-center rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition ${
                    selectedPracticeChoice === null && !practiceChecked
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-cyan-200"
                  }`}
                >
                  {!practiceChecked
                    ? "Check Answer"
                    : practiceIndex < practiceQuestions.length - 1
                      ? "Next Question"
                      : "Answer Checked"}
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

              <FormattedPhysicsText
                as="p"
                className={`mt-6 text-base leading-7 ${copyClass}`}
                text={currentQuizQuestion.question}
              />

              <div className="mt-6 grid gap-3">
                {currentQuizQuestion.choices.map((choice, index) => {
                  const selected = selectedQuizChoice === index;

                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => {
                        setSelectedQuizChoice(index);
                        if (quizChecked && selectedQuizChoice !== index) {
                          setQuizChecked(false);
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
                      <FormattedPhysicsText
                        className={isDark ? "text-slate-100" : "text-slate-800"}
                        text={choice}
                      />
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
                        ? "border-rose-300/20 bg-rose-300/10 text-rose-50"
                        : "border-rose-200 bg-rose-50 text-rose-900"
                  }`}
                >
                  <p className="font-semibold">{quizIsCorrect ? "Correct" : "Not quite"}</p>
                  <FormattedPhysicsText
                    as="p"
                    className="mt-2"
                    text={
                      quizIsCorrect
                        ? currentQuizQuestion.correctExplanation
                        : currentQuizQuestion.incorrectExplanation
                    }
                  />
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
              onClick={() => {
                if (isTerminalQuizStep) {
                  onNextLesson();
                  return;
                }

                setStepIndex((current) =>
                  Math.min(current + 1, lesson.steps.length - 1),
                );
              }}
              disabled={nextButtonDisabled}
              className={`inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-slate-950 transition ${
                nextButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:bg-cyan-200"
              } bg-cyan-300`}
            >
              {nextButtonLabel}
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
  const [view, setView] = useState("home");
  const [activeLessonId, setActiveLessonId] = useState("kinematics");
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
  const activeSectionIndex = sections.findIndex((section) => section.id === activeLessonId);
  const nextSection = activeSectionIndex >= 0 ? sections[activeSectionIndex + 1] ?? null : null;

  const openLesson = (section) => {
    setActiveSection(section);
    setActiveLessonId(section.id);
    setLessonStepIndex(0);
    setView("lesson");
  };

  const goToNextLesson = () => {
    if (nextSection) {
      openLesson(nextSection);
      return;
    }

    setView("topics");
  };

  const returnToSections = () => {
    setView("topics");
  };

  const navigateToView = (nextView) => {
    setSettingsOpen(false);

    if (view === nextView) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setView(nextView);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="section-shell relative flex-1 py-10 sm:py-12 lg:py-16">
        {view === "home" || view === "lesson" ? (
          <div className="absolute right-0 top-1 z-[60] sm:right-0 sm:top-2 lg:-right-4 lg:top-3">
            <SettingsControl
              copyClass={copyClass}
              isDark={isDark}
              mutedClass={mutedClass}
              panelClass={panelClass}
              settingsOpen={settingsOpen}
              setSettingsOpen={setSettingsOpen}
              settingsRef={settingsRef}
              setTheme={setTheme}
              subtlePanelClass={subtlePanelClass}
              theme={theme}
              titleClass={titleClass}
              className="translate-x-2 sm:translate-x-4"
            />
          </div>
        ) : null}

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
            onBack={returnToSections}
            hasNextLesson={Boolean(nextSection)}
            onNextLesson={goToNextLesson}
          />
        ) : view === "home" ? (
          <section className="grid min-h-[72vh] items-center gap-10 lg:grid-cols-[minmax(0,42rem)_minmax(18rem,1fr)] lg:gap-14">
            <div className="max-w-3xl">
              <h1
                className={`font-display text-5xl font-semibold tracking-tight sm:text-6xl lg:text-[5.8rem] lg:leading-[0.96] ${titleClass}`}
              >
                coasterphysics
              </h1>

              <p className={`mt-8 max-w-2xl text-xl leading-[1.7] sm:text-2xl ${copyClass}`}>
                Coasterphysics brings physics to life through the motion,
                design, and thrill of roller coasters. Our mission is to make
                complex physics concepts clear, engaging, and accessible
                through interactive lessons, real-world examples, and
                coaster-inspired problem solving.
              </p>

              <div className="mt-10 flex flex-col items-start gap-3">
                <button
                  type="button"
                  onClick={() => setView("topics")}
                  className="inline-flex min-w-[18rem] items-center justify-center rounded-full bg-cyan-300 px-8 py-5 text-lg font-semibold text-slate-950 transition hover:scale-[1.01] hover:bg-cyan-200"
                >
                  Start Learning
                </button>
                <button
                  type="button"
                  onClick={() => setView("simulation")}
                  className={`inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                    isDark
                      ? "border-cyan-300/30 bg-white/5 text-cyan-100 hover:bg-white/10"
                      : "border-sky-300 bg-sky-50 text-sky-800 hover:bg-white"
                  }`}
                >
                  Simulation
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center lg:min-h-[45rem]">
              <HeroCollage isDark={isDark} />
            </div>
          </section>
        ) : view === "topics" ? (
          <section className="pb-10 pt-0 sm:pb-14 sm:pt-0">
            <div className="mb-5 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setView("home")}
                className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                    : "border-slate-300 bg-white/80 text-slate-900 hover:bg-white"
                }`}
              >
                Back Home
              </button>
              <SettingsControl
                copyClass={copyClass}
                isDark={isDark}
                mutedClass={mutedClass}
                panelClass={panelClass}
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
                settingsRef={settingsRef}
                setTheme={setTheme}
                subtlePanelClass={subtlePanelClass}
                theme={theme}
                titleClass={titleClass}
                className="translate-x-2 sm:translate-x-4"
              />
            </div>

            <section id="topics" className="pt-0">
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
                  Start with kinematics, then build through forces, energy,
                  circular motion, losses, momentum, rotation, and full coaster
                  design reasoning.
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
                      <div className="flex min-w-0 items-start gap-4">
                        <span
                          className={`mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${accentNumberClass}`}
                        >
                          {section.number}
                        </span>
                        <div className="min-w-0">
                          <h3 className={`text-xl font-semibold ${titleClass}`}>
                            {section.title}
                          </h3>
                          <p
                            className={`mt-1 text-sm uppercase tracking-[0.16em] ${mutedClass}`}
                          >
                            {section.subtitle}
                          </p>
                          {section.topics?.length ? (
                            <ul className={`mt-3 grid gap-1 text-xs leading-5 normal-case tracking-normal ${copyClass}`}>
                              {section.topics.map((topic) => (
                                <li key={topic} className="flex items-start gap-2">
                                  <span className={`mt-[0.42rem] h-1.5 w-1.5 shrink-0 rounded-full ${listDotClass}`} />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
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
          </section>
        ) : view === "simulation" ? (
          <section className="pb-10 pt-0 sm:pb-14 sm:pt-0">
            <div className="mb-5 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setView("home")}
                className={`inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white hover:bg-white/10"
                    : "border-slate-300 bg-white/80 text-slate-900 hover:bg-white"
                }`}
              >
                Back Home
              </button>
              <SettingsControl
                copyClass={copyClass}
                isDark={isDark}
                mutedClass={mutedClass}
                panelClass={panelClass}
                settingsOpen={settingsOpen}
                setSettingsOpen={setSettingsOpen}
                settingsRef={settingsRef}
                setTheme={setTheme}
                subtlePanelClass={subtlePanelClass}
                theme={theme}
                titleClass={titleClass}
                className="translate-x-2 sm:translate-x-4"
              />
            </div>

            <section id="simulation" className="pt-0">
              <div className="max-w-6xl">
                <p className={`text-sm font-semibold uppercase tracking-[0.22em] ${accentLabelClass}`}>
                  Interactive Lab
                </p>
                <h2
                  className={`mt-4 font-display text-3xl font-semibold sm:text-4xl ${titleClass}`}
                >
                  Coaster simulation
                </h2>
                <p className={`mt-4 max-w-3xl text-lg leading-8 ${copyClass}`}>
                  Change the drop height and the level-out length to see how the
                  coaster profile, maximum speed, and peak g-force respond
                  together.
                </p>
              </div>

              <div className="mt-10">
                <SimulatorPanel
                  isDark={isDark}
                  panelClass={panelClass}
                  subtlePanelClass={subtlePanelClass}
                  titleClass={titleClass}
                  copyClass={copyClass}
                  mutedClass={mutedClass}
                  accentLabelClass={accentLabelClass}
                />
              </div>
            </section>
          </section>
        ) : (
          <></>
        )}
      </main>

      {view !== "lesson" ? <SiteFooter isDark={isDark} onNavigate={navigateToView} /> : null}
    </div>
  );
};

export default App;
