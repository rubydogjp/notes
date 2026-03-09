/** @deprecated Use MediaFrame instead. Kept for non-tutorial pages. */
interface Props {
  src: string;
  alt: string;
  caption?: string;
  label?: string;
}

export default function ScreenshotFrame({ src, alt, caption, label }: Props) {
  const isGif = src.endsWith(".gif");
  const fileName = label ?? src.split("/").pop() ?? "";
  const badge = isGif ? "GIF" : "IMG";

  return (
    <figure className="my-6">
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 overflow-hidden shadow-sm">
        {/* macOS-style title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="flex-1 text-xs text-gray-400 dark:text-gray-500 truncate text-center">
            {fileName}
          </span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
            isGif
              ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
              : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          }`}>
            {badge}
          </span>
        </div>
        {/* Image */}
        <div className="bg-white dark:bg-gray-900">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto"
            loading="lazy"
            {...(isGif ? {} : { decoding: "async" })}
          />
        </div>
      </div>
      {caption && (
        <figcaption className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
