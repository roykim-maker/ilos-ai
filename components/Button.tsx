import Link from "next/link";

// ─── Variants ────────────────────────────────────────────────────────────────

const variants = {
  primary: [
    "bg-gradient-to-r from-cyan-400 to-blue-500",
    "hover:from-cyan-300 hover:to-blue-400",
    "text-white",
    "shadow-lg shadow-cyan-500/20",
    "transition-all duration-200",
    "hover:scale-[1.02]",
    "disabled:opacity-40 disabled:cursor-not-allowed",
    "disabled:hover:scale-100 disabled:hover:from-cyan-400 disabled:hover:to-blue-500",
  ].join(" "),

  secondary: [
    "border border-neutral-700",
    "text-neutral-300",
    "hover:text-white hover:border-neutral-500",
    "transition-all duration-200",
  ].join(" "),

  ghost: [
    "text-neutral-400",
    "hover:text-white",
    "transition-colors duration-200",
  ].join(" "),
} as const;

const sizes = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3.5 text-sm rounded-lg",
  lg: "px-8 py-4 text-base rounded-xl",
} as const;

// ─── Types ───────────────────────────────────────────────────────────────────

type Variant = keyof typeof variants;
type Size    = keyof typeof sizes;

interface SharedProps {
  variant?:  Variant;
  size?:     Size;
  className?: string;
  children:  React.ReactNode;
}

// href → renders as Link (internal) or <a> (external)
type AsLink = SharedProps & {
  href:      string;
  external?: boolean;
  onClick?:  () => void; // e.g. close mobile menu on navigation
  disabled?: never;
  type?:     never;
};

// no href → renders as <button>
type AsButton = SharedProps & {
  href?:     never;
  external?: never;
  onClick?:  () => void;
  disabled?: boolean;
  type?:     "button" | "submit" | "reset";
};

type ButtonProps = AsLink | AsButton;

// ─── Component ───────────────────────────────────────────────────────────────

export function Button({
  variant   = "primary",
  size      = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const cls = [
    "inline-flex items-center justify-center font-medium",
    variants[variant],
    sizes[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if ("href" in props && props.href) {
    const { href, external, onClick } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={cls}>
          {children}
        </a>
      );
    }
    return <Link href={href} onClick={onClick} className={cls}>{children}</Link>;
  }

  const { onClick, disabled, type = "button" } = props as AsButton;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
