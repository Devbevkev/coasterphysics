const SectionTitle = ({ eyebrow, title, description, align = "left" }) => {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "items-start";

  return (
    <div className={`mb-10 flex max-w-3xl flex-col gap-4 ${alignment}`}>
      <span className="chip">{eyebrow}</span>
      <div className="space-y-4">
        <h2 className="section-title font-display">{title}</h2>
        <p className="section-copy">{description}</p>
      </div>
    </div>
  );
};

export default SectionTitle;
