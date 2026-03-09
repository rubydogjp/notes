import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

export default function LinkButton({ href, children }: Props) {
  const cls =
    "inline-flex items-center gap-2 px-5 py-2.5 bg-gitnote-500 hover:bg-gitnote-600 text-gitnote-800 font-semibold rounded-xl text-sm shadow-md shadow-amber-300/20 hover:shadow-amber-400/30 hover:-translate-y-0.5 transition-all my-3";

  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </a>
    );
  }

  return (
    <Link to={href} className={cls}>
      {children}
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  );
}
