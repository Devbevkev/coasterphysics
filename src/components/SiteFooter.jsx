const quickLinks = [
  { label: "Home", target: "home" },
  { label: "Learning Path", target: "topics" },
  { label: "Simulation", target: "simulation" },
  { label: "Image Credits", target: "credits" },
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
    : "border-slate-400/50 bg-slate-200/94 text-slate-900 shadow-[0_-24px_72px_rgba(15,23,42,0.13)]";
  const titleClass = isDark ? "text-white" : "text-slate-950";
  const copyClass = isDark ? "text-slate-300" : "text-slate-700";
  const navTextClass = isDark ? "text-slate-300" : "text-slate-700";
  const navHoverClass = isDark ? "hover:text-cyan-200" : "hover:text-sky-900";
  const sectionTitleClass = isDark ? "text-cyan-200/90" : "text-sky-800";
  const ruleClass = isDark ? "border-white/10" : "border-slate-400/45";
  const copyrightClass = isDark ? "text-slate-400" : "text-slate-600";
  const topGlowClass = isDark ? "bg-cyan-300/10" : "bg-cyan-200/11";
  const bottomGlowClass = isDark ? "bg-amber-300/5" : "bg-amber-200/9";
  const dividerGlowClass = isDark ? "via-cyan-300/45" : "via-sky-700/40";

  return (
    <footer className={`relative overflow-hidden border-t backdrop-blur-xl ${footerClass}`}>
      <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${dividerGlowClass} to-transparent`} />
      <div className={`absolute -top-14 right-20 h-40 w-40 rounded-full ${topGlowClass} blur-3xl`} />
      <div className={`absolute bottom-0 left-0 h-32 w-32 rounded-full ${bottomGlowClass} blur-3xl`} />

      <div className="section-shell relative py-8 sm:py-9">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,1fr)]">
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
            <FooterSectionTitle className={sectionTitleClass}>About</FooterSectionTitle>
            <p className={`mt-4 max-w-sm text-sm leading-7 sm:text-base ${copyClass}`}>
              This site was created by a high school student with a passion
              for helping others understand physics through the real-world
              thrill of roller coasters.
            </p>
          </div>
        </div>

        <div className={`mt-6 border-t pt-3 ${ruleClass}`}>
          <p className={`text-sm ${copyrightClass}`}>
            © 2026 Coaster Physics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
