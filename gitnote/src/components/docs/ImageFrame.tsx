interface Props {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Simple image frame for concept diagrams and non-screenshot images.
 * For UI screenshots and GIFs, use ScreenshotFrame instead.
 */
export default function ImageFrame({ src, alt, caption }: Props) {
  const isGif = src.endsWith(".gif");
  return (
    <figure className="my-6">
      <div className="rounded-2xl border border-amber-100 dark:border-gray-800 overflow-hidden bg-white dark:bg-gray-900 shadow-sm">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto"
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
