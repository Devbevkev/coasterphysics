const CoasterTypeCard = ({ coaster }) => {
  return (
    <article className="panel p-6 transition duration-300 hover:-translate-y-1 hover:border-amber-200/25">
      <div className="mb-5 inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-100">
        {coaster.concept}
      </div>
      <h3 className="text-xl font-semibold text-white">{coaster.title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">
        {coaster.description}
      </p>
    </article>
  );
};

export default CoasterTypeCard;
