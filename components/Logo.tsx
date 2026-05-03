interface LogoProps {
  className?: string;
  iconClassName?: string;
  showWordmark?: boolean;
}

export function Logo({ className = "", iconClassName = "", showWordmark = true }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 ${iconClassName}`}>
        <svg
          viewBox="0 0 100 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-[13px]"
          aria-hidden="true"
        >
          <path
            d="M 8,30 L 22,30 L 28,39 L 38,10 L 50,51 L 58,30 L 92,30"
            stroke="black"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showWordmark && (
        <span className="text-white font-semibold text-lg tracking-tight">
          ilos.ai
        </span>
      )}
    </div>
  );
}
