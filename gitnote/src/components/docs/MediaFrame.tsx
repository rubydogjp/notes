interface Props {
  src: string;
  alt: string;
  caption?: string;
}

export default function MediaFrame({ src, alt, caption }: Props) {
  const isGif = src.endsWith(".gif");

  return (
    <figure className="my-6">
      <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-amber-300/30 dark:shadow-amber-500/10 bg-white dark:bg-gray-900">
        {isGif && (
          <span className="absolute top-3 right-3 z-10 text-[10px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            GIF
          </span>
        )}
        <img
          src={src}
          alt={alt}
          className="w-full h-auto rounded-2xl"
          loading="lazy"
          {...(isGif ? {} : { decoding: "async" })}
        />
      </div>
      {caption && (
        <figcaption className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
