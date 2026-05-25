import Icon from '../Icon';

const ICONS = {
  right: 'mdi:arrow-right',
  left: 'mdi:arrow-left',
  'top-right': 'mdi:arrow-top-right',
};

const TONES = {
  inherit: 'text-current',
  light: 'text-white',
  dark: 'text-gray-900',
  amber: 'text-amber-500',
  muted: 'text-gray-500',
};

export default function ArrowIcon({
  direction = 'right',
  size = 20,
  tone = 'inherit',
  className = '',
}) {
  return (
    <Icon
      name={ICONS[direction] ?? ICONS.right}
      size={size}
      className={`${TONES[tone] ?? TONES.inherit} ${className}`.trim()}
    />
  );
}

export function ArrowCircle({ direction = 'top-right', size = 22, tone = 'amber' }) {
  const bg =
    tone === 'dark'
      ? 'bg-gray-900 text-white'
      : 'bg-amber-400 text-black';

  return (
    <span
      className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg ${bg}`}
      aria-hidden="true"
    >
      <ArrowIcon
        direction={direction}
        size={size}
        tone={tone === 'dark' ? 'light' : 'dark'}
      />
    </span>
  );
}

export function ArrowSquare({ direction = 'right', size = 20, className = '' }) {
  return (
    <span
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white ${className}`.trim()}
      aria-hidden="true"
    >
      <ArrowIcon direction={direction} size={size} tone="light" />
    </span>
  );
}
