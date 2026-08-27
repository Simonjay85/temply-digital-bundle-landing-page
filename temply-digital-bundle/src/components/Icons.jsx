function Icon({ children, size = 18, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function ArrowUpRightIcon({ size = 18, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M5 19 19 5" />
      <path d="M8 5h11v11" />
    </Icon>
  );
}

export function ArrowDownIcon({ size = 18, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M12 4v15" />
      <path d="m6 13 6 6 6-6" />
    </Icon>
  );
}

export function ArrowLeftIcon({ size = 18, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </Icon>
  );
}

export function ArrowRightIcon({ size = 18, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

export function PlusIcon({ size = 18, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M12 5v14M5 12h14" />
    </Icon>
  );
}

export function MenuIcon({ size = 28, className }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 40 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d="M0 4h40M0 20h40" />
    </svg>
  );
}

export function MoonIcon({ size = 15, className }) {
  return (
    <Icon size={size} className={className}>
      <path d="M20 15.4A8.4 8.4 0 0 1 8.6 4 8.4 8.4 0 1 0 20 15.4Z" />
    </Icon>
  );
}

export function SunIcon({ size = 15, className }) {
  return (
    <Icon size={size} className={className}>
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Icon>
  );
}
