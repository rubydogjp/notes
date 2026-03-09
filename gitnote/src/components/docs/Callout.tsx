import type { ReactNode } from "react";

type Variant = "tip" | "danger" | "info" | "warning";

interface Props {
  variant: Variant;
  title: string;
  children: ReactNode;
}

const config: Record<Variant, { icon: string; bg: string; border: string; text: string; titleColor: string }> = {
  tip: {
    icon: "💡",
    bg: "bg-amber-50 dark:bg-amber-900/10",
    border: "border-amber-400 dark:border-amber-600",
    text: "text-amber-900 dark:text-amber-100",
    titleColor: "text-amber-800 dark:text-amber-300",
  },
  danger: {
    icon: "⚠️",
    bg: "bg-red-50 dark:bg-red-900/10",
    border: "border-red-400 dark:border-red-600",
    text: "text-red-900 dark:text-red-100",
    titleColor: "text-red-800 dark:text-red-300",
  },
  info: {
    icon: "ℹ️",
    bg: "bg-blue-50 dark:bg-blue-900/10",
    border: "border-blue-400 dark:border-blue-600",
    text: "text-blue-900 dark:text-blue-100",
    titleColor: "text-blue-800 dark:text-blue-300",
  },
  warning: {
    icon: "🚧",
    bg: "bg-orange-50 dark:bg-orange-900/10",
    border: "border-orange-400 dark:border-orange-600",
    text: "text-orange-900 dark:text-orange-100",
    titleColor: "text-orange-800 dark:text-orange-300",
  },
};

export default function Callout({ variant, title, children }: Props) {
  const c = config[variant];
  return (
    <div className={`my-5 rounded-xl border-l-4 ${c.border} ${c.bg} p-4 md:p-5`}>
      <div className={`flex items-center gap-2 font-bold text-sm mb-1.5 ${c.titleColor}`}>
        <span className="text-base">{c.icon}</span>
        {title}
      </div>
      <div className={`text-sm leading-relaxed ${c.text}`}>{children}</div>
    </div>
  );
}
