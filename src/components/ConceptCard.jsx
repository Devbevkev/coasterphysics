const ConceptCard = ({ concept }) => {
  return (
    <article className="group panel relative overflow-hidden p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-sm font-bold uppercase tracking-[0.18em] text-cyan-200">
        {concept.shortLabel}
      </div>
      <h3 className="text-xl font-semibold text-white">{concept.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        {concept.description}
      </p>
    </article>
  );
};

export default ConceptCard;
