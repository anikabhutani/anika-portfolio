export default function SectionHeading({
  index,
  label,
  title,
  light = false,
  trailing,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  light?: boolean;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 mb-10 flex-wrap">
      <div className="flex items-start gap-4">
        <span className={`font-mono text-[0.8rem] mt-2 ${light ? "text-white/30" : "text-light"}`}>
          {index}
        </span>
        <div>
          <div
            className={`text-[0.72rem] tracking-[0.14em] uppercase font-medium mb-2 ${
              light ? "text-accent" : "text-sky"
            }`}
          >
            {label}
          </div>
          <h2 className={`font-serif text-[1.9rem] leading-tight ${light ? "text-white" : "text-navy"}`}>
            {title}
          </h2>
        </div>
      </div>
      {trailing}
    </div>
  );
}
