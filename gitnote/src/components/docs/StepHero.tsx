interface Props {
  stepNum: number;
  title: string;
  subtitle: string;
}

export default function StepHero({ stepNum, title, subtitle }: Props) {
  return (
    <>
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg shadow-amber-300/30">
          {stepNum}
        </div>
        <div>
          <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-wide">STEP {stepNum}</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            {title}
          </h1>
        </div>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
        {subtitle}
      </p>
    </>
  );
}
