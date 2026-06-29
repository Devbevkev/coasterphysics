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

const FooterNavButton = ({ label, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-fit text-left text-sm text-slate-300 transition hover:text-cyan-200"
    >
      {label}
    </button>
  );
};

const FooterSectionTitle = ({ children }) => {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/90">
      {children}
    </p>
  );
};

const SiteFooter = ({ onNavigate }) => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950/92 text-slate-200 backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/45 to-transparent" />
      <div className="absolute -top-14 right-20 h-40 w-40 rounded-full bg-cyan-300/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-amber-300/5 blur-3xl" />

      <div className="section-shell relative py-12 sm:py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="max-w-md">
            <p className="font-display text-2xl font-semibold tracking-tight text-white sm:text-[2rem]">
              Coaster Physics
            </p>
            <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
              Making physics feel real through the motion, forces, and design
              of roller coasters.
            </p>
          </div>

          <div>
            <FooterSectionTitle>Quick Links</FooterSectionTitle>
            <div className="mt-4 flex flex-col gap-3">
              {quickLinks.map((link) => (
                <FooterNavButton
                  key={link.label}
                  label={link.label}
                  onClick={() => onNavigate(link.target)}
                />
              ))}
            </div>
          </div>

          <div>
            <FooterSectionTitle>Explore</FooterSectionTitle>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {exploreLabels.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-slate-300"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-5">
          <p className="text-sm text-slate-400">
            © 2026 Coaster Physics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
