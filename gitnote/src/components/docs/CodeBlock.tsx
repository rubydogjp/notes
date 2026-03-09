import { useState } from "react";

interface Props {
  children: string;
  language?: string;
}

export default function CodeBlock({ children, language }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Strip leading $ prompts for copy
    const text = children
      .split("\n")
      .map((line) => line.replace(/^\$\s/, ""))
      .join("\n")
      .trim();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLine = (line: string, i: number) => {
    if (line.startsWith("$ ")) {
      return (
        <span key={i}>
          <span className="text-emerald-400 select-none">$ </span>
          <span>{line.slice(2)}</span>
          {"\n"}
        </span>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <span key={i} className="text-gray-500 italic">
          {line}
          {"\n"}
        </span>
      );
    }
    return (
      <span key={i}>
        {line}
        {"\n"}
      </span>
    );
  };

  const lines = children.trimEnd().split("\n");

  return (
    <div className="group relative my-4 rounded-xl overflow-hidden">
      {language && (
        <div className="flex items-center justify-between px-4 py-1.5 bg-[#181825] text-gray-400 text-xs font-mono">
          <span>{language}</span>
        </div>
      )}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
        aria-label="コピー"
      >
        {copied ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
      </button>
      <pre className="bg-[#1e1e2e] text-[#cdd6f4] px-5 py-4 overflow-x-auto text-sm leading-relaxed font-mono">
        <code>{lines.map(renderLine)}</code>
      </pre>
    </div>
  );
}
