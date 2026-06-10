const FormulaCard = ({ formula }) => {
  return (
    <article className="panel p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-slate-400">
            {formula.name}
          </p>
          <h3 className="mt-3 font-display text-3xl font-semibold text-white">
            {formula.equation}
          </h3>
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-slate-300">
        {formula.explanation}
      </p>
      <p className="mt-4 text-sm leading-6 text-slate-400">{formula.variables}</p>
    </article>
  );
};

export default FormulaCard;
