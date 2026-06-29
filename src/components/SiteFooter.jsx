const quickLinks = [
  { label: "Home", target: "home" },
  { label: "Learning Path", target: "topics" },
  { label: "Simulation", target: "simulation" },
];

const exploreLabels = [
  "Forces",
  "Energy",
  "Loops",
  "G-Forces",
  "Roller Coaster Design",
];

const FooterNavButton = ({ label, onClick, textClass, hoverClass }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-fit text-left text-sm transition ${textClass} ${hoverClass}`}
    >
      {label}
    </button>
  );
};

const FooterSectionTitle = ({ children, className }) => {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${className}`}>
      {children}
    </p>
  );
};

const SiteFooter = ({ isDark, onNavigate }) => {
  const footerClass = isDark
    ? "border-white/10 bg-slate-950/92 text-slate-200"
    : "border-slate-900/12 bg-slate-900/96 text-slate-100 shadow-[0_-24px_72px_rgba(15,23,42,0.18)]";
  const titleClass = isDark ? "text-white" : "text-slate-50";
  const copyClass = isDark ? "text-slate-300" : "text-slate-300";
  const navTextClass = isDark ? "text-slate-300" : "text-slate-300";
  const navHoverClass = isDark ? "hover:text-cyan-200" : "hover:text-cyan-100";
  const sectionTitleClass = isDark ? "text-cyan-200/90" : "text-cyan-100";
  const pillClass = isDark
    ? "border-white/10 bg-white/[0.04] text-slate-300"
    : "border-white/12 bg-white/[0.06] text-slate-200";
  const ruleClass = isDark ? "border-white/10" : "border-white/12";
  const copyrightClass = isDark ? "text-slate-400" : "text-slate-400";
  const topGlowClass = isDark ? "bg-cyan-300/10" : "bg-cyan-200/12";
  const bottomGlowClass = isDark ? "bg-amber-300/5" : "bg-amber-200/10";
  const dividerGlowClass = isDark ? "via-cyan-300/45" : "via-cyan-200/55";

  return (
    <footer className={`relative overflow-hidden border-t backdrop-blur-xl ${footerClass}`}>
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${dividerGlowClass} to-transparent`} />
      <div className={`absolute -top-14 right-20 h-40 w-40 rounded-full ${topGlowClass} blur-3xl`} />
      <div className={`absolute bottom-0 left-0 h-32 w-32 rounded-full ${bottomGlowClass} blur-3xl`} />

      <div className="section-shell relative py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="max-w-md">
            <p className={`font-display text-2xl font-semibold tracking-tight sm:text-[2rem] ${titleClass}`}>
              Coaster Physics
            </p>
            <p className={`mt-4 text-sm leading-7 sm:text-base ${copyClass}`}>
              Making physics feel real through the motion, forces, and design
              of roller coasters.
            </p>
          </div>

          <div>
            <FooterSectionTitle className={sectionTitleClass}>Quick Links</FooterSectionTitle>
            <div className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <FooterNavButton
                  key={link.label}
                  label={link.label}
                  textClass={navTextClass}
                  hoverClass={navHoverClass}
                  onClick={() => onNavigate(link.target)}
                />
              ))}
            </div>
          </div>

          <div>
            <FooterSectionTitle className={sectionTitleClass}>Explore</FooterSectionTitle>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {exploreLabels.map((label) => (
                <span
                  key={label}
                  className={`rounded-full border px-3 py-1.5 text-sm ${pillClass}`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className={`mt-10 border-t pt-5 ${ruleClass}`}>
          <p className={`text-sm ${copyrightClass}`}>
            © 2026 Coaster Physics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
