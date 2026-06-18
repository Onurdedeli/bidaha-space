import Link from "next/link";
import type { ComponentProps } from "react";

export function Badge({
  children,
  tone = "brand",
}: {
  children: React.ReactNode;
  tone?: "brand" | "accent" | "muted" | "danger";
}) {
  const tones = {
    brand: "bg-brand/15 text-brand-soft border-brand/30",
    accent: "bg-accent/15 text-accent border-accent/30",
    muted: "bg-surface-2 text-muted border-border",
    danger: "bg-danger/15 text-danger border-danger/30",
  } as const;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export function Stars({ rating, count }: { rating: number; count?: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-muted">
      <span className="text-amber-400">★</span>
      <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
      {count != null && <span>({count})</span>}
    </span>
  );
}

type ButtonBase = {
  variant?: "primary" | "accent" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

const btnClasses = ({ variant = "primary", size = "md" }: ButtonBase) => {
  const variants = {
    primary: "bg-foreground text-white hover:bg-brand",
    accent: "bg-accent text-white hover:bg-accent-soft",
    ghost: "bg-transparent text-foreground hover:bg-surface-2",
    outline: "border border-border bg-transparent text-foreground hover:bg-surface-2",
  } as const;
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-6 py-3 text-base" } as const;
  return `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]}`;
};

export function Button({
  variant,
  size,
  className = "",
  ...props
}: ButtonBase & ComponentProps<"button">) {
  return <button className={`${btnClasses({ variant, size })} ${className}`} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className = "",
  ...props
}: ButtonBase & ComponentProps<typeof Link>) {
  return <Link className={`${btnClasses({ variant, size })} ${className}`} {...props} />;
}

export function Section({
  title,
  subtitle,
  action,
  children,
  id,
}: {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      {(title || action) && (
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            {title && <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>}
            {subtitle && <p className="mt-1 max-w-2xl text-sm text-muted">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
