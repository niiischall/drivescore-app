export function IndiaFlag({
  size = 16,
  className,
  title = 'India',
  decorative = true,
}: {
  size?: number;
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const height = Math.round((size * 2) / 3);
  return (
    <svg
      width={size}
      height={height}
      viewBox='0 0 21 14'
      className={`pointer-events-none select-none ${className ?? ''}`}
      aria-hidden={decorative ? true : undefined}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
    >
      {!decorative ? <title>{title}</title> : null}
      <rect width='21' height='14' rx='2' fill='#FFFFFF' />
      <rect width='21' height='4.67' fill='#FF9933' />
      <rect y='9.33' width='21' height='4.67' fill='#138808' />
      <circle
        cx='10.5'
        cy='7'
        r='1.85'
        fill='none'
        stroke='#000080'
        strokeWidth='0.85'
      />
      <circle cx='10.5' cy='7' r='0.45' fill='#000080' />
    </svg>
  );
}
